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
export declare const dynatraceAnalytics: (pluginConfig: PluginConfig) => {
    name: string;
    config: {
        src: string;
    };
    initialize: ({ config }: {
        config: PluginConfig;
    }) => void;
    identify: (config: IdentifyConfig) => void;
    loaded: () => boolean;
    methods: {
        reportError(error: string | Error): void;
    };
};
export {};
