import { useField } from 'uniforms';
import { createElement } from 'react';

import AutoField from './AutoField';

function AutoFields({ autoField, element, fields, omitFields, ...props }: any) {
  const { schema } = useField(props.name, props)[1];

  return createElement(
    element,
    props,
    (fields || schema.getSubfields())
      .filter((field: any) => omitFields.indexOf(field) === -1)
      .map((field: any) =>
        createElement(autoField, { key: field, name: field }),
      ),
  );
}

AutoFields.defaultProps = {
  autoField: AutoField,
  element: 'div',
  omitFields: [],
};

export default AutoFields;
