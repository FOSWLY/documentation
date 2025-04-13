# Get subtitles

It seems that subtitles are generated along with the translation. So, if you didn't receive a list of subtitles when requesting, you're likely to get them after the video translation is complete.

```ts
import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";

const client = new VOTClient();
const videoData = await getVideoData("https://youtu.be/LK6nLR1bzpI");

const subs = await client.getSubtitles({
  videoData,
  requestLang: "ru",
});

console.log(subs);
```
