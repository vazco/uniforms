import CheckboxGroup, {
  CheckboxGroupProps,
  CheckboxValueType,
} from 'antd/lib/checkbox/Group';
import { RadioGroupProps } from 'antd/lib/radio';
import RadioGroup from 'antd/lib/radio/group';
import SelectAntD, { SelectProps as SelectAntDProps } from 'antd/lib/select';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

type CheckboxesProps = FieldProps<
  CheckboxValueType,
  CheckboxGroupProps | RadioGroupProps,
  {
    allowedValues?: CheckboxValueType[];
    checkboxes: true;
    disableItem?(value: CheckboxValueType): boolean;
    inputRef?: Ref<CheckboxGroup | typeof RadioGroup>;
    required?: boolean;
    transform?(value: CheckboxValueType): string;
  }
>;

type SelectProps = FieldProps<
  string | (string | undefined)[],
  SelectAntDProps<string | string[]>,
  {
    allowedValues?: string[];
    checkboxes?: false;
    disableItem?(value: CheckboxValueType): boolean;
    inputRef?: Ref<SelectAntD<string | string[]>>;
    required?: boolean;
    transform?(value: string): string;
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
        name={props.name}
        onChange={
          props.fieldType === Array
            ? // FIXME: Argument type depends on `props.fieldType`.
              (value: any) => props.onChange(value)
            : (event: any) => props.onChange(event.target.value)
        }
        options={props.allowedValues!.map(value => ({
          disabled: props.disableItem?.(value),
          label: props.transform ? props.transform(value) : value,
          value,
        }))}
        value={props.value}
        {...filterDOMProps(props)}
      />
    ) : (
      <SelectAntD<any>
        allowClear={!props.required}
        disabled={props.disabled}
        mode={props.fieldType === Array ? 'multiple' : undefined}
        // @ts-ignore: There's no `name` property on Select?
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
        {props.allowedValues?.map(value => (
          <SelectAntD.Option
            disabled={props.disableItem?.(value)}
            key={value}
            value={value}
          >
            {props.transform ? props.transform(value) : value}
          </SelectAntD.Option>
        ))}
      </SelectAntD>
    ),
  );
}

export default connectField(Select, { kind: 'leaf' });
