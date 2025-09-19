import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // PRAYSAP Documentation Sidebar
  praysapSidebar: [
    'intro',
    {
      type: 'category',
      label: 'About PRAYSAP',
      items: [
        'about-praysap/mission-vision',
        // Add more about pages as they're created
      ],
    },
    {
      type: 'category', 
      label: 'Getting Started',
      items: [
        'getting-started/account-setup',
        'getting-started/shahada-verification',
        // Add interface-overview when created
      ],
    },
    {
      type: 'category',
      label: 'User Guides', 
      items: [
        'user-guides/creating-prayers',
        // Add more user guide pages as they're created
        // 'user-guides/joining-prayers',
        // 'user-guides/profile-management',
        // 'user-guides/prayer-notifications',
      ],
    },
    // Uncomment sections below as content is added
    /*
    {
      type: 'category',
      label: 'Technical Information',
      items: [
        'technical-information/blockchain-integration',
        'technical-information/praysap-token',
      ],
    },
    {
      type: 'category', 
      label: 'Platform Resources',
      items: [
        'platform-resources/mobile-apps',
        'platform-resources/community-support', 
      ],
    },
    {
      type: 'category',
      label: 'Legal Information',
      items: [
        'legal-information/privacy-policy',
        'legal-information/terms-of-service',
      ],
    },
    */
  ],
};

export default sidebars;
