import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';
import buildGrid   from '../../buildGrid';

const SubmitField = (
  {
    className,
    wrapClassName,
    grid,              // grid is either a int [1-11] or object {xs:6,sm:4,md:2}
    ...props
  },
  {uniforms: {error, state: {disabled} = {}}}
) => {

  let buttons = (
    <input
        className={classnames(className, 'btn btn-primary')}
        disabled={error || disabled ? true : null}
        type="submit"
        {...props}
      />
  );

  return (
    <section className={classnames(
      className,
      {disabled, 'has-danger': error},
      {'row' : grid},
    )} {...props}>
      <label className={classnames(
        'form-control-label',
        buildGrid(grid, 'label'),
      )}>&nbsp;</label>
      {grid || wrapClassName ?
        <div className={classnames(wrapClassName, buildGrid(grid, 'input'))}>
          {buttons}
        </div>
        :
        <span>{buttons}</span>
      }
    </section>
  );
};

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
