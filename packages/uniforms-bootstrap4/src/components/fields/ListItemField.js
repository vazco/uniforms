import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <li className="list-group-item">

        <section className="list-group-item-top text-xs-right" style={{marginBottom: 5}}>
            <span className="label label-default label-pill">
                <ListDelField name={props.name} />
            </span>
        </section>

        <section className="middle aligned content">
            {props.children ? (
                Children.map(props.children, child =>
                    React.cloneElement(child, {
                        name: joinName(props.name, child.props.name),
                        label: null,
                        style: {
                            margin: 0,
                            ...child.props.style
                        }
                    })
                )
            ) : (
                <AutoField {...props} style={{margin: 0}} />
            )}
        </section>
    </li>
;

export default connectField(ListItem, {includeInChain: false});
