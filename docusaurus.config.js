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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,
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
          editUrl: 'https://github.com/locktopus-project/locktopus-website/edit/main/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-Z7CXDQY8CY'
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true
      },
      announcementBar: {
        id: 'support_ukraine',
        backgroundColor: 'yellow',
        isCloseable: true,
        textColor: "black",
        content: 'This open-source software is available for free. But peace and freedom are not. Today, Ukrainian soldiers are paying their lives to protect us against russian terrorism. Every single $ of your <a target="_blank" href="https://savelife.in.ua/en/donate-en/#donate-army-card-once">HELP</a> is greatly appreciated'
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
            title: 'Project links',
            items: [
              {
                href: 'https://pkg.go.dev/github.com/locktopus-project/locktopus',
                label: 'pkg.go.dev'
              },
              {
                href: 'https://github.com/locktopus-project',
                label: 'Github'
              },
              {
                href: 'https://playground.locktopus.xyz',
                label: 'Locktopus Playground'
              },
              {
                href: 'https://hub.docker.com/r/locktopus/locktopus',
                label: 'Dockerhub'
              }
            ]
          },
          {
            title: "Contacts",
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
        copyright: `Copyright © ${new Date().getFullYear()} Oleksii Shkut (<a href="https://github.com/locktopus-project/locktopus/blob/master/LICENCE" target="_blank">Licence</a>). Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
