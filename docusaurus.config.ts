import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PRAYSAP Documentation',
  tagline: 'Connect Muslims globally for prayer and community',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.praysap.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'PotLock', // Usually your GitHub org/user name.
  projectName: 'praysap-docs', // Usually your repo name.

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
          editUrl:
            'https://github.com/PotLock/praysap-pwa',
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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'PRAYSAP Docs',
      logo: {
        alt: 'PRAYSAP Logo',
        src: 'img/logo.svg',
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
          href: 'https://apps.apple.com/app/praysap',
          label: 'iOS App',
          position: 'right',
        },
        {
          href: 'https://play.google.com/store/apps/details?id=com.praysap',
          label: 'Android App', 
          position: 'right',
        },
        {
          href: 'https://github.com/PotLock/praysap-docs',
          label: 'GitHub',
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
              to: '/docs/user-guides/creating-prayers',
            },
            {
              label: 'About PRAYSAP',
              to: '/docs/about-praysap/mission-vision',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Support',
              href: 'mailto:support@praysap.com',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/praysap',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/praysap',
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
              label: 'iOS App',
              href: 'https://apps.apple.com/app/praysap',
            },
            {
              label: 'Android App',
              href: 'https://play.google.com/store/apps/details?id=com.praysap',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/PotLock/praysap-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PRAYSAP. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
