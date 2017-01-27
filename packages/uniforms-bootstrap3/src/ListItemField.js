import React        from 'react';
import connectField from 'uniforms/connectField';
import joinName     from 'uniforms/joinName';
import {Children}   from 'react';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = ({removeIcon, ...props}) =>
    <div className="row">
        <div className="col-xs-1">
            <ListDelField name={props.name} removeIcon={removeIcon} />
        </div>

        {props.children ? (
            Children.map(props.children, child =>
                React.cloneElement(child, {
                    className: 'col-xs-11',
                    name: joinName(props.name, child.props.name),
                    label: null
                })
            )
        ) : (
            <AutoField {...props} className="col-xs-11" />
        )}
    </div>
;

export default connectField(ListItem, {includeInChain: false});
