import BaseForm     from 'uniforms/BaseForm';
import {PropTypes}  from 'react';

const AntD = parent => class extends parent {
    static AntD = AntD;

    static propTypes = {
            ...parent.propTypes,
            fieldData: PropTypes.object
    };

    static displayName = `AntD${parent.displayName}`;

    getChildContextState () {
        return {
            ...super.getChildContextState(),
            fieldData: this.props.fieldData
        };
    };
};

export default AntD(BaseForm);
