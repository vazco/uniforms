import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import classnames from 'classnames';
import { Override, connectField, filterDOMProps } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    addIcon?: ReactNode;
    children: ReactNode;
    error?: boolean;
    errorMessage?: string;
    initialCount?: number;
    itemProps?: {};
    name: string;
    removeIcon?: ReactNode;
    showInlineError?: boolean;
    value: unknown[];
  }
>;

function List({
  addIcon,
  children,
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

        {value.map((item, itemIndex) =>
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

List.defaultProps = { children: <ListItemField name="$" /> };

export default connectField(List);
