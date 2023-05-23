import { parse } from 'graphql/language/parser';
import { buildASTSchema } from 'graphql/utilities';
import { GraphQLBridge } from 'uniforms-bridge-graphql';

const schema = `
  type Address {
    a:    Float
    b:      String!
    titleA: String!
    d:      String!
    title:  String!
  }

  # This is required by buildASTSchema
  type Query { anything: ID }
`;

const validator = () => {
  /* Empty object for no errors */
};

const extras = {
  a: { label: 'Horse' },
  b: { placeholder: 'Horse', required: false },
  titleA: { label: 'Horse' },
  title: { label: 'Horse A', placeholder: 'Horse B' },
};

const type = buildASTSchema(parse(schema)).getType('Address')!;

export const bridge = new GraphQLBridge({ schema: type, validator, extras });
