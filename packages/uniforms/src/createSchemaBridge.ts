import invariant from 'invariant';

import Bridge from './Bridge';

const registered: (typeof Bridge)[] = [];

function create(schema: any): Bridge {
  // There's no need for an extra wrapper.
  if (isBridge(schema)) {
    return schema;
  }

  const Bridge: any = registered.find(bridge => bridge.check(schema));

  invariant(Bridge, 'Unrecognised schema: %s', schema);

  return new Bridge(schema);
}

function isBridge(schema: any): schema is Bridge {
  return !!(
    schema &&
    schema.getError &&
    schema.getErrorMessage &&
    schema.getErrorMessages &&
    schema.getField &&
    schema.getInitialValue &&
    schema.getProps &&
    schema.getSubfields &&
    schema.getType &&
    schema.getValidator
  );
}

function register(bridge: typeof Bridge) {
  registered.unshift(bridge);
}

export default Object.assign(create, { register, registered });
