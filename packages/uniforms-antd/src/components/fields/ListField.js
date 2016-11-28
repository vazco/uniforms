import React            from 'react';
import classnames       from 'classnames';
import {Children}       from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {joinName}       from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';
import {InfoMessage} from './InfoMessage';

const List = ({
    children,
    className,
    disabled,
    error,
    errorMessage,
    initialCount,
    label,
    name,
    required,
    showInlineError,
    value,
    info,
    ...props
}) => {
    return (
        <section
            className={classnames('ui', className, {disabled})}
            style={{
                border: '1px solid #DDD',
                borderRadius: '7px',
                padding: '10px',
                marginBottom: '5px',
                marginTop: '5px'
            }}
        >
            {label && (
                <section className={classnames({error, required}, 'field item')}>
                    <label className="left floated">
                        <span>{label}{info && (<span>&nbsp;<InfoMessage info={info} /></span>)}</span>
                    </label>
                </section>
            )}

            {label && (
                <section style={{height: '18px'}}  />
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
                    <ListItemField key={index} label={null} name={joinName(name, index)} {...filterDOMProps(props)} />
                )
            )}
            <div>
                <ListAddField name={`${name}.$`} initialCount={initialCount} />
            </div>
        </section>
    );
};


export default connectField(List, {includeInChain: false});
