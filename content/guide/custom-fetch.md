# Custom fetch

## Fetch function

Initialy, `vot.js` was developed with the need to support GM_fetch ([GM_xmlhttpRequest](https://www.tampermonkey.net/documentation.php?locale=en#api:GM_xmlhttpRequest)) in mind, so it's fully compatible with any custom fetch implementations that follow a syntax similar to the original Node fetch, e.g. [ofetch](https://github.com/unjs/ofetch), [GM_fetch](https://github.com/ilyhalight/voice-over-translation/blob/master/src/utils/utils.js) and etc

If the syntax is similar to the standard Node fetch, you can simply pass fetchFn when creating the `VOTClient` or using `getVideoData`.

```ts
import { ofetch } from "ofetch";

import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient({
  fetchFn: ofetch.native,
});

const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI", {
  fetchFn: ofetch.native,
});

// ...
```

## Fetch options

Additionally, besides providing your own fetch function, you can specify extra fetch options using `fetchOpts` when creating `VOTClient`.

```ts
import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient({
  fetchOpts: {
    headers: {
      "X-Test-Header": "Test",
    },
  },
});

// ...
```

### VOT Agent (Proxy)

::: danger
This isn't available in `@vot.js/ext`.
:::

::: tip
If you're using [Bun](https://bun.sh/), you don't need to worry about this.
:::

Node, out of the box, doesn't support an easy way to remove default fetch headers, so that's where the [Undici Dispatcher](https://github.com/nodejs/undici/blob/main/docs/docs/api/Dispatcher.md) comes in. Using it, we have created two agents:

1. **VOTAgent** is default value for `fetchOpts.dispatcher`, used to remove headers from the request. Without it, Node will throw an error.

2. **VOTAgentProxy** is an additional agent that does the same as VOTAgent but also allows setting an HTTP(s) proxy for the request, as it's built on top of [Undici's ProxyAgent](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

```ts
import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";
import { VOTProxyAgent, VOTAgent } from "@vot.js/node/utils/fetchAgent";

const client = new VOTClient({
  fetchOpts: {
    // dispatcher: new VOTAgent(), // default value
    dispatcher: new VOTProxyAgent("http://127.0.0.1:8888"),
  },
});

// ...
```
