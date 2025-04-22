# Advanced translation

If necessary, you can specify additional options when making a translation request. There's no need to dwell on simple and understandable options like `requestLang`, `responseLang`, and `headers`, as their functionality is clear from their names. All additional options are optional.

```ts
// ...

const response = await client.translateVideo({
  videoData,
  requestLang: "en",
  responseLang: "ru",
  headers: {
    "X-Test-Header": "Test",
  },
});
```

## Which sites are supported?

You can view the names of sites directly supported by the library in keys of `VideoService` enum. In addition to those, direct links to `.webm` and `.mp4` files are also supported. When adding new sites, we rely on [yt-dlp](https://github.com/yt-dlp/yt-dlp/tree/master/yt_dlp/extractor) (although this does not guarantee 100% functionality). If a site refuses to be translated directly, we create a special "Helper" that extracts the link to the mp4/webm video or to m3u8 in some cases (for m3u8, additional logic needs to be implemented in vot-backend) and sends that link for translation.

## Translation Help field

This is another way to request a video translation if you have a direct link to an `mp4` or `webm` media file and a link to `vtt` subtitles.

The `translationHelp` field must be provided if `videoData.url` isn't a link to one of the supported websites or a direct link to an `mp4` or `webm` video file.

This is useful if you only have a temporary link to an `mp4` or `webm` file. Once you request a translation with the `translationHelp` field, the server will translate the video and make it accessible via the unsupported link, even in future requests without `translationHelp`.

```ts
// ...

const response = await client.translateVideo({
  videoData: {
    url: "https://s3.toil.cc/vot/video",
    videoId: "vot/video",
    host: VideoService.custom,
  },
  translationHelp: [
    {
      target: "subtitles_file_url",
      targetUrl: "https://s3.toil.cc/vot/subs.vtt",
    },
    {
      target: "video_file_url",
      targetUrl: "https://s3.toil.cc/vot/video.mp4",
    },
  ],
});
```

Previously, provided subtitles affected the dubbing, but this was disabled in early 2025.

## Translation options

`shouldSendFailedAudio`

At the end of 2024, Yandex changed the translation logic for YouTube. Since then, an additional request is required to start sending the audio webm file as bytes. At the time of writing this documentation, there is no ready and tested example for sending the audio file. Therefore, it's recommended to keep this field set to `true` (default) if you aren't implementing your own logic.

`extraOpts`

These are additional options that will be used when forming the request body:

`extraOpts.forceSourceLang`

Indicates that the user manually selected the video language. If false – the language was detected automatically.

`extraOpts.wasStream`

Applies **only to YouTube**.

Indicates that the video was previously a live stream.

`extraOpts.bypassCache`

Bypass the cache for the requested translation. Works somewhat inconsistently.

`extraOpts.useLivelyVoice` (formerly `extraOpts.useNewModel`)

Translate videos from English to Russian with voice clonning.

::: warning
Requires pass `Session_id=...` Cookie field in headers option. This cookie you can get from your Yandex authorized account.
:::

Official release 21th April 2025. First observed in autumn 2024.

`extraOpts.videoTitle`

The title of the YouTube video. It’s unclear whether it affects anything.

First observed in early 2025.

## Use custom VideoService

Sometimes, you need to add a video service yourself or change an existing list of video services. In this case, you can pass your type to VideoService when initializing VOTClient.

Actually, `host` and `videoId` are used only for requests to the VOT Backend. Therefore, you aren't always required to provide real values for them.

```ts
import VOTClient from "@vot.js/node";

// enum
enum CustomVideoService {
  example = "example",
  test = "test",
}
const client = new VOTClient<CustomVideoService>();
await client.translateVideo({
  videoData: {
    url: "https://example.com/123",
    host: CustomVideoService.example,
    videoId: "123",
  },
});

// literal union
type OtherVideoService = "example" | "test";
const otherClient = new VOTClient<OtherVideoService>();
await otherClient.translateVideo({
  videoData: {
    url: "https://example.com/123",
    host: "test",
    videoId: "123",
  },
});
```

## Custom VideoService Helper

It's recommended to follow the same logic as in the library and create new "Helpers" as subclasses of `BaseHelper`.

```ts
import { BaseHelper } from "./base";

export default class YoukuHelper extends BaseHelper {
  // Optional (read below)
  async getVideoData(videoId: string): Promise<MinimalVideoData | undefined> {
    return undefined;
  }

  async getVideoId(url: URL): Promise<string | undefined> {
    return /v_show\/id_[\w=]+/.exec(url.pathname)?.[0];
  }
}
```

### Naming

`YoukuHelper` is a name of Helper class. It can be anything, but it's recommended to use site name from `VideoService` type, e.g. `youku` is `YoukuHelper` and etc.

```ts
export enum VideoService {
  // ...
  youku = "youku", // <-- site name
  // ...
}
```

### getVideoData

An **optional** function that is only triggered if the _site_ has the `needExtraData` field:

::: code-group

```ts [data/sites.ts]
export default [
  {
    host: VideoService.youku,
    url: "https://v.youku.com/",
    match: /^v.youku.com$/,
    // needExtraData: true, // uncomment to enable using getVideoData in Helper
  },
] as ServiceConf[];
```

:::

This function should return an object of type `MinimalVideoData` or `undefined`. `MinimalVideoData` is an object that must contain at least the `url: string` field. All other optional fields are equivalent to those in the `VideoData` type.

### getVideoId

A **required** function to set the logic for getting videoId by URL. The function should return a `string` or `undefined` if the videoId is not found.

### returnBaseData

A helper function that can be used in `YourServiceHelper.getVideoData`. It returns the default data that would have been returned by the `getVideoData` function from `@vot.js/node/utils/videoData` (or from `@vot.js/ext/...`) if `needExtraData` field in _site_ were disabled.
