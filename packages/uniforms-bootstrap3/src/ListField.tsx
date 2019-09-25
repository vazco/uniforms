import React, { Children } from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName from 'uniforms/joinName';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

const List = ({
  addIcon,
  children,
  className,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  removeIcon,
  showInlineError,
  value,
  ...props
}: any) => (
  <div
    className={classnames(
      'panel panel-default',
      { 'panel-danger': error },
      className
    )}
    {...filterDOMProps(props)}
  >
    <div className="panel-body">
      {label && (
        <div className={classnames('panel-heading', { 'has-error': error })}>
          <label className="control-label">{label}&nbsp;</label>

          <ListAddField
            name={`${name}.$`}
            initialCount={initialCount}
            addIcon={addIcon}
          />

          {!!(error && showInlineError) && (
            <span className="help-block">{errorMessage}</span>
          )}
        </div>
      )}

      {children
        ? value.map((item: any, index: number) =>
            Children.map(children, child =>
              React.cloneElement(child, {
                key: index,
                label: null,
                name: joinName(
                  name,
                  child.props.name && child.props.name.replace('$', index)
                ),
                removeIcon
              })
            )
          )
        : value.map((item: any, index: number) => (
            <ListItemField
              key={index}
              label={null}
              name={joinName(name, index)}
              removeIcon={removeIcon}
              {...itemProps}
            />
          ))}
    </div>
  </div>
);
export default connectField(List, {
  ensureValue: false,
  includeInChain: false
});
