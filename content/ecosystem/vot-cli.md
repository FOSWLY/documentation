[vot-worker-link]: https://github.com/FOSWLY/vot-worker
[vot-backend-link]: https://github.com/FOSWLY/vot-backend
[supported-langs-wiki]: https://github.com/FOSWLY/vot-cli/wiki/%5BRU%5D-Supported-langs

# vot-cli

[vot-cli](https://github.com/FOSWLY/vot-cli) a tool for translating videos or downloading subtitles using vot.js

## Installation

<div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
  <a href="https://github.com/FOSWLY/vot-cli/releases">
    <img src="/badges/github-releases.png" alt="Install from Github Releases" />
  </a>
</div>

Also, you can install [vot-cli](https://github.com/FOSWLY/vot-cli) from NPM:

::: code-group

```bash [npm]
npm install -g vot-cli
```

```bash [bun]
bun install -g vot-cli
```

:::

## Features

This script lets you:

- Download a video translation or get a link to it
- Download video subtitles in SRT, VTT or JSON format or get a link to them
- Get a link to the finished file without downloading (preview mode)
- Use lively voices for translation (en -> ru)
- Output results in JSON or as plain links (without progress)
- Process multiple links in one run

## Usage

Usage example:

```bash
vot-cli [options] <link> [link2] [link3] ...
```

<details>
<summary>Click to see more</summary>

- `vot-cli [options] <link> [link2] [link3] ...` - general example
- `vot-cli <link>` - get audio translation from a link
- `vot-cli --help` - show help
- `vot-cli --version` - show version
- `vot-cli --json [options] <link>` - get result as JSON
- `vot-cli --outdir=<path> <link>` - get audio translation and save it to the specified path
- `vot-cli --outdir=<path> --reslang=en <link>` - get audio translation in English and save it to the specified path
- `vot-cli --subs --outdir=<path> --reslang=en <link>` - get English subtitles and save them to the specified path
- `vot-cli --outdir="." "https://www.youtube.com/watch?v=X98VPQCE_WI" "https://www.youtube.com/watch?v=djr8j-4fS3A&t=900s"` - real data example

</details>

### Parameters

- **-h**, **--help**: show help
- **-v**, **--version**: show script version
- **-o**, **--out**, **--outdir=(path)**: set output directory
- **--outfile=(name)**: set output filename
- **--lang=(lang)**: set source video language (see [wiki][supported-langs-wiki] for supported languages). Default: `en`
- **--reslang=(lang)**: set audio track or subtitle language (see [wiki][supported-langs-wiki] for supported languages). Default: `ru`
- **--proxy=(url)**: set HTTP or HTTPS proxy in format `[<PROTOCOL>://]<USERNAME>:<PASSWORD>@<HOST>[:<port>]`
- **--worker-host=(url)**: set your own [vot-worker][vot-worker-link] in format `[<PROTOCOL>://]<HOST>[:<port>][/<PREFIX>]`
- **--vot-host=(url)**: set your own [vot-backend][vot-backend-link] server in format `[<PROTOCOL>://]<HOST>[:<port>][/<PREFIX>]`
- **--subs**: get subtitles instead of audio, if available
- **--subs-format=(format)**: set subtitle format (`json`, `srt`, `vtt`. Does not work with `--preview`)
- **--preview**: get a download link without downloading
- **--lively-voice**: use lively voices for available videos (only `en` -> `ru`)
- **--api-token**: set Yandex OAuth API token for using lively voices. You can get a token via the [debug link](https://yandex.ru/dev/id/doc/ru/tokens/debug-token)
- **--no-visual**: output result to stdout/stderr without progress info (1 line = 1 link)
- **--json**: output result to stdout/stderr as JSON without progress info
- **--no-title**: use video ID as filename, without attempting to get the video title

### JSON output examples

All examples in this README have been formatted separately for readability. In real output, JSON will be a single line, and some lists may be longer.

<details>
<summary>Successful execution</summary>

```bash
vot-cli --json ...
```

```json
{
  "ok": true,
  "summary": {
    "total": 1,
    "success": 1,
    "failed": 0
  },
  "results": [
    {
      "input": "https://www.youtube.com/watch?v=X98VPQCE_WI",
      "status": "success",
      "type": "audio",
      "videoId": "X98VPQCE_WI",
      "url": "https://example.com/audio.mp3",
      "outputPath": "C:\\downloads\\X98VPQCE_WI.mp3"
    }
  ]
}
```

</details>

<details>
<summary>Processing error</summary>

```bash
vot-cli --json ...
```

```json
{
  "ok": false,
  "summary": {
    "total": 1,
    "success": 0,
    "failed": 1
  },
  "results": [
    {
      "input": "not-a-url",
      "status": "failed",
      "type": "audio",
      "videoId": null,
      "url": null
    }
  ]
}
```

</details>

## Optional features

### Using yt-dlp for video titles

vot-cli can use [yt-dlp](https://github.com/yt-dlp/yt-dlp) to get human-readable video titles for output filenames.

If yt-dlp is not found on the system, video IDs will be used as filenames (`X98VPQCE_WI.mp3` instead of the title).

You can disable this behavior with the `--no-title` flag.
