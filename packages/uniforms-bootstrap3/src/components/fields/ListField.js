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
    error,
    initialCount,
    itemProps,
    label,
    name,
    removeIcon,
    value,
    ...props
}) =>
    <section
        className={classnames('panel panel-default', {'panel-danger': error}, className)}
        {...filterDOMProps(props)}
    >
        <section className="panel-body">
            {label && (
                <section className="panel-heading">
                    <label className="control-label">
                        {label}&nbsp;
                    </label>

                    <ListAddField name={`${name}.$`} initialCount={initialCount} addIcon={addIcon} />
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
