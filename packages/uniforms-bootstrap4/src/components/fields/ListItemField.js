import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <li className="list-group-item">


        <div className="label label-default label-pill pull-xs-right">
            <ListDelField name={props.name} />
        </div>

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
