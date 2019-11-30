import React, { Children } from 'react';
import { BaseField } from 'uniforms';

import {
  AutoForm,
  SubmitField,
  TextField
} from '../../../website/components/universal';
import schema from './DisplayIfFieldSchema';

// We have to ensure that there's only one child, because returning an array
// from a component is prohibited.
const DisplayIf = ({ children, condition }, { uniforms }) =>
  condition(uniforms) ? Children.only(children) : null;
DisplayIf.contextTypes = BaseField.contextTypes;

export default function ExamplesDisplayIfField() {
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
