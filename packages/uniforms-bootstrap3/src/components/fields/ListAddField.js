import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const ListAdd = ({className, parent, value, ...props}) => {
    const limitNotReached = !(parent.maxCount <= parent.value.length);

    return (
        <section
            className="badge pull-right"
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
        >
            <i
                {...props}
                className={classnames(
                    'add glyphicon glyphicon-plus', // TODO configure to alternate icon
                    className,
                    limitNotReached
                        ? 'link'
                        : 'disabled',
                )}
            />
        </section>
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
