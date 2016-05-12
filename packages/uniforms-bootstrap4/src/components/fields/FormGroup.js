/**
 * This is a consistent wrapper for labels and inputs
 *
 * Ideally I want to use this as a wrapper for each field type
 * and this will render the wrapper, label, error, etc...
 */

import React          from 'react';
import classnames     from 'classnames';
import {BaseField} from 'uniforms';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import buildGrid      from '../../buildGrid';
import buildErrors    from '../../buildErrors';

const FormGroup = ({
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
  disabled,
  error,             // TODO need to get the error object here
  schema,            // TODO need to get the schema
  ...props}
) => {
  const idNice = autoid(id);

  console.log('FormGroup (WIP need error & schema)', {
    field, id,
    label, grid, help,
    error, schema,
  });

  const helpNice = (
    help && (!error || showHelpAndErrors) ?
    <span className={classnames(helpClassName ? helpClassName : 'text-muted')}>{help}</span>
    : ''
  );

  const errorNice = buildErrors(error, schema);
  const required = field && !field.optional;

  return (
    <section className={classnames(
      className,
      {disabled, 'has-danger': error, required},
      'field',
      'form-group',
      {'row' : grid},
    )} {...props}>

    {label && (
      <label htmlFor={idNice} className={classnames(
        'form-control-label',
        buildGrid(grid, 'label'),
      )}>{label}</label>
    )}

    {grid || wrapClassName ?
      <div className={classnames(wrapClassName, buildGrid(grid, 'input'))}>
        {props.children} {errorNice} {helpNice}
      </div>
      :
      <span>{props.children} {errorNice} {helpNice}</span>
    }

  </section>
  );
}

export default connectField(FormGroup);

