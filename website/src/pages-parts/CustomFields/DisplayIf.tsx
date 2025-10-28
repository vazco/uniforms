import React, { Children, ReactElement } from 'react';
import { AutoForm, SubmitField, TextField } from '../../lib/universal';
import { Context, useForm } from 'uniforms';

import { bridge as schema } from './DisplayIfSchema';

type DisplayIfProps<T> = {
  children: ReactElement;
  condition: (context: Context<T>) => boolean;
};

// We have to ensure that there's only one child, because returning an array
// from a component is prohibited.
function DisplayIf<T = any>({ children, condition }: DisplayIfProps<T>) {
  const uniforms = useForm<T>();
  return condition(uniforms) ? Children.only(children) : null;
}

export function DisplayIfForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
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
