const preset = (strings: TemplateStringsArray) =>
  strings[0].slice(5, -3).replace(/([\r\n]+) {4}/g, '$1');

const presets = {
  'Welcome!': preset`
    new SimpleSchema2Bridge({
      schema: new SimpleSchema({
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
    })
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

      const validator = createValidator(schema);

      return new JSONSchemaBridge({ schema, validator });
    })()
  `,

  'Address (SimpleSchema)': preset`
    new SimpleSchema2Bridge({
      schema: new SimpleSchema({
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
    })
  `,

  'Address (Zod)': preset`
    new ZodBridge({
      schema: z.object({
          city: z.string().max(50).optional(),
          state: z.string(),
          street: z.string().max(100),
          zip: z.string().regex(/^[0-9]{5}$/),
        })
    })
  `,

  'All Fields (SimpleSchema)': preset`
    new SimpleSchema2Bridge({
      schema: new SimpleSchema({
          text: { type: String },
          num: { type: Number },
          bool: { type: Boolean },
          nested: { type: Object },
          'nested.text': { type: String },
          date: { type: Date },
          list: { type: Array },
          'list.$': {
            type: String,
            uniforms: { label: 'List Text', placeholder: 'List Text Placeholder' },
          },
          select: {
            type: String,
            uniforms: {
              options: [
                { label: 'Option A', value: 'a' },
                { label: 'Option B', value: 'b' },
              ],
            },
          },
          radio: {
            type: String,
            uniforms: {
              checkboxes: true,
              options: [
                { label: 'Option A', value: 'a' },
                { label: 'Option B', value: 'b' },
              ],
            },
          },
        })
    })
  `,

  'All Fields (Zod)': preset`
    new ZodBridge({
      schema: z.object({
          text: z.string(),
          num: z.number(),
          bool: z.boolean(),
          nested: z.object({ text: z.string() }),
          date: z.date(),
          list: z.array(z.string().uniforms({ label: 'List Text', placeholder: 'List Text Placeholder' })),
          select: z.enum(['a', 'b']),
          radio: z.enum(['a', 'b']).uniforms({ checkboxes: true }),
        })
    })
  `,
};

export default presets;
