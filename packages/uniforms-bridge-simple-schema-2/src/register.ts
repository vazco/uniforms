import SimpleSchema from 'simpl-schema';
import { filterDOMProps } from 'uniforms';

// Register custom property.
SimpleSchema.extendOptions(['uniforms']);

// There's no possibility to retrieve them at runtime.
declare module 'uniforms' {
  interface FilterDOMProps {
    autoValue: never;
    blackbox: never;
    custom: never;
    decimal: never;
    defaultValue: never;
    exclusiveMax: never;
    exclusiveMin: never;
    max: never;
    maxCount: never;
    min: never;
    minCount: never;
    optional: never;
    regEx: never;
    trim: never;
    type: never;
  }
}

filterDOMProps.register(
  'autoValue',
  'blackbox',
  'custom',
  'decimal',
  'defaultValue',
  'exclusiveMax',
  'exclusiveMin',
  'max',
  'maxCount',
  'min',
  'minCount',
  'optional',
  'regEx',
  'trim',
  'type',
);
