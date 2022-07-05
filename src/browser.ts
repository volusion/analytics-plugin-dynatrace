export interface DtrumWindow extends Window {
    dtrum: any;
    attachEvent?: (event: string, fn: () => void) => void;
}
export interface PluginConfig {
    src: string;
}
export interface IdentifyConfig {
    payload: {
        userId: string;
    };
}
export interface DynatracePlugin {
    ["analytics-plugin-dynatrace"]: {
        reportError: (error: string | Error) => void;
    };
}

const DtrumWindow: DtrumWindow = window as DtrumWindow & typeof globalThis;

// dynatrace API: https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html
export const browserAnalytics = (pluginConfig: PluginConfig) => {
    return {
        name: "analytics-plugin-dynatrace",
        config: {
            ...pluginConfig,
        },
        initialize: ({ config }: { config: PluginConfig }) => {
            const win = DtrumWindow;
            const root = win.document;
            const loadScript = () => {
                const s = root.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.id = "dynatrace";
                s.crossOrigin = "anonymous";
                s.src = config.src;
                const x = root.getElementsByTagName("script")[0];
                x.parentNode?.insertBefore(s, x);
            };

            if (root.querySelector(`script[src="${config.src}"]`) !== null) {
                return;
            }
            if (root.readyState === "complete") {
                loadScript();
            } else if (win.attachEvent) {
                win.attachEvent("onload", loadScript);
            } else {
                win.addEventListener("load", loadScript, false);
            }
        },
        identify: (config: IdentifyConfig) => {
            const dynatrace = DtrumWindow.dtrum;
            dynatrace.identifyUser(config.payload.userId);
        },
        loaded: () => {
            return Boolean(DtrumWindow.dtrum);
        },
        methods: {
            reportError(error: string | Error) {
                const dynatrace = DtrumWindow.dtrum;
                dynatrace.reportError(error);
            },
        },
    };
};
