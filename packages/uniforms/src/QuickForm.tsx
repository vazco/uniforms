import React from 'react';

import BaseForm from './BaseForm';
import nothing from './nothing';

const Quick = (parent: any): any =>
  class extends parent {
    static Quick = Quick;

    static displayName = `Quick${parent.displayName}`;

    getNativeFormProps(): Record<string, unknown> {
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

    getAutoField(): any {
      return () => nothing;
    }

    getErrorsField(): any {
      return () => nothing;
    }

    getSubmitField(): any {
      return () => nothing;
    }
  };

export default Quick(BaseForm);
