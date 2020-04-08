import React, { Children, cloneElement } from 'react';
import get from 'lodash/get';
import {
  AutoForm,
  TextField,
  SubmitField
} from '../../../website/components/universal';
import { RefreshCw } from 'react-feather';

import schema from './SwapFieldSchema';

const SwapField = (
  { children, fieldA, fieldB },
  { uniforms: { model, onChange } }
) => (
  <span style={{ display: 'flex', justifyContent: 'center' }}>
    {cloneElement(Children.only(children), {
      onClick() {
        const valueA = get(model, fieldA);
        const valueB = get(model, fieldB);
        onChange(fieldA, valueB);
        onChange(fieldB, valueA);
      }
    })}
  </span>
);

export default function ExampleOfSwapField() {
  return (
    <section>
      <AutoForm
        model={{ firstName: 'John', lastName: 'Doe' }}
        schema={schema}
        onSubmit={model => alert(JSON.stringify(model, null, 2))}
      >
        <TextField name="firstName" />
        <SwapField fieldA="firstName" fieldB="lastName">
          <RefreshCw style={{ cursor: 'pointer' }} />
        </SwapField>
        <TextField name="lastName" />
        <SubmitField />
      </AutoForm>
    </section>
  );
}
