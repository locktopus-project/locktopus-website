// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Locktopus',
  tagline: 'Flexible and efficient locks',
  url: 'https://locktopus.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "_docs",
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'support_ukraine',
        backgroundColor: 'yellow',
        isCloseable: true,
        textColor: "black",
        content: 'This project is open-source and free, unlike Freedom. Today, Ukrainian soldiers pay their lives to fight russian terrorism. Every $ of <a target="_blank" href="https://savelife.in.ua/en/donate-en/#donate-army-card-once">help</a> is greatly appreciated'
      },
      navbar: {
        title: 'Locktopus',
        logo: {
          alt: 'Locktopus Logo',
          src: 'img/locktopus.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://playground.locktopus.xyz',
            label: 'Playground',
            position: 'right',
          },
          {
            href: 'https://github.com/locktopus-project',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tributes',
            items: [
              {
                href: 'https://docusaurus.io',
                label: 'Docusaurus'
              },
              {
                href: 'https://savelife.in.ua',
                label: 'savelife.in.ua'
              },
            ],
          },
          {
            title: "Feedback",
            items: [
              {
                html: 'Found a typo? <a target="_blank" href="https://github.com/locktopus-project/locktopus-website">Edit and propose</a>'
              },
              {
                html: 'Provide direct feedback to <a target="_blank" href="mailto:locktopus.project@gmail.com">locktopus.project@gmail.com</a>'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Oleksii Shkut. Published under MIT licence. Build with Docusaurus`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
