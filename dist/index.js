const myWindow = window;
// dynatrace API: https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html
export const dynatraceAnalytics = (pluginConfig) => {
    return {
        name: "analytics-plugin-dynatrace",
        config: {
            ...pluginConfig,
        },
        initialize: ({ config }) => {
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
            }
            else if (win.attachEvent) {
                win.attachEvent("onload", loadScript);
            }
            else {
                win.addEventListener("load", loadScript, false);
            }
        },
        identify: (config) => {
            const dynatrace = myWindow.dtrum;
            dynatrace.identifyUser(config.payload.userId);
        },
        loaded: () => {
            return Boolean(myWindow.dtrum);
        },
        methods: {
            reportError(error) {
                const dynatrace = myWindow.dtrum;
                dynatrace.reportError(error);
            },
        },
    };
};
