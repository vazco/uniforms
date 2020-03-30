import React from 'react';

import { AutoField } from '../../../website/components/universal';

function AutoLayoutField({ name, ...rest }) {
  const splitByDots = name.split('.');
  const lastName = splitByDots[splitByDots.length - 1];
  return <AutoField name={name} style={{ gridArea: lastName }} {...rest} />;
}

export default AutoLayoutField;
