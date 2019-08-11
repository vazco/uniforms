import invariant from 'invariant';

import Bridge from './Bridge';

const bridges: (typeof Bridge)[] = [];

const isBridge = (schema: any): schema is Bridge =>
  schema &&
  schema.getError &&
  schema.getErrorMessage &&
  schema.getErrorMessages &&
  schema.getField &&
  schema.getInitialValue &&
  schema.getProps &&
  schema.getSubfields &&
  schema.getType &&
  schema.getValidator;

export default function createSchemaBridge(schema: any): Bridge {
  // There's no need for an extra wrapper.
  if (isBridge(schema)) {
    return schema;
  }

  const Bridge: any = bridges.find(bridge => bridge.check(schema));

  invariant(Bridge, 'Unrecognised schema: %s', schema);

  return new Bridge(schema);
}

createSchemaBridge.register = (bridge: typeof Bridge) => {
  bridges.unshift(bridge);
};
