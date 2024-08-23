import classnames from "classnames";
import cloneDeep from "lodash/cloneDeep";
import React from "react";
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from "uniforms";

export type ListAddFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListAdd({
  disabled,
  name,
  readOnly,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  function onAction(event: React.KeyboardEvent | React.MouseEvent) {
    if (
      limitNotReached &&
      !readOnly &&
      (!("key" in event) || event.key === "Enter")
    ) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
    }
  }

  return (
    <i
      {...filterDOMProps(props)}
      className={classnames(
        "ui",
        props.className,
        limitNotReached ? "link" : "disabled",
        "fitted add icon",
      )}
      onClick={onAction}
      onKeyDown={onAction}
      role="button"
      tabIndex={0}
    />
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: "leaf",
});
