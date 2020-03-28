import { ComponentType, createElement } from 'react';
import { useForm } from 'uniforms';

import AutoField from './AutoField';

type AutoFieldsProps = {
  autoField?: ComponentType<{ name: string }>;
  element?: ComponentType | string;
  fields?: string[];
  omitFields?: string[];
};

export default function AutoFields({
  autoField,
  element,
  fields,
  omitFields,
  ...props
}: AutoFieldsProps) {
  const { schema } = useForm();

  return createElement(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    element!,
    props,
    (fields ?? schema.getSubfields())
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .filter(field => !omitFields!.includes(field))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map(field => createElement(autoField!, { key: field, name: field })),
  );
}

AutoFields.defaultProps = {
  autoField: AutoField,
  element: 'div',
  omitFields: [],
};
