import { useTheme } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { SelectProps as MaterialSelectProps } from '@material-ui/core/Select';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import omit from 'lodash/omit';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  Override,
  Option,
} from 'uniforms';

import wrapField from './wrapField';

type SelectFieldCommonProps = {
  appearance?: 'checkbox' | 'switch';
  inputRef?: Ref<HTMLButtonElement>;
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  options?: Option<string>[];
};

type CheckboxesProps = FieldProps<
  string | string[],
  CheckboxProps | SwitchProps,
  SelectFieldCommonProps & {
    checkboxes: true;
    legend?: string;
  }
>;

type SelectProps = FieldProps<
  string | string[],
  Override<
    MaterialSelectProps & TextFieldProps,
    { margin?: 'normal' | 'dense' | 'none' }
  >,
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
  const theme = useTheme();
  const formControlThemeProps = theme.props?.MuiFormControl;
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
          {options?.map(option => (
            <FormControlLabel
              control={
                <Radio
                  id={`${id}-${escape(option.key ?? option.value)}`}
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
          {options?.map(option => (
            <FormControlLabel
              control={
                <SelectionControl
                  checked={value.includes(option.value)}
                  id={`${id}-${escape(option.key ?? option.value)}`}
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
      { ...formControlThemeProps, ...props, component: 'fieldset' },
      (legend || label) && (
        <FormLabel component="legend">{legend || label}</FormLabel>
      ),
      children,
    );
  }
  const textFieldThemeProps = theme.props?.MuiTextField;
  const {
    options,
    disabled,
    error,
    errorMessage,
    fieldType,
    fullWidth = textFieldThemeProps?.fullWidth ?? true,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    label,
    labelProps,
    margin = textFieldThemeProps?.margin ?? 'dense',
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

  /*
  Never was added because these 2 variables cause omit to fall into an unpleasant overload.
  So we need to use a trick to reduce the confusion of handling types
  */
  const filteredProps = omit(filterDOMProps(props), [
    'checkboxes' as never,
    'disableItem' as never,
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

      {options?.map(option => (
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
