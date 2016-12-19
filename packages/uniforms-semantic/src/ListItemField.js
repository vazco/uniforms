import React        from 'react';
import connectField from 'uniforms/connectField';
import joinName     from 'uniforms/joinName';
import {Children}   from 'react';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <section className="item">
        <ListDelField className="top aligned" name={props.name} />

        <section className="middle aligned content" style={{width: '100%'}}>
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
    </section>
;

export default connectField(ListItem, {includeInChain: false});
