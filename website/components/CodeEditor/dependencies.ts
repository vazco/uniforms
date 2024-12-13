export enum Bridges {
  Zod = 'zod',
  JSONSchema = 'json-schema',
  SimpleSchema = 'simpl-schema',
}

const defaultDependencies = {
  antd: '^5',
  uniforms: '4.0.0-beta.2',
  'uniforms-antd': '4.0.0-beta.2',
};

const zodDependencies = {
  'uniforms-bridge-zod': '4.0.0-beta.2',
  zod: '^3',
};

const jsonSchemaDependencies = {
  ajv: '^8',
  'uniforms-bridge-json-schema': '4.0.0-beta.2',
};

const simpleSchemaDependencies = {
  'simpl-schema': '^3',
  'uniforms-bridge-simple-schema-2': '4.0.0-beta.2',
};

export const dependencies = {
  [Bridges.Zod]: {
    ...defaultDependencies,
    ...zodDependencies,
  },
  [Bridges.JSONSchema]: {
    ...defaultDependencies,
    ...jsonSchemaDependencies,
  },
  [Bridges.SimpleSchema]: {
    ...defaultDependencies,
    ...simpleSchemaDependencies,
  },
};
