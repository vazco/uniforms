import classnames from 'classnames';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  {
    addIcon?: ReactNode;
    initialCount?: number;
    itemProps?: object;
    removeIcon?: ReactNode;
  }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  className,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  removeIcon,
  showInlineError,
  value,
  ...props
}: ListFieldProps) {
  return (
    <div
      className={classnames(
        'panel panel-default',
        { 'panel-danger': error },
        className,
      )}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {label && (
          <div className={classnames('panel-heading', { 'has-error': error })}>
            <label className="control-label">{label}&nbsp;</label>

            <ListAddField
              addIcon={addIcon}
              initialCount={initialCount}
              name="$"
            />

            {!!(error && showInlineError) && (
              <span className="help-block">{errorMessage}</span>
            )}
          </div>
        )}

        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                  removeIcon,
                })
              : child,
          ),
        )}
      </div>
    </div>
  );
}

export default connectField(List);
