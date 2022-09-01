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
export interface Properties {
    group: string;
    hash: string;
    height: number;
    path: string;
    referrer: string;
    search: string;
    title: string;
    url: string;
    width: number;
}
export interface Payload {
    anonymousId: string;
    properties: Properties;
    type: "page";
    userId: string;
}
export interface PageConfig {
    payload: Payload;
    config: any;
    instance: any;
}

const dtrumWindow: DtrumWindow = window as DtrumWindow & typeof globalThis;

// dynatrace API: https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html
export const browserAnalytics = (pluginConfig: PluginConfig) => {
    return {
        name: "analytics-plugin-dynatrace",
        config: {
            ...pluginConfig,
        },
        initialize: ({ config }: { config: PluginConfig }) => {
            const win = dtrumWindow;
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
            const dynatrace = dtrumWindow.dtrum;
            dynatrace.identifyUser(config.payload.userId);
        },
        loaded: () => {
            return Boolean(dtrumWindow.dtrum);
        },
        page: (page: PageConfig) => {
            const { payload } = page;
            const dynatrace = dtrumWindow.dtrum;
            dynatrace.enableManualPageDetection();

            const pageToSend = {
                name: payload.properties.path,
                group: payload.properties.group,
            };
            const result = dynatrace.setPage(pageToSend);
            if (result === -1) {
                throw new Error("The page that is being set is the same as previous one.");
            }
            if (result === -2) {
                throw new Error("The page is trying to be set but mechanism is not active. Probably 'dtrum.enableManualPageDetection()' was not called.");
            }
        },
        methods: {
            reportError(error: string | Error) {
                const dynatrace = dtrumWindow.dtrum;
                dynatrace.reportError(error);
            },
        },
    };
};
