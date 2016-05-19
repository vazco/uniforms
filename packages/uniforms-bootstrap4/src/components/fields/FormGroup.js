import React      from 'react';
import classnames from 'classnames';

import autoid      from '../../autoid';
import buildGrid   from '../../buildGrid';
import ErrorsField from './ErrorsField';

const FormGroup = ({
  children,
  field,
  id,                // string id (optional, auto-generated if empty)
  label,             // string label (or false)
  grid,              // grid is either a int [1-11] or object {xs:6,sm:4,md:2}
  labelClassName,    // class name for the label
  wrapClassName,     // class name for the div wrapping the input(s)
  inputClassName,    // class name for the input .form-control
  helpClassName,     // class name for the help text (default: 'text-muted')
  className,         // class name for the whole .form-group
  help,              // help text
  showHelpAndErrors, // boolean, if true, show help & error
  disabled,          // boolean, if true, show fields as disabled
  error,             // error validation response
  ...props
}) => {
  console.log('FormGroup (WIP)', {
    error,
    field,
    grid,
    help,
    id,
    label
  });

  const helpNice = help && (!error || showHelpAndErrors) && (
    <span className={classnames(helpClassName ? helpClassName : 'text-muted')}>
      {help}
    </span>
  );

  const errorNice = (
    <ErrorsField error={error} />
  );

  const required = field && !field.optional;

  return (
    <section
      className={classnames(
        className,
        'field',
        'form-group',
        {disabled, 'has-danger': error, required, row: grid}
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={classnames(
            'form-control-label',
            buildGrid(grid, 'label')
          )}
        >
          {label}
        </label>
      )}

      {(grid || wrapClassName) ?
        <div className={classnames(wrapClassName, buildGrid(grid, 'input'))}>
          {children}
          {errorNice}
          {helpNice}
        </div>
      :
        <span>
          {children}
          {errorNice}
          {helpNice}
        </span>
      }
    </section>
  );
}

export default FormGroup;
