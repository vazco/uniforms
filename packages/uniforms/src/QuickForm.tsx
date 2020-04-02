import React, { ComponentType } from 'react';

import BaseForm, { BaseFormProps, BaseFormState } from './BaseForm';

export type QuickFormProps<Model extends {}> = BaseFormProps<Model> & {
  autoField?: ComponentType<{ name?: string }>;
  errorsField?: ComponentType;
  submitField?: ComponentType;
};

export type QuickFormState<Model extends {}> = BaseFormState<Model>;

function Quick<Base extends typeof BaseForm>(base: Base) {
  // @ts-ignore: Mixin class problem.
  return class QuickForm<
    Model extends {} = Record<string, any>,
    Props extends QuickFormProps<Model> = QuickFormProps<Model>,
    State extends QuickFormState<Model> = QuickFormState<Model>
  > extends base<Model, Props, State> {
    static Quick = Quick;
    static displayName = `Quick${base.displayName}`;

    getNativeFormProps(): Record<string, any> {
      const {
        autoField: AutoField = this.getAutoField(),
        errorsField: ErrorsField = this.getErrorsField(),
        submitField: SubmitField = this.getSubmitField(),
        ...props
      } = super.getNativeFormProps();

      if (!props.children) {
        props.children = this.getContextSchema()
          .getSubfields()
          .map((key: any) => <AutoField key={key} name={key} />)
          .concat([
            <ErrorsField key="$ErrorsField" />,
            <SubmitField key="$SubmitField" />,
          ]);
      }

      return props;
    }

    getAutoField(): ComponentType<{ name?: string }> {
      return () => null;
    }

    getErrorsField(): ComponentType {
      return () => null;
    }

    getSubmitField(): ComponentType {
      return () => null;
    }
  };
}

export default Quick(BaseForm);
