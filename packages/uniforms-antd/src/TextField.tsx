import Input, { InputProps, InputRef } from "antd/lib/input";
import React, { LegacyRef } from "react";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type TextFieldProps = FieldProps<
  string,
  Omit<InputProps, "onReset">,
  { inputRef?: LegacyRef<InputRef> }
>;

function Text(props: TextFieldProps) {
  return wrapField(
    props,
    <Input
      disabled={props.disabled}
      name={props.name}
      onChange={(event) =>
        props.onChange(
          event.target.value === "" ? undefined : event.target.value,
        )
      }
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type={props.type ?? "text"}
      value={props.value ?? ""}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<TextFieldProps>(Text, { kind: "leaf" });
