import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PRAYSAP Documentation',
  tagline: 'Connect Muslims globally for prayer and community',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.praysap.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: 'PRAYSAP',
  projectName: 'praysap-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/praysap-social-card.png',
    metadata: [
      {name: 'og:image', content: 'https://docs.praysap.com/img/praysap-social-card.png'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:image', content: 'https://docs.praysap.com/img/praysap-social-card.png'},
    ],
    navbar: {
      title: 'PRAYSAP Docs',
      logo: {
        alt: 'PRAYSAP Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'praysapSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://praysap.com',
          label: 'Main Site',
          position: 'left',
        },
        {
          href: 'https://twitter.com/praysap',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/company/praysap',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://www.facebook.com/praysap',
          label: 'Facebook',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'User Guides',
              to: '/docs/user-guides/host-prayer',
            },
            {
              label: 'About PRAYSAP',
              to: '/docs/about-praysap/mission-vision',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Main Website',
              href: 'https://praysap.com',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/praysap',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PRAYSAP.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
