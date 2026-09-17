# voice-over-translation

[Extension](https://github.com/ilyhalight/voice-over-translation) that allows you to watch videos in other languages with voice-over translation and subtitles in any browser.

![example](https://github.com/ilyhalight/voice-over-translation/raw/master/img/banner.png)

## Installation

<div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
  <a href="https://chromewebstore.google.com/detail/dnioaagdjgpcokckfpokpndoblenmfcg">
    <img src="/badges/chrome-webstore.png" alt="Install from Chrome Web Store" />
  </a>
  <a href="https://addons.mozilla.org/ru/firefox/addon/voice-over-translation">
    <img src="/badges/firefox-addons.png" alt="Install from Firefox Add-ons" />
  </a>
  <a href="https://github.com/ilyhalight/voice-over-translation/releases">
    <img src="/badges/github-releases.png" alt="Install from Github Releases" />
  </a>
</div>

Also, you can install userscript version from [Github Releases](https://github.com/ilyhalight/voice-over-translation/releases).

Works in all modern browsers with popular userscript managers like Tampermonkey, Violentmonkey and etc

## Features

List of features:

- Translate videos into Russian, English, or Kazakh from supported source languages
- Auto-translate videos on open
- Auto-enable subtitles on open
- Smart subtitle layout that adapts line width and text size to player dimensions
- Display AI-generated subtitles
- Display site-provided subtitles (for example, auto-translated YouTube subtitles)
- Save subtitles in `.srt`, `.vtt`, `.ass` and `.json` formats
- Save translated audio as `.mp3`
- Separate volume sliders for original and translated audio
- Adaptive volume: duck original audio while translated speech is playing
- Link translation volume with video volume
- Limit translation from selected languages (selectable in the menu)
- Hotkeys for translation and subtitles (including key combinations)
- Easy subtitle appearance customization
- Word-by-word translation directly in subtitles

## Customization of appearance

The extension supports customization of the appearance using [Stylus](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne), [Stylish](https://userstyles.org/) and other similar extensions.

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
  --vot-font-family:
    "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system;

  --vot-primary-rgb: 139, 180, 245;
  --vot-onprimary-rgb: 32, 33, 36;
  --vot-surface-rgb: 32, 33, 36;
  --vot-onsurface-rgb: 227, 227, 227;

  --vot-subtitles-color: rgb(var(--vot-onsurface-rgb, 227, 227, 227));
  --vot-subtitles-passed-color: rgb(var(--vot-primary-rgb, 33, 150, 243));
}
```
