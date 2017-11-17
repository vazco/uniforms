import React                  from 'react';
import Subheader              from 'material-ui/Subheader';
import connectField           from 'uniforms/connectField';
import filterDOMProps         from 'uniforms/filterDOMProps';
import joinName               from 'uniforms/joinName';
import {Children}             from 'react';
import {List as ListMaterial} from 'material-ui/List';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    actionsStyle,
    children,
    initialCount,
    itemProps,
    label,
    name,
    value,
    ...props
}) =>
    <ListMaterial {...filterDOMProps(props)}>
        {!!label && <Subheader children={label} style={{paddingLeft: 0}} />}

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
        <div style={{paddingTop: 8, paddingBottom: 8, ...actionsStyle}}>
            <ListAddField name={`${name}.$`} initialCount={initialCount} />
        </div>
    </ListMaterial>
;

export default connectField(List, {ensureValue: true, includeInChain: false});
