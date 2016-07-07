import React          from 'react';
import classnames     from 'classnames';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    children,
    className,
    disabled,     // eslint-disable-line no-unused-vars
    error,
    errorMessage, // eslint-disable-line no-unused-vars
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,       // eslint-disable-line no-unused-vars
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    grid,         // eslint-disable-line no-unused-vars
    id,           // eslint-disable-line no-unused-vars
    initialCount,
    itemProps,
    label,
    maxCount,     // eslint-disable-line no-unused-vars
    minCount,     // eslint-disable-line no-unused-vars
    name,
    onChange,     // eslint-disable-line no-unused-vars
    parent,       // eslint-disable-line no-unused-vars
    placeholder,  // eslint-disable-line no-unused-vars
    value,
    ...props
}) =>
    <section className={classnames('panel panel-default', {'panel-danger': error}, className)} {...props}>
        <section className="panel-body">
            {label && (
                <section className="panel-heading">
                    <label className="control-label">
                        {label}&nbsp;
                    </label>

                    <ListAddField name={`${name}.$`} initialCount={initialCount} />
                </section>
            )}

            {children ? (
                value.map((item, index) =>
                      Children.map(children, child =>
                           React.cloneElement(child, {
                               key: index,
                               label: null,
                               name: joinName(name, child.props.name && child.props.name.replace('$', index))
                           })
                      )
                 )
            ) : (
                value.map((item, index) =>
                    <ListItemField key={index} label={null} name={joinName(name, index)} {...itemProps} />
                )
            )}
        </section>
    </section>
;

export default connectField(List, {includeInChain: false});
