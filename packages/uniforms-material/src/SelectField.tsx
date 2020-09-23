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
import React, { ReactNode, Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

type CheckboxesProps = FieldProps<
  string | string[],
  CheckboxProps | SwitchProps,
  {
    allowedValues?: string[];
    appearance?: 'checkbox' | 'switch';
    checkboxes: true;
    inputRef?: Ref<HTMLButtonElement>;
    legend?: string;
    required?: boolean;
    transform?(value: string): string;
  }
>;

type SelectProps = FieldProps<
  string | string[],
  TextFieldProps & MaterialSelectProps,
  {
    allowedValues?: string[];
    appearance?: 'checkbox' | 'switch';
    checkboxes?: false;
    inputRef?: Ref<HTMLButtonElement>;
    labelProps?: object;
    required?: boolean;
    transform?(value: string): string;
    textFieldProps: TextFieldProps;
  }
>;

export type SelectFieldProps = CheckboxesProps | SelectProps;

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

// eslint-disable-next-line complexity
function Select(props: SelectFieldProps) {
  const value = props.value ?? '';
  if (props.checkboxes) {
    const {
      allowedValues,
      disabled,
      fieldType,
      id,
      inputRef,
      label,
      legend,
      name,
      onChange,
      transform,
    } = props;
    const appearance = props.appearance ?? 'checkbox';
    const filteredProps = wrapField._filterDOMProps(
      filterDOMProps(omit(props, ['id'])),
    );
    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;
    const children =
      fieldType !== Array ? (
        <RadioGroup
          id={id}
          name={name}
          onChange={event => disabled || onChange(event.target.value)}
          ref={inputRef}
          value={value ?? ''}
        >
          {allowedValues!.map(item => (
            <FormControlLabel
              control={
                <Radio id={`${id}-${escape(item)}`} {...filteredProps} />
              }
              key={item}
              label={transform ? transform(item) : item}
              value={item}
            />
          ))}
        </RadioGroup>
      ) : (
        <FormGroup id={id}>
          {allowedValues!.map(item => (
            <FormControlLabel
              control={
                <SelectionControl
                  checked={value.includes(item)}
                  id={`${id}-${escape(item)}`}
                  name={name}
                  onChange={() => disabled || onChange(xor([item], value))}
                  ref={inputRef}
                  value={name}
                  {...filteredProps}
                />
              }
              key={item}
              label={transform ? transform(item) : item}
            />
          ))}
        </FormGroup>
      );
    return wrapField(
      {
        ...props,
        component: 'fieldset',
      },
      (legend || label) && (
        <FormLabel component="legend">{legend || label}</FormLabel>
      ),
      children,
    );
  }
  const {
    allowedValues,
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
    required,
    showInlineError,
    transform,
    variant,
    textFieldProps,
  } = props;
  const Item = native ? 'option' : MenuItem;
  const hasPlaceholder = !!placeholder;
  const hasValue = value !== '' && value !== undefined;

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={fullWidth}
      helperText={(error && showInlineError && errorMessage) || helperText}
      InputLabelProps={{
        shrink: !!label && (hasPlaceholder || hasValue),
        ...labelProps,
        ...InputLabelProps,
      }}
      label={label}
      margin={margin}
      onChange={event =>
        disabled ||
        onChange(event.target.value !== '' ? event.target.value : undefined)
      }
      required={required}
      select
      // @ts-ignore Different value and event based on fieldType.
      SelectProps={{
        displayEmpty: hasPlaceholder,
        inputProps: { name, id, ...inputProps },
        multiple: fieldType === Array || undefined,
        native,
        ...filterDOMProps(props),
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

      {allowedValues!.map(value => (
        <Item key={value} value={value}>
          {transform ? transform(value) : value}
        </Item>
      ))}
    </TextField>
  );
}

export default connectField(Select, { kind: 'leaf' });
