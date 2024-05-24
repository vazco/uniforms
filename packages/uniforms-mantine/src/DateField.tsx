import { DateInput, DateTimePicker, DateInputProps } from '@mantine/dates';
import React, { RefObject } from 'react';
import { connectField, filterDOMProps, FieldProps } from 'uniforms';

type DateFieldType = 'date' | 'datetime-local';

type DateFieldInputProps = Omit<DateInputProps, 'onCopy'> & {
  inputRef?: RefObject<HTMLInputElement | HTMLButtonElement>;
  max?: Date;
  min?: Date;
  type?: DateFieldType;
};

type DateFieldProps = FieldProps<Date, DateFieldInputProps>;

function Date({
  disabled,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  type = 'datetime-local',
  ...props
}: DateFieldProps) {
  if (type === 'date') {
    return (
      <DateInput
        mb="xs"
        disabled={disabled}
        label={label}
        name={name}
        maxDate={max}
        minDate={min}
        onChange={(date: Date) =>
          readOnly
            ? undefined
            : date === null
            ? onChange(undefined)
            : onChange(date)
        }
        placeholder={placeholder}
        ref={inputRef as RefObject<HTMLInputElement>}
        value={value}
        {...filterDOMProps(props)}
      />
    );
  }

  return (
    <DateTimePicker
      disabled={disabled}
      label={label}
      name={name}
      maxDate={max}
      minDate={min}
      placeholder={placeholder}
      ref={inputRef as RefObject<HTMLButtonElement>}
      value={value}
      onChange={(date: Date) =>
        readOnly
          ? undefined
          : date === null
          ? onChange(undefined)
          : onChange(date)
      }
    />
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
