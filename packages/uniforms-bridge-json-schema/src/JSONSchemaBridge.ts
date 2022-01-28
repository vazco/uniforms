import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';

function fieldInvariant(name: string, condition: boolean): asserts condition {
  invariant(condition, 'Field not found in schema: "%s"', name);
}

function resolveRef(reference: string, schema: Record<string, any>) {
  invariant(
    reference.startsWith('#'),
    'Reference is not an internal reference, and only such are allowed: "%s"',
    reference,
  );

  const resolvedReference = reference
    .split('/')
    .filter(part => part && part !== '#')
    .reduce((definition, next) => definition[next], schema);

  invariant(
    resolvedReference,
    'Reference not found in schema: "%s"',
    reference,
  );

  return resolvedReference;
}

function resolveRefIfNeeded(
  partial: Record<string, any>,
  schema: Record<string, any>,
): Record<string, any> {
  if (!('$ref' in partial)) {
    return partial;
  }

  const { $ref, ...partialWithoutRef } = partial;
  return resolveRefIfNeeded(
    Object.assign({}, partialWithoutRef, resolveRef($ref, schema)),
    schema,
  );
}

const partialNames = ['allOf', 'anyOf', 'oneOf'];

const propsToRemove = [
  'default',
  'enum',
  'format',
  'isRequired',
  'title',
  'uniforms',
];

const propsToRename: [string, string][] = [
  ['maxItems', 'maxCount'],
  ['maximum', 'max'],
  ['minItems', 'minCount'],
  ['minimum', 'min'],
  ['multipleOf', 'step'],
];

function pathToName(path: string) {
  path = path.startsWith('/')
    ? path.replace(/\//g, '.').replace(/~0/g, '~').replace(/~1/g, '/')
    : path
        .replace(/\[('|")(.+?)\1\]/g, '.$2')
        .replace(/\[(.+?)\]/g, '.$1')
        .replace(/\\'/g, "'");

  return path.slice(1);
}

export default class JSONSchemaBridge extends Bridge {
  schema: Record<string, any>;
  _compiledSchema: Record<string, any>;

  constructor(
    schema: Record<string, any>,
    public validator: (model: Record<string, any>) => any,
  ) {
    super();

    this.schema = resolveRefIfNeeded(schema, schema);
    this._compiledSchema = { '': this.schema };

    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
    this.getType = memoize(this.getType.bind(this));
  }

  getError(name: string, error: any) {
    const details = error?.details;
    if (!Array.isArray(details)) {
      return null;
    }

    const nameParts = joinName(null, name);
    const rootName = joinName(nameParts.slice(0, -1));
    const baseName = nameParts[nameParts.length - 1];
    const scopedError = details.find(error => {
      const path = pathToName(error.instancePath ?? error.dataPath);
      return (
        name === path ||
        (rootName === path && baseName === error.params.missingProperty)
      );
    });

    return scopedError || null;
  }

  getErrorMessage(name: string, error: any) {
    const scopedError = this.getError(name, error);
    return scopedError?.message || '';
  }

  getErrorMessages(error: any) {
    if (!error) {
      return [];
    }

    const { details } = error;
    return Array.isArray(details)
      ? details.map(error => error.message)
      : [error.message || error];
  }

  getField(name: string) {
    return joinName(null, name).reduce((definition, next, index, array) => {
      const prevName = joinName(array.slice(0, index));
      const nextName = joinName(prevName, next);
      const definitionCache = (this._compiledSchema[nextName] ??= {});
      definitionCache.isRequired = !!(
        definition.required?.includes(next) ||
        this._compiledSchema[prevName].required?.includes(next)
      );

      if (next === '$' || next === '' + parseInt(next, 10)) {
        fieldInvariant(name, definition.type === 'array');
        definition = Array.isArray(definition.items)
          ? definition.items[parseInt(next, 10)]
          : definition.items;
        fieldInvariant(name, !!definition);
      } else if (definition.type === 'object') {
        fieldInvariant(name, !!definition.properties);
        definition = definition.properties[joinName.unescape(next)];
        fieldInvariant(name, !!definition);
      } else {
        let nextFound = false;
        partialNames.forEach(partialName => {
          definition[partialName]?.forEach((partialElement: any) => {
            if (!nextFound) {
              partialElement = resolveRefIfNeeded(partialElement, this.schema);
              if (next in partialElement.properties) {
                definition = partialElement.properties[next];
                nextFound = true;
              }
            }
          });
        });

        fieldInvariant(name, nextFound);
      }

      definition = resolveRefIfNeeded(definition, this.schema);

      // Naive computation of combined type, properties and required.
      const required = definition.required ? definition.required.slice() : [];
      const properties = definition.properties
        ? Object.assign({}, definition.properties)
        : {};

      partialNames.forEach(partialName => {
        definition[partialName]?.forEach((partial: any) => {
          partial = resolveRefIfNeeded(partial, this.schema);

          if (partial.required) {
            required.push(...partial.required);
          }

          Object.assign(properties, partial.properties);

          if (!definitionCache.type && partial.type) {
            definitionCache.type = partial.type;
          }
        });
      });

      if (required.length > 0) {
        definitionCache.required = required;
      }

      if (!isEmpty(properties)) {
        definitionCache.properties = properties;
      }

      return definition;
    }, this.schema);
  }

  getInitialValue(name: string, props?: Record<string, any>): any {
    const field = this.getField(name);
    const {
      default: defaultValue = field.default ?? get(this.schema.default, name),
      type = field.type,
    } = this._compiledSchema[name];

    if (defaultValue !== undefined) {
      return cloneDeep(defaultValue);
    }

    if (type === 'array') {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = props?.initialCount || 0;
      return Array.from({ length: items }, () => item);
    }

    if (type === 'object') {
      return {};
    }

    return undefined;
  }

  getProps(name: string, fieldProps?: Record<string, any>) {
    const field = this.getField(name);
    const props = Object.assign(
      {},
      field,
      field.uniforms,
      this._compiledSchema[name],
    );

    props.label ??=
      props.title ?? upperFirst(lowerCase(joinName(null, name).slice(-1)[0]));

    if (field.type === 'number') {
      props.decimal = true;
    }

    if (field.uniforms?.type !== undefined) {
      props.type = field.uniforms.type;
    }

    if (props.required === undefined) {
      props.required = props.isRequired;
    }

    if (props.type === field.type) {
      delete props.type;
    }

    type OptionDict = Record<string, string>;
    type OptionList = { label: string; value: unknown }[];
    type Options = OptionDict | OptionList;
    const options: Options = fieldProps?.options || props.options;
    if (options) {
      if (Array.isArray(options)) {
        props.allowedValues = options.map(option => option.value);
        props.transform = (value: unknown) =>
          options.find(option => option.value === value)!.label;
      } else {
        props.allowedValues = Object.keys(options);
        props.transform = (value: string) => options[value];
      }
    } else if (props.enum) {
      props.allowedValues = props.enum;
    }

    propsToRename.forEach(([key, newKey]) => {
      if (key in props) {
        props[newKey] = props[key];
        delete props[key];
      }
    });

    propsToRemove.forEach(key => {
      if (key in props) {
        delete props[key];
      }
    });

    return props;
  }

  getSubfields(name = '') {
    const field = this.getField(name);
    const { properties = field.properties, type = field.type } =
      this._compiledSchema[name];

    if (type === 'object' && properties) {
      return Object.keys(properties).map(joinName.escape);
    }

    return [];
  }

  getType(name: string) {
    const { type: _type, format: fieldFormat } = this.getField(name);
    const { type: fieldType = _type } = this._compiledSchema[name];

    if (fieldFormat === 'date-time') {
      return Date;
    }
    if (fieldType === 'string') {
      return String;
    }
    if (fieldType === 'number') {
      return Number;
    }
    if (fieldType === 'integer') {
      return Number;
    }
    if (fieldType === 'object') {
      return Object;
    }
    if (fieldType === 'array') {
      return Array;
    }
    if (fieldType === 'boolean') {
      return Boolean;
    }

    invariant(
      fieldType !== 'null',
      'Field "%s" can not be represented as a type null',
      name,
    );

    return fieldType;
  }

  getValidator() {
    return this.validator;
  }
}
