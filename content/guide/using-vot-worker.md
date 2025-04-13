# Using with VOT Worker

Sometimes we need to use the api, despite the blocked Yandex servers or the presence of COSR. In this case, the [vot-worker](https://github.com/FOSWLY/vot-worker) comes to the rescue.

Before you start, you need to deploy your own instance, or you can use a public one `vot-worker.toil.cc`.

```ts
import VOTClient from "@vot.js/node"; // [!code --] [!code focus:2]
import { VOTWorkerClient } from "@vot.js/node"; // [!code ++]
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient(); // [!code --] [!code focus:4]
// [!code ++]
const client = new VOTWorkerClient({
  host: "vot-worker.toil.cc", // [!code ++] by default
}); // [!code ++]
const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI");

let response = await client.translateVideo({
  videoData,
});

console.log(response);
```
