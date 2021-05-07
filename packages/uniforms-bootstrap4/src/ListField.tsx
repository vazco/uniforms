import classnames from 'classnames';
import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

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
      className={classnames('card mb-3', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {label && (
          <div className="card-title">
            <label className="col-form-label">{label}&nbsp;</label>

            <ListAddField
              addIcon={addIcon}
              initialCount={initialCount}
              name="$"
            />

            {!!(error && showInlineError) && (
              <span className="text-danger">{errorMessage}</span>
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

export default connectField<ListFieldProps>(List);
