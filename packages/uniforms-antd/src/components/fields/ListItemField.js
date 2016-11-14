import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props => {
    return (
        <section className="item">
            <div
                style={{
                    width: '20px',
                    marginLeft: '10px',
                    float: 'right',
                    marginRight: '6px',
                    marginBottom: '10px'
                }}
            >
                <ListDelField className="top aligned" name={props.name} />
            </div>
            <div
                style={{
                    overflow: 'hidden',
                    marginBottom: '10px'
                }}
            >
                <div
                    style={{
                        borderBottom: '1px solid #DDD',
                        marginTop: '-8px',
                        height: '20px'
                    }}
                />
            </div>


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
    );
};

export default connectField(ListItem, {includeInChain: false});
