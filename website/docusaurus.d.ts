declare module '@docusaurus/*' {
  const something: any;
  export = something;
}

declare module '@theme/*' {
  const something: any;
  export = something;
}

declare module '*.md' {
  // eslint-disable-next-line import/order
  import { ComponentType } from 'react';
  const Component: ComponentType<{}>;
  export = Component;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export = classes;
}

declare module 'meteor/aldeed:simple-schema' {
  import SimpleSchemaStatic from 'simpl-schema';
  export class SimpleSchema extends SimpleSchemaStatic {
    static _makeGeneric(name?: string): string;
    static extendOptions(options: Record<string, any>): void;
  }
}

declare module 'meteor/check' {
  export const Match: any;
}
