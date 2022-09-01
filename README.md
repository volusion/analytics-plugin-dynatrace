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

### Page tracking

Dynatrace page tracking wants the following data:

```typescript
{
    name, // New view name. Usually it matches the location.pathname or location.hash
    group, // New view group. It is recommended to contain the dynamic placeholders of the view name. For example, if the view name is "/books/123", view group should be "books/:bookId" or similar.
}
```

You will need to translate your paths into groups in your application before calling page tracking, something like this:

```typescript
// this is the simplest possible version
// it converts "/thing/123" to "/thing/:thingid"
const groupFromPath = (path: string) => {
    return path.replace(/\/thing\/\d+/, "/thing/:thingid");
};

analytics.page({
    name: location.pathname,
    group: groupFromPath(location.pathname),
});
```

## Development

compile using `npx tsc -d -w`

## Contributing

This library only supports the [DtrumApi](https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html) methods that we have needed so far, feel free to submit a PR with support for more.

* Checkout a new branch prefixed with Jira ticket and relevant description, ie PROJ-123-my-feature
* Make your changes
* Ensure commit follows our guidelines, [see here](#commit-guidelines)
* Open PR against `main`

## Commit Guidelines

We enforce standard commit messages on pull requests to `main` based on the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) specification. Commits must be structured in the format `type: commit message`. Common types include `feat:`, `chore:`, and `fix:`.
