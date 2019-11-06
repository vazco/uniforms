// @ts-ignore
import { Match } from 'meteor/check'; // eslint-disable-line
// @ts-ignore
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; // eslint-disable-line
import { createSchemaBridge, filterDOMProps } from 'uniforms';

import SimpleSchemaBridge from './SimpleSchemaBridge';

// Register bridge.
createSchemaBridge.register(SimpleSchemaBridge);

// Register custom property.
SimpleSchema.extendOptions({
  uniforms: Match.Optional(
    Match.OneOf(
      String,
      Function,
      Match.ObjectIncluding({
        component: Match.Optional(Match.OneOf(String, Function))
      })
    )
  )
});

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
