import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <section className="row">
        <section className="col-xs-1">
            <ListDelField name={props.name} removeIcon={props.removeIcon} />
        </section>

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
    </section>
;

export default connectField(ListItem, {includeInChain: false});
