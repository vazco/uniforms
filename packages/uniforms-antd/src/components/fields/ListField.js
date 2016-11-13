import React            from 'react';
import classnames       from 'classnames';
import {Children}       from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {joinName}       from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    children,
    className,
    disabled,
    error,
    errorMessage,
    initialCount,
    itemProps,
    label,
    name,
    required,
    showInlineError,
    value,
    ...props
}) => {

return(
    <section
        className={classnames('ui', className, {disabled})}
        style={{border: "1px solid #DDD", borderRadius: "7px", padding: "10px", marginBottom: "5px", marginTop: "5px"}}
        {...filterDOMProps(props)}
    >
        {label && (
            <section className={classnames({error, required}, 'field item')}>
                <label className="left floated">
                    {label}
                </label>

                <ListAddField name={`${name}.$`} initialCount={initialCount} className="right floated" />
            </section>
        )}

        {label && (
            <section style={{height: "18px"}}  />
        )}

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic label">
                {errorMessage}
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
)}


export default connectField(List, {includeInChain: false});
