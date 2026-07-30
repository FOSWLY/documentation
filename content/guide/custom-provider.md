# Custom Provider

Since `vot.js 3.0.0` you can create your own provider for `VOTClient` and use it instead of the default one. This is useful if you want to use a custom backend or if you want to use a different API.

Firstly you need to create a class that implements the `VOTProvider` interface. This class should have a `translateVideo`, `getSubtitles` and `translateStream` methods. Also, you need to use base props for methods, but you can add your own props to them.

```ts
import { BaseProvider } from "@vot.js/core/providers/base";
import { BaseVideoTranslationOpts } from "@vot.js/core/types/providers/base";

class CustomProvider extends BaseProvider {
  async translateVideo(
    opts: BaseVideoTranslationOpts & {
      test: "passed";
    },
  ): ReturnType<BaseProvider["translateVideo"]> {
    throw new Error("Not implemented");
  }
  async getSubtitles(): ReturnType<BaseProvider["getSubtitles"]> {
    throw new Error("Not implemented");
  }
  async translateStream(): ReturnType<BaseProvider["translateStream"]> {
    throw new Error("Not implemented");
  }
}
```

After you have created your own provider, you can use it in the `VOTClient` constructor.

```ts
import VOTClient from "@vot.js/node/src";
import { getVideoData } from "@vot.js/node/src/utils/videoData";

const client = new VOTClient({
  provider: CustomProvider,
});

const res = await client.translateVideo({
  videoData: await getVideoData("https://youtu.be/LK6nLR1bzpI"),
  test: "passed",
});

console.log(res);
```
