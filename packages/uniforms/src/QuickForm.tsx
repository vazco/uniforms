import React, { ComponentType } from 'react';

import { BaseForm, BaseFormProps, BaseFormState } from './BaseForm';
import { UnknownObject } from './types';

export type QuickFormProps<Model extends UnknownObject> =
  BaseFormProps<Model> & {
    errorsField?: ComponentType;
    submitField?: ComponentType;
  };

export type QuickFormState<Model extends UnknownObject> = BaseFormState<Model>;

export function Quick<Base extends typeof BaseForm>(Base: Base) {
  // @ts-expect-error: Mixin class problem.
  class QuickForm<
    Model extends UnknownObject,
    Props extends QuickFormProps<Model> = QuickFormProps<Model>,
    State extends QuickFormState<Model> = QuickFormState<Model>,
  > extends Base<Model, Props, State> {
    static Quick = Quick;
    static displayName = `Quick${Base.displayName}`;

    getNativeFormProps() {
      const _props = super.getNativeFormProps();
      const {
        errorsField: ErrorsField = this.getErrorsField(),
        submitField: SubmitField = this.getSubmitField(),
        ...props
      }: typeof _props & Pick<Props, 'errorsField' | 'submitField'> = _props;

      const AutoField = this.getAutoField();

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
