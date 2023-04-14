import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { SelectProps as MaterialSelectProps } from '@mui/material/Select';
import Switch, { SwitchProps } from '@mui/material/Switch';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import omit from 'lodash/omit';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

type SelectFieldCommonProps = {
  options?: Option<string>[];
  appearance?: 'checkbox' | 'switch';
  inputRef?: Ref<HTMLButtonElement>;
  required?: boolean;
};

type CheckboxesProps = FieldProps<
  string | string[],
  CheckboxProps | SwitchProps,
  SelectFieldCommonProps & {
    checkboxes: true;
    legend?: string;
    variant?: undefined;
  }
>;

type SelectProps = FieldProps<
  string | string[],
  MaterialSelectProps & TextFieldProps,
  SelectFieldCommonProps & {
    checkboxes?: false;
    labelProps?: object;
    native?: boolean;
    textFieldProps?: Omit<TextFieldProps, 'value'>;
  }
>;

export type SelectFieldProps = CheckboxesProps | SelectProps;

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

// eslint-disable-next-line complexity
function Select(props: SelectFieldProps) {
  const value = props.value ?? '';

  if (props.checkboxes) {
    const {
      options,
      disabled,
      fieldType,
      id,
      inputRef,
      label,
      legend,
      name,
      onChange,
      readOnly,
    } = props;

    const appearance = props.appearance ?? 'checkbox';
    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;
    const filteredProps = omit(filterDOMProps(props), [
      'checkboxes' as never,
      'disableItem' as never,
      'id',
      'inputRef',
    ]);

    const children =
      fieldType !== Array ? (
        <RadioGroup
          id={id}
          name={name}
          onChange={event =>
            disabled || readOnly || onChange(event.target.value)
          }
          ref={inputRef}
          value={value ?? ''}
        >
          {options!.map(option => (
            <FormControlLabel
              control={
                <Radio
                  id={`${id}-${option.key ?? escape(option.value)}`}
                  {...filteredProps}
                />
              }
              disabled={option.disabled || disabled}
              key={option.key ?? option.value}
              label={option.label ?? option.value}
              value={option.value}
            />
          ))}
        </RadioGroup>
      ) : (
        <FormGroup id={id}>
          {options!.map(option => (
            <FormControlLabel
              control={
                <SelectionControl
                  checked={value.includes(option.value)}
                  id={`${id}-${option.key ?? escape(option.value)}`}
                  name={name}
                  onChange={() =>
                    disabled || readOnly || onChange(xor([option.value], value))
                  }
                  ref={inputRef}
                  value={name}
                  {...filteredProps}
                />
              }
              disabled={option.disabled || disabled}
              key={option.key ?? option.value}
              label={option.label ?? option.value}
            />
          ))}
        </FormGroup>
      );

    return wrapField(
      { ...props, component: 'fieldset' },
      (legend || label) && (
        <FormLabel component="legend">{legend || label}</FormLabel>
      ),
      children,
    );
  }
  const {
    options,
    disabled,
    error,
    errorMessage,
    fieldType,
    fullWidth = true,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    label,
    labelProps,
    margin = 'dense',
    name,
    native,
    onChange,
    placeholder,
    readOnly,
    required,
    showInlineError,
    variant,
    textFieldProps,
  } = props;

  const Item = native ? 'option' : MenuItem;
  const hasPlaceholder = !!placeholder;
  const hasValue = value !== '' && value !== undefined;
  const filteredProps = omit(filterDOMProps(props), [
    'checkboxes',
    'disableItem',
    'fullWidth',
    'helperText',
    'margin',
    'textFieldProps',
    'variant',
  ]);

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={fullWidth}
      helperText={(!!error && showInlineError && errorMessage) || helperText}
      InputLabelProps={{
        shrink: !!label && (hasPlaceholder || hasValue),
        ...labelProps,
        ...InputLabelProps,
      }}
      label={label}
      margin={margin}
      onChange={event =>
        disabled ||
        readOnly ||
        onChange(event.target.value !== '' ? event.target.value : undefined)
      }
      required={required}
      select
      SelectProps={{
        displayEmpty: hasPlaceholder,
        inputProps: { name, id, ...inputProps },
        multiple: fieldType === Array || undefined,
        native,
        ...filteredProps,
      }}
      value={native && !value ? '' : value}
      variant={variant}
      {...textFieldProps}
    >
      {(hasPlaceholder || !required || !hasValue) && (
        <Item value="" disabled={!!required}>
          {placeholder || label}
        </Item>
      )}

      {options!.map(option => (
        <Item
          disabled={option.disabled}
          key={option.key ?? option.value}
          value={option.value}
        >
          {option.label ?? option.value}
        </Item>
      ))}
    </TextField>
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
