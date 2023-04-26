import type { PropTypes } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioMaterial, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import useTheme from '@material-ui/core/styles/useTheme';
import omit from 'lodash/omit';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: PropTypes.Margin;
    row?: boolean;
    transform?: (value: string) => string;
  }
>;

function Radio({
  allowedValues,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  readOnly,
  row,
  transform,
  value,
  ...props
}: RadioFieldProps) {
  const theme = useTheme();
  const formControlThemeProps = theme.props?.MuiFormControl;
  return wrapField(
    {
      fullWidth: formControlThemeProps?.fullWidth ?? true,
      margin: formControlThemeProps?.margin ?? 'dense',
      ...props,
      component: 'fieldset',
      disabled,
    },
    label && (
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
    ),
    <RadioGroup
      id={id}
      name={name}
      onChange={(event: any) =>
        disabled || readOnly || onChange(event.target.value)
      }
      ref={inputRef}
      row={row}
      value={value ?? ''}
    >
      {allowedValues?.map(item => (
        <FormControlLabel
          control={
            <RadioMaterial
              id={`${id}-${escape(item)}`}
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          htmlFor={`${id}-${escape(item)}`}
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>,
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
