import React, { Children } from 'react';
import {
  AutoForm,
  SubmitField,
  TextField
} from '../../../website/components/universal';
import { BaseField, nothing } from 'uniforms';

import schema from './DisplayIfFieldSchema';

const DisplayIf = ({ children, condition }, { uniforms }) =>
  condition(uniforms) ? Children.only(children) : nothing;
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
