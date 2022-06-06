declare module '@docusaurus/*' {
  const something: any;
  export = something;
}

declare module '@theme/*' {
  const something: any;
  export = something;
}

declare module '*.md' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export = Component;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export = classes;
}
