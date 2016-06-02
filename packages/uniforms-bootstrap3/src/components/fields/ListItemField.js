import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <li className="list-group-item row">
        <section className="col-xs-1 list-group-item-top">
            <ListDelField name={props.name} />
        </section>

        {props.children ? (
            Children.map(props.children, child =>
                React.cloneElement(child, {
                    className: 'col-xs-1',
                    name: joinName(props.name, child.props.name),
                    label: null
                })
            )
        ) : (
            <AutoField {...props} className="col-xs-11" />
        )}
    </li>
;

export default connectField(ListItem, {includeInChain: false});
