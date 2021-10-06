import React, { ComponentType } from 'react';

import { BaseForm, BaseFormProps, BaseFormState } from './BaseForm';

export type QuickFormProps<Model> = BaseFormProps<Model> & {
  autoField?: ComponentType<{ name: string }>;
  errorsField?: ComponentType;
  submitField?: ComponentType;
};

export type QuickFormState<Model> = BaseFormState<Model>;

export function Quick<Base extends typeof BaseForm>(Base: Base) {
  // @ts-expect-error: Mixin class problem.
  class QuickForm<
    Model,
    Props extends QuickFormProps<Model> = QuickFormProps<Model>,
    State extends QuickFormState<Model> = QuickFormState<Model>,
  > extends Base<Model, Props, State> {
    static Quick = Quick;
    static displayName = `Quick${Base.displayName}`;

    getNativeFormProps() {
      const superProps = super.getNativeFormProps();
      type ChildFields = {
        autoField?: React.ComponentType<{ name: string }>;
        errorsField?: React.ComponentType<{}>;
        submitField?: React.ComponentType<{}>;
      };
      const {
        autoField: AutoField = this.getAutoField(),
        errorsField: ErrorsField = this.getErrorsField(),
        submitField: SubmitField = this.getSubmitField(),
        ...props
      }: typeof superProps & ChildFields = superProps;

      if (!props.children) {
        props.children = this.getContextSchema()
          .getSubfields()
          .map(key => <AutoField key={key} name={key} />)
          .concat([
            <ErrorsField key="$ErrorsField" />,
            <SubmitField key="$SubmitField" />,
          ]);
      }

      return props;
    }

    getAutoField(): ComponentType<{ name: string }> {
      return () => null;
    }

    getErrorsField(): ComponentType {
      return () => null;
    }

    getSubmitField(): ComponentType {
      return () => null;
    }
  }

  return QuickForm;
}

export const QuickForm = Quick(BaseForm);
export type QuickForm = typeof QuickForm;
