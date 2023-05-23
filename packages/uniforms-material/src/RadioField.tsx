import type { PropTypes } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioMaterial, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import useTheme from '@material-ui/core/styles/useTheme';
import omit from 'lodash/omit';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
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
    options?: Option<string>[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: PropTypes.Margin;
    row?: boolean;
  }
>;

function Radio({
  options,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  readOnly,
  row,
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
      {options?.map(item => (
        <FormControlLabel
          control={
            <RadioMaterial
              id={`${id}-${escape(item.value)}`}
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          htmlFor={`${id}-${escape(item.value)}`}
          key={item.key ?? item.value}
          label={item.label ?? item.value}
          value={`${item.value}`}
        />
      ))}
    </RadioGroup>,
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
