# Get Started

::: danger
vot.js **<u>doesn't</u>** officially support **Deno**. The core functionality should work, but there is no guarantee that it will work as expected.
:::

## JS runtimes

Support for Node.js and Bun are provided in `@vot.js/node`

::: code-group

```bash [npm]
npm install @vot.js/node
```

```bash [bun]
bun add @vot.js/node
```

```bash [pnpm]
pnpm add @vot.js/node
```

```bash [yarn]
yarn add @vot.js/node
```

:::

```ts
import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient();
const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI");

let response = await client.translateVideo({
  videoData,
});

console.log(response);
```

## Browser

Support for Browser is provided in `@vot.js/ext`.

`@vot.js/ext` and `@vot.js/node` have similar functionality, and in most cases, functions from one library will work for the other unless stated otherwise.

::: code-group

```bash [npm]
npm install @vot.js/ext
```

```bash [bun]
bun add @vot.js/ext
```

```bash [pnpm]
pnpm add @vot.js/ext
```

```bash [yarn]
yarn add @vot.js/ext
```

:::

In the example below, you can see that `getVideoData` **requires specifying a service, <u>not a link</u>**. This is a feature of `@vot.js/ext` because it gets the link using `window.location.href` at the time of the call.

```ts
import VOTClient from "@vot.js/node"; // [!code --] [!code focus:4]
import { getVideoData } from "@vot.js/node/utils/videoData"; // [!code --]
import VOTClient from "@vot.js/ext"; // [!code ++]
import { getVideoData } from "@vot.js/ext/utils/videoData"; // [!code ++]

const client = new VOTClient();
const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI"); // [!code --] [!code focus:6]
const service = getService(); // [!code ++]
// [!code ++]
if (!service.length) {
  // [!code ++]
  throw new Error("No service detected");
} // [!code ++]
const videoData = await getVideoData(service[0]); // [!code ++]

let response = await client.translateVideo({
  videoData,
});

console.log(response);
```

## Core

Core functions provided in `@vot.js/core` and `@vot.js/shared`

::: code-group

```bash [npm]
npm install @vot.js/core @vot.js/shared
```

```bash [bun]
bun add @vot.js/core @vot.js/shared
```

```bash [pnpm]
pnpm add @vot.js/core @vot.js/shared
```

```bash [yarn]
yarn add @vot.js/core @vot.js/shared
```

:::

Unlike `@vot.js/node` and `@vot.js/ext` library `@vot.js/core` doesn't have ready-made helpers, as well as ready-made logic for obtaining videoData, videoId, or service definition. You can use it to write your own implementation with the logic you need.
