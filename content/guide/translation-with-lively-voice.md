# Translation with Lively voice

Let's translate a video with lively voice.

The feature has some limitations:

- Requires additional authorization with Yandex account
- Only `en` -> `ru` language pair is supported
- maybe something else...

## How to authorize?

To login using a Yandex account, we have two options:

1. With OAuth token

Just pass the OAuth token in the VOTClient options or:

```ts
const client = new VOTClient({
  // auth method 1
  apiToken: "YOUR_OAUTH_TOKEN",
});

// auth method 1 (alternative way)
client.translateVideo({
  //...,
  headers: {
    Authorization: "OAuth YOUR_OAUTH_TOKEN",
  },
});
```

\* token scopes aren't important

2. With cookies

This is original authorization method that was used in the YaBrowser.

We need to pass only valid `Session_id` cookie. Cookie value like `noauth:<xxxx>` isn't valid.

```ts
// auth method 2
client.translateVideo({
  //...,
  headers: {
    Cookie: "Session_id=3:xxxxxxxxxxx.x.x.xxxxx...",
  },
});
```

## How to use?

1. Create a `VOTClient` instance
2. Use one of authorization methods
3. Pass `extraOpts.useLivelyVoice` option to `translateVideo` method

```ts
const client = new VOTClient({
  // auth method 1
  // apiToken: "YOUR_OAUTH_TOKEN"
});

await client.translateVideo({
  // ...
  extraOpts: {
    useLivelyVoice: true,
  },
  // auth method 2
  // headers: {
  //   Cookie: "Session_id=3:xxxxxxxxxxx.x.x.xxxxx...",
  // },
});
```
