import {
  Checkbox,
  CheckboxProps,
  Radio,
  RadioGroupProps,
  Select as AntSelect,
  SelectProps as AntSelectProps,
} from 'antd'; // Corrected imports
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

interface CheckboxValueType {
  label: string;
  value: string;
  disabled?: boolean;
}

type CheckboxesProps = FieldProps<
  SelectFieldValue,
  CheckboxProps | RadioGroupProps,
  {
    options?: Option<CheckboxValueType>[];
    checkboxes: true;
    inputRef?: Ref<typeof Checkbox.Group | typeof Radio.Group>;
    required?: boolean;
  }
>;

type SelectProps = FieldProps<
  SelectFieldValue,
  AntSelectProps<string | string[]>,
  {
    options?: Option<string>[];
    checkboxes?: false;
    inputRef?: Ref<typeof AntSelect>;
    required?: boolean;
  }
>;

// This type is needed for the `SelectFieldProps` union to be a proper subtype
// of `Partial<GuaranteedProps<Value>>` - otherwise `connectField` goes wild.
type SelectFieldValue = CheckboxValueType | (string | undefined)[];

export type SelectFieldProps = CheckboxesProps | SelectProps;

function Select(props: SelectFieldProps) {
  const Group = props.fieldType === Array ? Checkbox.Group : Radio.Group;
  const filteredDOMProps = filterDOMProps(props);
  return wrapField(
    props,
    props.checkboxes ? (
      <span {...filteredDOMProps}>
        <Group
          {...filteredDOMProps}
          disabled={props.disabled}
          name={props.name}
          onChange={(eventOrValue: any) => {
            if (!props.readOnly) {
              props.onChange(
                // FIXME: Argument type depends on `props.fieldType`.

                props.fieldType === Array
                  ? eventOrValue
                  : eventOrValue.target.value,
              );
            }
          }}
          // @ts-ignore
          options={props.options?.map(option => ({
            ...option,
            label: option.label ?? option.value,
          }))}
          value={props.value}
        />
      </span>
    ) : (
      <AntSelect
        allowClear={!props.required}
        disabled={props.disabled}
        mode={props.fieldType === Array ? 'multiple' : undefined}
        name={props.name}
        onChange={(value: SelectFieldValue) => {
          if (!props.readOnly) {
            props.onChange(value);
          }
        }}
        placeholder={props.placeholder}
        // @ts-ignore
        ref={props.inputRef}
        value={
          props.fieldType === Array
            ? Array.isArray(props.value)
              ? props.value.filter(value => value !== undefined)
              : []
            : props.value
        }
        {...filteredDOMProps}
        options={props.options?.map(option => ({
          disabled: option.disabled ?? false,
          key: option.key ?? option.value,
          label: option.label ?? option.value,
          value: option.value,
          id: `${props.id}-${option.key ?? escape(option.value)}`,
        }))} // Corrected options prop
      />
    ),
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
