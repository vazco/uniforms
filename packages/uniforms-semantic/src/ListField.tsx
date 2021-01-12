import classnames from 'classnames';
import React, { Children, cloneElement, isValidElement } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  { initialCount?: number; itemProps?: object }
>;

function List({
  children = <ListItemField name="$" />,
  className,
  disabled,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  required,
  showInlineError,
  value,
  ...props
}: ListFieldProps) {
  return (
    <div
      className={classnames(
        'ui',
        className,
        { disabled },
        'grouped fitted fields list',
      )}
      {...filterDOMProps(props)}
    >
      {label && (
        <div className={classnames({ error, required }, 'field item')}>
          <label className="left floated">{label}</label>

          <ListAddField
            className="right floated"
            initialCount={initialCount}
            name="$"
          />
        </div>
      )}

      {label && (
        <div className="ui fitted hidden clearing horizontal divider" />
      )}

      {!!(error && showInlineError) && (
        <div className="ui red basic label">{errorMessage}</div>
      )}

      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child, {
                key: `${itemIndex}-${childIndex}`,
                name: child.props.name?.replace('$', '' + itemIndex),
                ...itemProps,
              })
            : child,
        ),
      )}
    </div>
  );
}

export default connectField(List);
