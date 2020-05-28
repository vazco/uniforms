import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    addIcon?: any;
    children: ReactNode;
    error?: boolean;
    errorMessage?: string;
    initialCount?: number;
    itemProps?: {};
    name: string;
    removeIcon?: any;
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
