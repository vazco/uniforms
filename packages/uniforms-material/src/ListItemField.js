import connectField                   from 'uniforms/connectField';
import joinName                       from 'uniforms/joinName';
import React                          from 'react';
import {Card, CardActions, CardText}  from 'material-ui/Card';
import {Children}                     from 'react';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <Card>
        <CardText>
            {props.children ? (
                Children.map(props.children, child =>
                    React.cloneElement(child, {
                        name: joinName(props.name, child.props.name),
                        label: null
                    })
                )
            ) : (
                <AutoField {...props} />
            )}
        </CardText>
        <CardActions>
            <ListDelField name={props.name} />
        </CardActions>
    </Card>
;

export default connectField(ListItem, {includeInChain: false, includeParent: true});


