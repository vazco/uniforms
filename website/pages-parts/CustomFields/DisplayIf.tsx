import React, { Children, ReactElement } from 'react';
import { AutoForm, SubmitField, TextField } from '../../lib/universal';
import { Context, UnknownObject, useForm } from 'uniforms';

import { bridge as schema } from './DisplayIfSchema';

type DisplayIfProps<Model extends UnknownObject> = {
  children: ReactElement;
  condition: (context: Context<Model>) => boolean;
};

// We have to ensure that there's only one child, because returning an array
// from a component is prohibited.
function DisplayIf<Model extends UnknownObject>({
  children,
  condition,
}: DisplayIfProps<Model>) {
  const uniforms = useForm<Model>();
  return condition(uniforms) ? Children.only(children) : null;
}

type Model = { fieldA: string; fieldB: string };
export function DisplayIfForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={(model: Model) => alert(JSON.stringify(model, null, 2))}
    >
      <TextField name="fieldA" />
      <DisplayIf<Model> condition={context => !!context.model.fieldA}>
        <section>
          <TextField name="fieldB" />
          <DisplayIf<Model> condition={context => !!context.model.fieldB}>
            <span>Well done!</span>
          </DisplayIf>
        </section>
      </DisplayIf>
      <SubmitField />
    </AutoForm>
  );
}
