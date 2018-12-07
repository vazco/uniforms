/* global Package */

import cloneDeep from 'lodash/cloneDeep';
import invariant from 'invariant';

import Bridge from './Bridge';
import joinName from './joinName';
import filterDOMProps from './filterDOMProps';

let Match = (typeof global === 'object' ? global : window).Match;
let SimpleSchema = (typeof global === 'object' ? global : window).SimpleSchema;

/* istanbul ignore next */
try {
  if (Match === undefined && typeof Package === 'object') {
    Match = Package['check'].Match;
  }

  if (SimpleSchema === undefined && typeof Package === 'object') {
    SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
  }
} catch (_) {
  /* Ignore it. */
}

try {
  const r = require; // Silence Meteor missing module warning

  if (Match === undefined) {
    Match = r('meteor/check').Match;
  }

  if (SimpleSchema === undefined) {
    SimpleSchema = r('meteor/aldeed:simple-schema').SimpleSchema;
  }
} catch (_) {
  /* Ignore it. */
}

if (SimpleSchema && Match) {
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
}

export default class SimpleSchemaBridge extends Bridge {
  constructor(schema) {
    super();

    this.schema = schema;
  }

  static check(schema) {
    return (
      SimpleSchema &&
      (schema &&
        schema.getDefinition &&
        schema.messageForError &&
        schema.objectKeys &&
        schema.validator &&
        schema.version !== 2)
    );
  }

  getError(name, error) {
    return (error && error.details && error.details.find && error.details.find(error => error.name === name)) || null;
  }

  getErrorMessage(name, error) {
    const scopedError = this.getError(name, error);
    return !scopedError
      ? ''
      : this.schema.messageForError(
          scopedError.type,
          scopedError.name,
          null,
          scopedError.details && scopedError.details.value
        );
  }

  getErrorMessages(error) {
    if (error) {
      if (Array.isArray(error.details)) {
        return error.details.map(error =>
          this.schema.messageForError(error.type, error.name, null, error.details && error.details.value)
        );
      }

      if (error.message) {
        return [error.message];
      }
    }

    if (error !== undefined) {
      return [error];
    }

    return [];
  }

  getField(name) {
    const definition = this.schema.getDefinition(name);

    invariant(definition, 'Field not found in schema: "%s"', name);

    return definition;
  }

  getInitialValue(name, props = {}) {
    const field = this.getField(name);

    if (field.type === Array) {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = Math.max(props.initialCount || 0, field.minCount || 0);

      return [...Array(items)].map(() => item);
    }

    if (field.type === Object) {
      return {};
    }

    return field.defaultValue;
  }

  // eslint-disable-next-line complexity
  getProps(name, props = {}) {
    // Type should be omitted.
    // eslint-disable-next-line no-unused-vars, prefer-const
    let {optional, type, uniforms, ...field} = this.getField(name);

    field = {...field, required: !optional};

    if (uniforms) {
      if (typeof uniforms === 'string' || typeof uniforms === 'function') {
        field = {...field, component: uniforms};
      } else {
        field = {...field, ...uniforms};
      }
    }

    if (type === Array) {
      try {
        const itemProps = this.getProps(`${name}.$`, props);
        if (itemProps.allowedValues && !props.allowedValues) {
          field.allowedValues = itemProps.allowedValues;
        }

        if (itemProps.transform && !props.transform) {
          field.transform = itemProps.transform;
        }
      } catch (_) {
        /* ignore it */
      }
    }

    let options = props.options || field.options;
    if (options) {
      if (typeof options === 'function') {
        options = options();
      }

      if (!Array.isArray(options)) {
        field = {
          ...field,
          transform: value => options[value],
          allowedValues: Object.keys(options)
        };
      } else {
        field = {
          ...field,
          transform: value => options.find(option => option.value === value).label,
          allowedValues: options.map(option => option.value)
        };
      }
    }

    return field;
  }

  getSubfields(name) {
    return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
  }

  getType(name) {
    return this.getField(name).type;
  }

  getValidator(options = {clean: true}) {
    const validator = this.schema.validator(options);

    // Clean mutate its argument.
    if (options.clean) {
      return model => validator(cloneDeep({...model}));
    }

    return validator;
  }
}
