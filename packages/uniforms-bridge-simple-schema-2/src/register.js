import SimpleSchema from 'simpl-schema';

import createSchemaBridge from 'uniforms/createSchemaBridge';
import filterDOMProps from 'uniforms/filterDOMProps';

import SimpleSchema2Bridge from './SimpleSchema2Bridge';

// Register bridge.
createSchemaBridge.register(SimpleSchema2Bridge);

// Register custom property.
SimpleSchema.extendOptions(['uniforms']);

// There's no possibility to retrieve them at runtime
filterDOMProps.register(
  'allowedValues',
  'autoValue',
  'blackbox',
  'custom',
  'decimal',
  'defaultValue',
  'exclusiveMax',
  'exclusiveMin',
  'label',
  'max',
  'maxCount',
  'min',
  'minCount',
  'optional',
  'regEx',
  'trim',
  'type'
);
