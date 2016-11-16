import React      from 'react';
export const InfoMessage = ({info}) =>{
    const AntD = require('antd');
    const Tooltip = AntD.Tooltip;
    const Icon = AntD.Icon;
    return(
        <Tooltip title={info}>
            <Icon type="question-circle-o" />
        </Tooltip>
    );
}
