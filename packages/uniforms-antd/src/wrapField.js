import Form    from 'antd/lib/form';
import Icon    from 'antd/lib/icon';
import React   from 'react';
import Tooltip from 'antd/lib/tooltip';

export default function wrapField ({
    colon,
    error,
    errorMessage,
    id,
    info,
    label,
    labelCol,
    required,
    showInlineError,
    wrapperCol
}, children) {
    const labelNode = !!label && (
        <span>
            {label}
            {!!info && (
                <span>
                    &nbsp;
                    <Tooltip title={info}>
                        <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
            )}
        </span>
    );

    return (
        <Form.Item
            colon={colon}
            hasFeedback
            help={showInlineError && errorMessage}
            htmlFor={id}
            label={labelNode}
            labelCol={labelCol}
            required={required}
            style={{marginBottom: '12px'}}
            validateStatus={error ? 'error' : undefined}
            wrapperCol={wrapperCol}
        >
            {children}
        </Form.Item>
    );
}
