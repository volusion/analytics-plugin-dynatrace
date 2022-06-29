interface MyWindow extends Window {
    dtrum: any;
    attachEvent?: (event: string, fn: () => void) => void;
}
interface PluginConfig {
    src: string;
}
interface IdentifyConfig {
    payload: {
        userId: string;
    };
}
export interface DynatracePlugin {
    ["analytics-plugin-dynatrace"]: {
        reportError: (error: string | Error) => void;
    };
}

const myWindow: MyWindow = window as MyWindow & typeof globalThis;

// dynatrace API: https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html
const dynatraceAnalytics = (pluginConfig: PluginConfig) => {
    return {
        name: "analytics-plugin-dynatrace",
        config: {
            ...pluginConfig,
        },
        initialize: ({ config }: { config: PluginConfig }) => {
            const win = myWindow;
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
            const dynatrace = myWindow.dtrum;
            dynatrace.identifyUser(config.payload.userId);
        },
        loaded: () => {
            return Boolean(myWindow.dtrum);
        },
        methods: {
            reportError(error: string | Error) {
                const dynatrace = myWindow.dtrum;
                dynatrace.reportError(error);
            },
        },
    };
};

export default dynatraceAnalytics;
