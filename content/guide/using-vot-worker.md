# Using with VOT Worker

Sometimes we need to use the api, despite the blocked Yandex servers or the presence of CORS. In this case, the [vot-worker](https://github.com/FOSWLY/vot-worker) comes to the rescue.

Before you start, you need to deploy your own instance, or you can use a public one `vot-worker.toil.cc`.

```ts
import VOTClient from "@vot.js/node";
import { VOTWorkerProvider } from "@vot.js/core/providers/votworker"; // [!code ++] [!code focus]
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient(); // [!code --] [!code focus:5]
// [!code ++]
const client = new VOTClient({
  provider: VOTWorkerProvider // [!code ++]
  host: "vot-worker.toil.cc", // [!code ++]
}); // [!code ++]
const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI");

let response = await client.translateVideo({
  videoData,
});

console.log(response);
```
