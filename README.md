<!--
title: Adding Dynatrace to your app using open source analytics
description: Connect Dynatrace to the analytics library
pageTitle: Dynatrace
-->

# Dynatrace

This library exports the `dynatraceAnalytics` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [Dynatrace](https://www.dynatrace.com/).

This analytics plugin will load Dynatrace into your application, if you have not already loaded it via a `<script>`.

## Installation

```bash
npm install analytics
npm install @volusion/analytics-plugin-dynatrace
```

## How to use

```typescript
import Analytics from "analytics";
import { dynatraceAnalytics } from "@volusion/analytics-plugin-dynatrace";

const analytics = Analytics({
    app: "your-app",
    plugins: [
        dynatraceAnalytics({
            src: "https://js-cdn.dynatrace.com/jstag/...", // required
        }),
    ],
});
```

Get the src for your dynatrace script from your Dynatrace account.

## Development

compile using `npx tsc -d -w`

## Contributing

This library only supports the [DtrumApi](https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html) methods that we have needed so far, feel free to submit a PR with support for more.

* Checkout a new branch prefixed with Jira ticket and relevant description, ie PROJ-123-my-feature
* Make your changes
* Ensure commit follows our guidelines, [see here](#commit-guidelines)
* Open PR against `main`
