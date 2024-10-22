import { ComponentType, Fragment, createElement } from 'react';
import { useForm } from 'uniforms';

import AutoField from './AutoField';

export type AutoFieldsProps = {
  element?: ComponentType | string;
  fields?: string[];
  omitFields?: string[];
  showInlineError?: boolean;
};

export default function AutoFields({
  element = Fragment,
  fields,
  omitFields = [],
  showInlineError,
  ...props
}: AutoFieldsProps) {
  const { schema } = useForm();

  return createElement(
    element,
    props,
    (fields ?? schema.getSubfields())
      .filter(field => !omitFields.includes(field))
      .map(field =>
        createElement(
          AutoField,
          Object.assign(
            { key: field, name: field },
            showInlineError === undefined ? null : { showInlineError },
          ),
        ),
      ),
  );
}
