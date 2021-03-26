const preset = (strings: TemplateStringsArray) =>
  strings[0].slice(5, -3).replace(/([\r\n]+) {4}/g, '$1');

const presets = {
  'Welcome!': preset`
    new SimpleSchema2Bridge(
      new SimpleSchema({
        date: { type: Date, defaultValue: new Date() },
        adult: Boolean,
        size: {
          type: String,
          defaultValue: 'm',
          allowedValues: ['xs', 's', 'm', 'l', 'xl'],
        },
        rating: {
          type: Number,
          allowedValues: [1, 2, 3, 4, 5],
          uniforms: { checkboxes: true },
        },
        friends: { type: Array, minCount: 1 },
        'friends.$': Object,
        'friends.$.name': { type: String, min: 3 },
        'friends.$.age': { type: Number, min: 0, max: 150 },
      })
    )
  `,

  'Address (GraphQL)': preset`
    new GraphQLBridge(
      buildASTSchema(
        parse(\`
          type Address {
            city:   String
            state:  String!
            street: String!
            zip:    String!
          }

          # This is required by buildASTSchema
          type Query { anything: ID }
        \`)
      ).getType('Address'),
      function (model) {
        const details = [];
        if (!model.state)
          details.push({ name: 'state', message: 'State is required!' });
        if (!model.street)
          details.push({ name: 'street', message: 'Street is required!' });
        if (!model.zip)
          details.push({ name: 'zip', message: 'Zip is required!' });
        if (model.city && model.city.length > 50)
          details.push({ name: 'city', message: 'City can be at least 50 characters long!' });
        if (model.street && model.street.length > 100)
          details.push({ name: 'street', message: 'Street can be at least 100 characters long!' });
        if (model.zip && !/^[0-9]{5}$/.test(model.zip))
          details.push({ name: 'zip', message: 'Zip does not match the regular expression!' });
        if (details.length)
          return { details };
      },
      { zip: { label: 'Zip code' } }
    )
  `,

  'Address (JSONSchema)': preset`
    (() => {
      const ajv = new Ajv({ allErrors: true, useDefaults: true, keywords: ["uniforms"] });
      const schema = {
        title: 'Address',
        type: 'object',
        properties: {
          city: { type: 'string' },
          state: { type: 'string' },
          street: { type: 'string' },
          zip: { type: 'string', pattern: '[0-9]{5}' },
        },
        required: ['street', 'zip', 'state'],
      };

      function createValidator(schema) {
        const validator = ajv.compile(schema);

        return (model) => {
          validator(model);

          if (validator.errors && validator.errors.length) {
            return { details: validator.errors };
          }
        };
      }

      const schemaValidator = createValidator(schema);

      return new JSONSchemaBridge(schema, schemaValidator);
    })()
  `,

  'Address (SimpleSchema)': preset`
    new SimpleSchema2Bridge(
      new SimpleSchema({
        city: {
          type: String,
          optional: true,
          max: 50,
        },
        state: String,
        street: { type: String, max: 100 },
        zip: {
          type: String,
          regEx: /^[0-9]{5}$/,
        },
      })
    )
  `,
};

export default presets;
