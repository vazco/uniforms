import Icon           from 'antd/lib/icon';
import React          from 'react';
import Tooltip        from 'antd/lib/tooltip';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName       from 'uniforms/joinName';
import {Children}     from 'react';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    children,
    errorMessage,
    info,
    initialCount,
    label,
    name,
    showInlineError,
    value,
    ...props
}) =>
    <div {...filterDOMProps(props)}>
        {!!label && (
            <div>
                {label}
                {!!info && (
                    <span>
                        &nbsp;
                        <Tooltip title={info}>
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                )}
            </div>
        )}

        {!!label && (
            <div style={{height: '18px'}}  />
        )}

        {!!(errorMessage && showInlineError) && (
            <div>
                {errorMessage}
            </div>
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
                <ListItemField
                    key={index}
                    label={null}
                    name={joinName(name, index)}
                />
            )
        )}

        <ListAddField name={`${name}.$`} initialCount={initialCount} />
    </div>
;

List.defaultProps = {
    style: {
        border: '1px solid #DDD',
        borderRadius: '7px',
        marginBottom: '5px',
        marginTop: '5px',
        padding: '10px'
    }
};


export default connectField(List, {includeInChain: false});
