import React from 'react';

import BaseForm from './BaseForm';

const Quick = (parent: any): any => {
  class _ extends parent {
    static Quick = Quick;

    static displayName = `Quick${parent.displayName}`;

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

    getAutoField(): any {
      return () => null;
    }

    getErrorsField(): any {
      return () => null;
    }

    getSubmitField(): any {
      return () => null;
    }
  }

  return _;
};

export default Quick(BaseForm);
