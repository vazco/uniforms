import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import lowerCase from 'lodash/lowerCase';
import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import upperFirst from 'lodash/upperFirst';
import { Bridge, joinName } from 'uniforms';

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

const propMapper: Record<string, string> = {
  maxItems: 'maxCount',
  minItems: 'minCount',
  maximum: 'max',
  minimum: 'min',
  multipleOf: 'step',
};

function distinctSchema(schema: Record<string, any>) {
  if (schema.type === 'object') {
    return schema;
  }

  if (schema.$ref) {
    return { ...schema, ...resolveRef(schema.$ref, schema) };
  }

  return schema;
}

function extractValue(...xs: (boolean | null | string | undefined)[]) {
  return xs.reduce((x, y) =>
    x === false || x === null ? '' : x !== true && x !== undefined ? x : y,
  );
}

function pathToName(path: string) {
  path = path.startsWith('/')
    ? path.replace(/\//g, '.').replace(/~0/g, '~').replace(/~1/g, '/')
    : path
        .replace(/\[('|")(.+?)\1\]/g, '.$2')
        .replace(/\[(.+?)\]/g, '.$1')
        .replace(/\\'/g, "'");

  return path.slice(1);
}

function toHumanLabel(label: string) {
  return upperFirst(lowerCase(label));
}

export default class JSONSchemaBridge extends Bridge {
  _compiledSchema: Record<string, any> = {};

  constructor(
    public schema: Record<string, any>,
    public validator: (model: Record<string, any>) => any,
  ) {
    super();

    this.schema = distinctSchema(schema);
    this._compiledSchema[''] = this.schema;

    // Memoize for performance and referential equality.
    this.getField = memoize(this.getField.bind(this));
    this.getSubfields = memoize(this.getSubfields.bind(this));
    this.getType = memoize(this.getType.bind(this));
  }

  getError(name: string, error: any) {
    const nameParts = joinName(null, name);
    const rootName = joinName(nameParts.slice(0, -1));
    const baseName = nameParts[nameParts.length - 1];

    return (
      // FIXME: Correct type for `error`.
      error?.details?.find?.((detail: any) => {
        const path = pathToName(detail.instancePath ?? detail.dataPath);

        return (
          name === path ||
          (rootName === path && baseName === detail.params.missingProperty)
        );
      }) || null
    );
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
    return joinName(null, name).reduce((definition, next, nextIndex, array) => {
      const previous = joinName(array.slice(0, nextIndex));
      const isRequired = get(
        definition,
        'required',
        get(this._compiledSchema, [previous, 'required'], []),
      ).includes(next);

      const _key = joinName(previous, next);
      const _definition = this._compiledSchema[_key] || {};

      if (next === '$' || next === '' + parseInt(next, 10)) {
        invariant(
          definition.type === 'array',
          'Field not found in schema: "%s"',
          name,
        );
        definition = Array.isArray(definition.items)
          ? definition.items[parseInt(next, 10)]
          : definition.items;
      } else if (definition.type === 'object') {
        invariant(
          definition.properties,
          'Field properties not found in schema: "%s"',
          name,
        );
        definition = definition.properties[next];
      } else {
        const [{ properties: combinedDefinition = {} } = {}] = [
          'allOf',
          'anyOf',
          'oneOf',
        ]
          .filter(key => definition[key])
          .map(key => {
            // FIXME: Correct type for `definition`.
            const localDef = (definition[key] as any[]).map(subSchema =>
              subSchema.$ref
                ? resolveRef(subSchema.$ref, this.schema)
                : subSchema,
            );
            return localDef.find(({ properties = {} }) => properties[next]);
          });

        definition = combinedDefinition[next];
      }

      invariant(definition, 'Field not found in schema: "%s"', name);

      if (definition.$ref) {
        definition = resolveRef(definition.$ref, this.schema);
      }

      ['allOf', 'anyOf', 'oneOf'].forEach(key => {
        if (definition[key]) {
          // FIXME: Correct type for `definition`.
          _definition[key] = (definition[key] as any[]).map(def =>
            def.$ref ? resolveRef(def.$ref, this.schema) : def,
          );
        }
      });

      // Naive computation of combined type, properties and required
      const combinedPartials: any[] = []
        .concat(_definition.allOf, _definition.anyOf, _definition.oneOf)
        .filter(Boolean);

      if (combinedPartials.length) {
        const localProperties = definition.properties
          ? { ...definition.properties }
          : {};
        const localRequired = definition.required
          ? definition.required.slice()
          : [];

        combinedPartials.forEach(({ properties, required, type }) => {
          if (properties) {
            Object.assign(localProperties, properties);
          }
          if (required) {
            localRequired.push(...required);
          }
          if (type && !_definition.type) {
            _definition.type = type;
          }
        });

        if (Object.keys(localProperties).length > 0) {
          _definition.properties = localProperties;
        }
        if (localRequired.length > 0) {
          _definition.required = localRequired;
        }
      }

      this._compiledSchema[_key] = Object.assign(_definition, { isRequired });

      return definition;
    }, this.schema);
  }

  getInitialValue(name: string, props: Record<string, any> = {}): any {
    const { default: _default, type: _type } = this.getField(name);
    const {
      default: defaultValue = _default !== undefined
        ? _default
        : get(this.schema.default, name),
      type = _type,
    } = this._compiledSchema[name];

    if (defaultValue !== undefined) {
      return cloneDeep(defaultValue);
    }

    if (type === 'array') {
      const item = this.getInitialValue(joinName(name, '0'));
      const items = props.initialCount || 0;
      return Array(items).fill(item);
    }

    if (type === 'object') {
      return {};
    }

    return undefined;
  }

  getProps(name: string, props: Record<string, any> = {}) {
    const { uniforms, ...field } = this.getField(name);
    const { enum: enum_, isRequired, title, ...ready } = omit(
      { ...field, ...uniforms, ...this._compiledSchema[name] },
      ['default', 'format', 'type'],
    );

    if (enum_) {
      ready.allowedValues = enum_;
    }
    if (field.type === 'number') {
      ready.decimal = true;
    }
    if (uniforms && uniforms.type !== undefined) {
      ready.type = uniforms.type;
    }
    if (ready.required === undefined) {
      ready.required = isRequired;
    }
    ready.label = extractValue(
      ready.label,
      title,
      toHumanLabel(joinName(null, name).slice(-1)[0]),
    );

    const options = props.options || ready.options;
    if (options) {
      if (!Array.isArray(options)) {
        ready.transform = (value: any) => options[value];
        ready.allowedValues = Object.keys(options);
      } else {
        ready.transform = (value: any) =>
          options.find(option => option.value === value).label;
        ready.allowedValues = options.map(option => option.value);
      }
    }

    Object.keys(ready).forEach(key => {
      if (key in propMapper) {
        const newKey = propMapper[key];
        ready[newKey] = ready[key];
        delete ready[key];
      }
    });

    return ready;
  }

  getSubfields(name = '') {
    const field = this.getField(name);
    const {
      properties = field.properties,
      type = field.type,
    } = this._compiledSchema[name];

    if (type === 'object' && properties) {
      return Object.keys(properties);
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
