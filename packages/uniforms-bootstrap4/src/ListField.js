import React            from 'react';
import classnames       from 'classnames';
import {Children}       from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {joinName}       from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    addIcon,
    children,
    className,
    errorMessage,
    initialCount,
    itemProps,
    label,
    name,
    removeIcon,
    showInlineError,
    value,
    ...props
}) =>
    <section className={classnames('card', className)} {...filterDOMProps(props)}>
        <section className="card-block">
            {label && (
                <section className="card-title">
                    <label className="control-label">
                        {label}&nbsp;
                    </label>

                    <ListAddField name={`${name}.$`} initialCount={initialCount} addIcon={addIcon} />

                    {!!(errorMessage && showInlineError) && (
                        <span className="text-danger">
                            {errorMessage}
                        </span>
                    )}
                </section>
            )}

            {children ? (
                value.map((item, index) =>
                      Children.map(children, child =>
                           React.cloneElement(child, {
                               key: index,
                               label: null,
                               name: joinName(name, child.props.name && child.props.name.replace('$', index)),
                               removeIcon
                           })
                      )
                 )
            ) : (
                value.map((item, index) =>
                    <ListItemField
                        key={index}
                        label={null}
                        name={joinName(name, index)}
                        removeIcon={removeIcon}
                        {...itemProps}
                    />
                )
            )}
        </section>
    </section>
;

export default connectField(List, {includeInChain: false});
