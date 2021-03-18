import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  HTMLSpanElement,
  { initialCount?: number }
>;

function ListAdd({
  disabled,
  initialCount,
  name,
  readOnly,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<
    { initialCount?: number; maxCount?: number },
    unknown[]
  >(parentName, { initialCount }, { absoluteName: true })[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <i
      {...filterDOMProps(props)}
      className={classnames(
        'ui',
        props.className,
        limitNotReached ? 'link' : 'disabled',
        'fitted add icon',
      )}
      onClick={() => {
        if (limitNotReached && !readOnly) {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }
      }}
    />
  );
}

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
