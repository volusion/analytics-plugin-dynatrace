import { browserAnalytics } from "./browser";

// const browserAnalytics = require("../dist/browser");

const DYNATRACE_SRC = "http://dynatrace.com";

test("instantiated plugin has name and config", () => {
    const analytics = browserAnalytics({
        src: "http://dynatrace.com",
    });
    expect(analytics.name).toBe("analytics-plugin-dynatrace");
    expect(analytics.config).toEqual({
        src: DYNATRACE_SRC,
    });
});
