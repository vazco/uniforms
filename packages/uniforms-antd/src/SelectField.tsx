import CheckboxGroup from 'antd/lib/checkbox/Group';
import RadioGroup from 'antd/lib/radio/group';
import React from 'react';
import SelectAntDesign from 'antd/lib/select';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { connectField, filterDOMProps, Override } from 'uniforms';
import { RadioGroupProps as RadioGroupMaterialProps } from 'antd/lib/radio';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

import wrapField from './wrapField';

// SelectAntD does not recognize prop 'name'
const SelectAntD: any = SelectAntDesign;

type CheckboxesProps = Override<
  CheckboxGroupProps | RadioGroupProps,
  {
    allowedValues: string[];
    fieldType?: typeof Array | any;
    id: string;
    onChange: (
      value?: string | boolean[] | number | { [key: string]: any },
    ) => void;
    transform?: (value?: string) => string;
  }
  >;

type RadioGroupProps = {
  required?: boolean;
  placeholder: string;
} & RadioGroupMaterialProps;

type SelectProps = {
  allowedValues?: string[];
  fieldType?: typeof Array | any;
  id: string;
  onChange: (value?: string | string[]) => void;
  placeholder: string;
  required?: boolean;
  transform?: (value?: string) => string;
} & SelectInputProps;

export type SelectFieldProps = { checkboxes?: boolean } & (
  | CheckboxesProps
  | SelectProps
  );

function Select({ checkboxes, ...props }: SelectFieldProps) {
  let children;
  if (checkboxes) {
    const {
      allowedValues,
      disabled,
      id,
      transform,
      name,
      value,
      fieldType,
      onChange,
    } = props as CheckboxesProps;
    const Group = fieldType === Array ? CheckboxGroup : RadioGroup;
    const checkboxProps = {
      disabled,
      id,
      name,
      onChange:
        fieldType === Array
          ? value => onChange && onChange(value)
          : event => onChange && onChange(event.target.value),
      options: allowedValues.map(value => {
        return {
          label: transform ? transform(value) : value,
          value,
        };
      }),
      value,
      ...filterDOMProps(props as CheckboxesProps),
    };
    children = <Group {...checkboxProps} />;
  } else {
    const {
      allowedValues,
      required,
      transform,
      disabled,
      placeholder,
      inputRef,
      name,
      fieldType,
      value,
    } = props as SelectProps;
    // eslint-disable-next-line prefer-const
    children = (
      <SelectAntD
        allowClear={!required}
        disabled={disabled}
        id={props.id}
        mode={fieldType === Array ? 'multiple' : undefined}
        name={name}
        onChange={value => props.onChange(value)}
        placeholder={placeholder}
        ref={inputRef}
        value={value || (fieldType === Array ? [] : undefined)}
        {...filterDOMProps(props as SelectProps)}
      >
        {allowedValues!.map(value => (
          <SelectAntD.Option key={value} value={value}>
            {transform ? transform(value) : value}
          </SelectAntD.Option>
        ))}
      </SelectAntD>
    );
  }

  return wrapField(props, children);
}

export default connectField<SelectFieldProps>(Select);
