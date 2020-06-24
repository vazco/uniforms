import React, { Children } from 'react';
import {
  AutoForm,
  SubmitField,
  TextField
} from '../../../website/components/universal';
import { useForm } from 'uniforms';

import schema from './DisplayIfFieldSchema';

// We have to ensure that there's only one child, because returning an array
// from a component is prohibited.
function DisplayIf({ children, condition }) {
  const uniforms = useForm();
  return condition(uniforms) ? Children.only(children) : null;
}

export default function ExampleOfDisplayIfField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <TextField name="fieldA" />
      <DisplayIf condition={context => context.model.fieldA}>
        <section>
          <TextField name="fieldB" />
          <DisplayIf condition={context => context.model.fieldB}>
            <span>Well done!</span>
          </DisplayIf>
        </section>
      </DisplayIf>
      <SubmitField />
    </AutoForm>
  );
}
