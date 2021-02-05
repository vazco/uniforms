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

  return (
    // TODO[jsx-a11y]
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
