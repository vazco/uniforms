import CheckboxGroup from 'antd/lib/checkbox/Group';
import RadioGroup from 'antd/lib/radio/group';
import React from 'react';
import SelectAntDesign from 'antd/lib/select';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { connectField, filterDOMProps, Override } from 'uniforms';
import { RadioGroupProps } from 'antd/lib/radio';
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

const renderCheckboxes = (props: CheckboxesProps) => {
  const Group = props.fieldType === Array ? CheckboxGroup : RadioGroup;
  const checkboxProps = {
    disabled: props.disabled,
    id: props.id,
    name: props.name,
    onChange:
      props.fieldType === Array
        ? value => props.onChange && props.onChange(value)
        : event => props.onChange && props.onChange(event.target.value),
    options: props.allowedValues.map(value => {
      return {
        label: props.transform ? props.transform(value) : value,
        value,
      };
    }),
    value: props.value,
    ...filterDOMProps(props),
  };
  return <Group {...checkboxProps} />;
};

type SelectProps = {
  allowedValues?: string[];
  fieldType?: typeof Array | any;
  id: string;
  onChange: (value?: string | string[]) => void;
  placeholder: string;
  required?: boolean;
  transform?: (value?: string) => string;
} & SelectInputProps;

const renderSelect = (props: SelectProps) => (
  <SelectAntD
    allowClear={!props.required}
    disabled={props.disabled}
    id={props.id}
    mode={props.fieldType === Array ? 'multiple' : undefined}
    name={props.name}
    onChange={value => props.onChange(value)}
    placeholder={props.placeholder}
    ref={props.inputRef}
    value={props.value || (props.fieldType === Array ? [] : undefined)}
    {...filterDOMProps(props)}
  >
    {props.allowedValues!.map(value => (
      <SelectAntD.Option key={value} value={value}>
        {props.transform ? props.transform(value) : value}
      </SelectAntD.Option>
    ))}
  </SelectAntD>
);

export type SelectFieldProps = { checkboxes?: boolean } & (
  | CheckboxesProps
  | SelectProps
);

const Select = ({ checkboxes, ...props }: SelectFieldProps) =>
  wrapField(
    props,
    checkboxes
      ? renderCheckboxes(props as CheckboxesProps)
      : renderSelect(props as SelectProps),
  );

export default connectField(Select);
