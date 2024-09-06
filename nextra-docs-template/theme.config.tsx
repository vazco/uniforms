import { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: <b>uniforms</b>,
  project: {
    link: 'https://github.com/vazco/uniforms',
  },
  chat: {
    link: 'https://forminer.com/?utm_source=uniforms&utm_medium=Menu_CTA&utm_campaign=Forminer_uniforms_menu_CTA&utm_id=Forminer_uniforms_menu',
  },
  docsRepositoryBase: 'https://github.com/vazco/uniforms',
  footer: {
    text: (
      <p>
        Copyright © 2016 - 2024 Vazco.
        <br />
        All Rights Reserved.
      </p>
    ),
  },
};

export default config;
