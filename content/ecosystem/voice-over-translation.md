# voice-over-translation

[UserScript](https://github.com/ilyhalight/voice-over-translation) that adds voice over translation and subtitles to many websites.

List of features:

- Translate videos into Russian, English, or Kazakh from supported source languages
- Translate live streams on YouTube (with slight delay)
- Display AI-generated subtitles
- Show site subtitles (e.g., YouTube's auto-translated subs)
- Save subtitles in `.srt`, `.vtt`, or `.json` formats
- Save translated audio as `.mp3`
- Auto-translate videos on open
- Separate volume sliders for original and translated audio
- Auto-adjust translated audio volume like in Yandex Browser
- Sync translation volume with video volume
- Limit translation for your native language (selectable in menu)
- Trigger translation with a hotkey
- Easy customize subtitle appearance
- Show word-by-word translation in subtitles

## Installation

You can install UserScript from our [GitHub](https://github.com/ilyhalight/voice-over-translation) repository.

## Customization of appearance

The extension supports customization of the appearance using Stylus, Stylish and other similar extensions.

Example of changing styles:

```css
/* ==UserStyle==
@name         VOT-styles
@version      16.09.2023
@namespace    vot-styles
@description  LLL
@author       Toil
@license      No License
==/UserStyle== */

:root {
  --vot-font-family: "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui,
    -apple-system;

  --vot-primary-rgb: 139, 180, 245;
  --vot-onprimary-rgb: 32, 33, 36;
  --vot-surface-rgb: 32, 33, 36;
  --vot-onsurface-rgb: 227, 227, 227;

  --vot-subtitles-color: rgb(var(--vot-onsurface-rgb, 227, 227, 227));
  --vot-subtitles-passed-color: rgb(var(--vot-primary-rgb, 33, 150, 243));
}
```

## Supported Browsers & Extensions

Works in all modern browsers with popular userscript managers like Tampermonkey, Violentmonkey, Greasemonkey, and etc.
