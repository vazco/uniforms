import React, { Children, ReactElement, cloneElement } from 'react';
import get from 'lodash/get';
import { AutoForm, TextField, SubmitField } from '../../lib/universal';
import { RefreshCw } from 'react-feather';
import { useForm } from 'uniforms';

import { bridge as schema } from './SwapFieldSchema';

type SwapFieldProps = {
  children: ReactElement;
  fieldA: string;
  fieldB: string;
};

function SwapField({ children, fieldA, fieldB }: SwapFieldProps) {
  const { model, onChange } = useForm();
  return (
    <span style={{ display: 'flex', justifyContent: 'center' }}>
      {cloneElement(Children.only(children), {
        onClick() {
          const valueA = get(model, fieldA);
          const valueB = get(model, fieldB);
          onChange(fieldA, valueB);
          onChange(fieldB, valueA);
        },
      })}
    </span>
  );
}

export default function ExampleOfSwapField() {
  return (
    <section>
      <AutoForm
        model={{ firstName: 'John', lastName: 'Doe' }}
        schema={schema}
        onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
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
