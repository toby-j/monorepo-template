import {PrismTheme, themes} from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const lightTheme: PrismTheme = themes.github;
const darkTheme: PrismTheme = themes.dracula;

const config: Config = {
  title: "Your App Title",
  tagline: "Your App Tagline",
  favicon: "img/favicon.ico",
  url: "https://CapgeminiInventUK.github.io",
  baseUrl: "/monorepo-template/",
  organizationName: "acme",
  projectName: "acme-app",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          path: "../docs",
          editUrl: "https://github.com/CapgeminiInventUK/monorepo-template/docs/intro.md",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Your App Title",
      logo: {
        alt: "your-app-logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/CapgeminiInventUK",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Capgemini Invent.`,
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: ["hcl"],
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;