import React, { Children, cloneElement } from 'react';
import BaseField from 'uniforms/BaseField';
import get from 'lodash/get';
import { RefreshCw } from 'react-feather';

import { AutoForm, TextField, SubmitField } from '../../universal';
import schema from './SwapFieldSchema';
// This field works as follows: on click of its child it swaps values of fieldA
// and fieldB. It's that simple.
const SwapField = (
  { children, fieldA, fieldB },
  { uniforms: { model, onChange } }
) =>
  cloneElement(Children.only(children), {
    onClick() {
      const valueA = get(model, fieldA);
      const valueB = get(model, fieldB);
      onChange(fieldA, valueB);
      onChange(fieldB, valueA);
    }
  });
SwapField.contextTypes = BaseField.contextTypes;
// Usage.
export default function ExampleSwapField() {
  return (
    <section>
      <AutoForm
        schema={schema}
        onSubmit={model => alert(JSON.stringify(model, null, 2))}
      >
        <TextField name="firstName" />
        <SwapField fieldA="firstName" fieldB="lastName">
          <RefreshCw />
        </SwapField>
        <TextField name="lastName" />
        <SubmitField />
      </AutoForm>
    </section>
  );
}
