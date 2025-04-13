# Translating stream

Stream translation happens in real time, so instead of an `.mp3` audio file, server returns an M3U8 audio stream. Because of this, it's necessary to ping the server to prevent the M3U8 stream from stopping.

```ts
import VOTClient from "@vot.js/node";
import { getVideoData } from "@vot.js/node/utils/videoData";

import {
  StreamTranslationResponse,
  WaitingStreamTranslationResponse,
} from "@vot.js/core/types/yandex";

const client = new VOTClient();
const videoData = await getVideoData("https://youtu.be/JRi2sYaPsjc");

let response: StreamTranslationResponse;
let inter: Timer;

function isAbortedWaitingStream(
  response: StreamTranslationResponse
): response is WaitingStreamTranslationResponse {
  return !!(response as WaitingStreamTranslationResponse).message;
}

const fn = async () => {
  response = await client.translateStream({
    videoData,
    requestLang: "en",
    responseLang: "ru",
  });

  console.log(response);
  clearTimeout(inter);
  if (!response.translated && response.interval === 10) {
    inter = setTimeout(fn, response.interval * 1000);
    return;
  }

  if (isAbortedWaitingStream(response)) {
    console.log(`Stream translation aborted! Message: ${response.message}`);
    return;
  }

  console.log(`Success! URL: ${response.result.url}`);
  const pingId = response.pingId;
  setInterval(async () => {
    await client.pingStream({
      pingId,
    });
  }, response.interval * 1000);
};

inter = setTimeout(fn, 10000);
```

At the moment (April 2025), streaming support is available for YouTube and Twitch.
