import CheckboxGroup, { CheckboxGroupProps } from 'antd/lib/checkbox/Group';
import RadioGroup from 'antd/lib/radio/group';
import React, { Ref } from 'react';
import SelectAntD, { SelectProps as SelectAntDProps } from 'antd/lib/select';
import { Override, connectField, filterDOMProps } from 'uniforms';
import { RadioGroupProps } from 'antd/lib/radio/interface';

import wrapField from './wrapField';

type CommonProps<Value> = {
  allowedValues?: CommonPropsValueElement<Value>[];
  fieldType?: typeof Array | unknown;
  id: string;
  name: string;
  onChange(value?: Value): void;
  placeholder: string;
  required: boolean;
  transform?(value: CommonPropsValueElement<Value>): string;
  value?: Value;
};

type CommonPropsValueElement<Value> = NonNullable<
  Value extends Array<infer Element> ? Element : Value
>;

type CheckboxesProps = Override<
  CheckboxGroupProps | RadioGroupProps,
  CommonProps<CheckboxGroupProps['value']> & {
    checkboxes: true;
    inputRef?: Ref<CheckboxGroup | RadioGroup>;
  }
>;

type SelectProps = Override<
  SelectAntDProps,
  CommonProps<string | string[]> & {
    checkboxes?: false;
    inputRef?: Ref<SelectAntD<any>>;
  }
>;

export type SelectFieldProps = CheckboxesProps | SelectProps;

function Select(props: SelectFieldProps) {
  const Group = props.fieldType === Array ? CheckboxGroup : RadioGroup;
  return wrapField(
    props,
    props.checkboxes ? (
      <Group
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        // @ts-ignore: Different value and onChange based on fieldType.
        onChange={
          props.fieldType === Array
            ? value => props.onChange(value)
            : event => props.onChange(event.target.value)
        }
        options={props.allowedValues!.map(value => ({
          label: props.transform ? props.transform(value) : value,
          value,
        }))}
        value={props.value}
        {...filterDOMProps(props)}
      />
    ) : (
      // @ts-ignore: We can do better than any.
      <SelectAntD<any>
        allowClear={!props.required}
        disabled={props.disabled}
        id={props.id}
        mode={props.fieldType === Array ? 'multiple' : undefined}
        name={props.name}
        onChange={value => props.onChange(value)}
        placeholder={props.placeholder}
        ref={props.inputRef}
        value={
          props.fieldType === Array
            ? Array.isArray(props.value)
              ? props.value.filter(value => value !== undefined)
              : []
            : props.value
        }
        {...filterDOMProps(props)}
      >
        {props.allowedValues!.map(value => (
          <SelectAntD.Option key={value} value={value}>
            {props.transform ? props.transform(value) : value}
          </SelectAntD.Option>
        ))}
      </SelectAntD>
    ),
  );
}

export default connectField(Select, { kind: 'leaf' });
