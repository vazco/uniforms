import connectField                        from 'uniforms/connectField';
import joinName                            from 'uniforms/joinName';
import React                               from 'react';
import {Children}                          from 'react';
import {ListItem}                          from 'material-ui/List';
import Card, {CardActions, CardContent}    from 'material-ui/Card';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem_ = props => (
    <ListItem>
        <Card>
            <CardContent>
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
            </CardContent>
            <CardActions>
                <ListDelField name={props.name} />
            </CardActions>
        </Card>
    </ListItem>
);

export default connectField(ListItem_, {includeInChain: false, includeParent: true});


