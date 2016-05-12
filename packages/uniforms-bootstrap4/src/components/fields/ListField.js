import React          from 'react';
import classnames     from 'classnames';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

// eslint-disable-next-line max-len, no-unused-vars
const List = ({className, disabled, children, error, field: {optional}, label, name, value, onChange, ...props}) =>
    <section className={classnames('ui', className, {disabled}, 'grouped fitted fields list')} {...props}>
        {label && (
            <section className={classnames({error, required: !optional}, 'field item')}>
                <label className="left floated">
                    {label}
                </label>

                <ListAddField name={`${name}.$`} className="right floated" />
            </section>
        )}

        <section className="ui fitted hidden clearing divider" />

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
                <ListItemField key={index} label={null} name={joinName(name, index)} />
            )
        )}
    </section>
;

export default connectField(List, {includeInChain: false});
