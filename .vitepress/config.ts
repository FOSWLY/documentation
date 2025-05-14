import { defineConfig } from "vitepress";

const domain = "https://votdocs.toil.cc";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VOT",
  description:
    "An unofficial library for interacting with the Yandex VOT API, which supports working with JavaScript, TypeScript, and also has built-in parted types for Typebox.",
  srcDir: "content",
  vite: {
    publicDir: "public",
  },
  sitemap: {
    hostname: domain,
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    ["meta", { name: "theme-color", content: "#000000" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    ["meta", { property: "og:url", content: domain }],
    [
      "meta",
      {
        property: "og:title",
        content: "VOT | Powerful Voice Over Translation library",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: `${domain}/logo.png`,
      },
    ],
    ["meta", { property: "og:site_name", content: "VOTJS" }],
  ],
  themeConfig: {
    logo: {
      light: "/logo.svg",
      dark: "/logo.svg",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Ecosystem", link: "/ecosystem" },
      { text: "References", link: "https://foswly.github.io/vot.js/" },
    ],
    sidebar: {
      "/": [
        {
          text: "Guide",
          items: [
            { text: "Get Started", link: "/guide/" },
            { text: "Using with VOT Worker", link: "/guide/using-vot-worker" },
            { text: "Get subtitles", link: "/guide/get-subtitles" },
            { text: "Translating stream", link: "/guide/translating-stream" },
            {
              text: "Advanced translation",
              link: "/guide/advanced-translation",
            },
            {
              text: "Translation with Lively voice",
              link: "/guide/translation-with-lively-voice",
            },
            { text: "Custom fetch", link: "/guide/custom-fetch" },
          ],
        },
      ],
      "/ecosystem/": [
        {
          text: "Ecosystem",
          items: [
            { text: "Overview", link: "/ecosystem/" },
            {
              text: "voice-over-translation",
              link: "/ecosystem/voice-over-translation",
            },
            { text: "vot-cli", link: "/ecosystem/vot-cli" },
            { text: "vot-backend", link: "/ecosystem/vot-backend" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/FOSWLY/vot.js" }],
    search: {
      provider: "local",
    },
    editLink: {
      pattern:
        "https://github.com/FOSWLY/documentation/edit/master/content/:path",
    },
  },
  lastUpdated: true,
});
