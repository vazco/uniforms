import React        from 'react';
import connectField from 'uniforms/connectField';

const ApplicationSelect = ({allowedValues, onChange, transform, value}) =>
    <section>
        <select onChange={event => onChange(event.target.value)} value={value}>
            {allowedValues.map(value =>
                <option key={value} value={value}>
                    {transform ? transform(value) : value}
                </option>
            )}
        </select>
    </section>
;

export default connectField(ApplicationSelect);
