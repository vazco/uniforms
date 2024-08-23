import classnames from "classnames";
import xor from "lodash/xor";
import React, { Ref } from "react";
import { connectField, HTMLFieldProps } from "uniforms";

import type { Option } from "./types";
import wrapField from "./wrapField";

const base64: (string: string) => string =
  typeof btoa === "undefined"
    ? /* istanbul ignore next */ (x) => Buffer.from(x).toString("base64")
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, "");

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    options?: Option<string>[];
    checkboxes?: boolean;
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLSelectElement>;
  }
>;

function Select({
  options,
  checkboxes,
  disabled,
  error,
  fieldType,
  id,
  inline,
  inputClassName,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  value,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;
  return wrapField(
    {
      ...props,
      disabled,
      error,
      id,
      label,
      required,
    },
    checkboxes ? (
      options?.map((item) => (
        <div
          key={item.key ?? item.value}
          className={classnames(
            inputClassName,
            `form-check${inline ? " form-check-inline" : ""}`,
          )}
        >
          <label htmlFor={`${id}-${item.key ?? escape(item.value)}`}>
            <input
              checked={
                multiple ? value?.includes(item.value) : value === item.value
              }
              disabled={item.disabled || disabled}
              id={`${id}-${item.key ?? escape(item.value)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(multiple ? xor([item.value], value) : item.value);
                }
              }}
              type="checkbox"
            />
            {item.label ?? item.value}
          </label>
        </div>
      ))
    ) : (
      <select
        className={classnames(inputClassName, "form-control", {
          "is-invalid": error,
          "is-valid": !error && props.changed,
        })}
        disabled={disabled}
        id={id}
        multiple={multiple}
        name={name}
        onChange={(event) => {
          if (!readOnly) {
            const item = event.target.value;
            if (multiple) {
              const clear = event.target.selectedIndex === -1;
              onChange(clear ? [] : xor([item], value));
            } else {
              onChange(item !== "" ? item : undefined);
            }
          }
        }}
        ref={inputRef}
        value={value ?? ""}
      >
        {(!!placeholder || !required || value === undefined) && !multiple && (
          <option value="" disabled={required} hidden={required}>
            {placeholder || label}
          </option>
        )}

        {options?.map((option) => (
          <option
            disabled={option.disabled}
            key={option.key ?? option.value}
            value={option.value}
          >
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField<SelectFieldProps>(Select, { kind: "leaf" });
