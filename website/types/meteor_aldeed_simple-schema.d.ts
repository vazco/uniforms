declare module 'meteor/aldeed:simple-schema' {
  import SimpleSchemaStatic from 'simpl-schema';
  export class SimpleSchema extends SimpleSchemaStatic {
    static _makeGeneric(name?: string): string | undefined;
    // This type has to use `any` to match the `simpl-schema` argument type.
    static extendOptions(options: Record<string, any>): void;
    objectKeys(name?: string): string[];
  }
}
