/// <reference types="jest" />
/// <reference types="react" />
declare module "uniforms/__mocks__/meteor/aldeed_simple-schema" {
    export const SimpleSchema: {
        extendOptions: jest.Mock<any, any>;
        _makeGeneric: jest.Mock<string | null, [any]>;
    };
}
declare module "uniforms/__mocks__/meteor/check" {
    export const Match: {
        OneOf: jest.Mock<any, any>;
        Optional: jest.Mock<any, any>;
        ObjectIncluding: jest.Mock<any, any>;
    };
}
declare module "uniforms/src/joinName" {
    export default function joinName(flag: null, ...parts: unknown[]): string[];
    export default function joinName(...parts: unknown[]): string;
}
declare module "uniforms/src/changedKeys" {
    export default function changedKeys<T>(root: string, valueA?: T, valueB?: T): string[];
}
declare module "uniforms/__tests__/changedKeys" { }
declare module "uniforms/src/Bridge" {
    export default abstract class Bridge {
        constructor(...args: any[]);
        static check(schema: any): void;
        getError(name: string, error: any): void;
        getErrorMessage(name: string, error: any): void;
        getErrorMessages(error: any): void;
        getField(name: string): void;
        getInitialValue(name: string, props: {}): void;
        getProps(name: string, props: {}): void;
        getSubfields(name: string): void;
        getType(name: string): void;
        getValidator(options?: {}): void;
    }
}
declare module "uniforms/src/createSchemaBridge" {
    import Bridge from "uniforms/src/Bridge";
    function create(schema: any): Bridge;
    function register(bridge: typeof Bridge): void;
    const _default: typeof create & {
        register: typeof register;
        registered: (typeof Bridge)[];
    };
    export default _default;
}
declare module "uniforms/__tests__/createSchemaBridge" { }
declare module "uniforms/src/filterDOMProps" {
    function filter(props: {}): Partial<{}>;
    function register(...props: string[]): void;
    const _default_1: typeof filter & {
        register: typeof register;
        registered: string[];
    };
    export default _default_1;
}
declare module "uniforms/__tests__/filterDOMProps" { }
declare module "uniforms/src/randomIds" {
    export default function randomIds(prefix?: string): () => string;
}
declare module "uniforms/src/BaseForm" {
    import PropTypes from 'prop-types';
    import { Component } from 'react';
    export const __childContextTypes: {
        name: PropTypes.Validator<(string | null)[]>;
        error: PropTypes.Requireable<object>;
        model: PropTypes.Validator<object>;
        schema: {
            getError: PropTypes.Validator<(...args: any[]) => any>;
            getErrorMessage: PropTypes.Validator<(...args: any[]) => any>;
            getErrorMessages: PropTypes.Validator<(...args: any[]) => any>;
            getField: PropTypes.Validator<(...args: any[]) => any>;
            getInitialValue: PropTypes.Validator<(...args: any[]) => any>;
            getProps: PropTypes.Validator<(...args: any[]) => any>;
            getSubfields: PropTypes.Validator<(...args: any[]) => any>;
            getType: PropTypes.Validator<(...args: any[]) => any>;
            getValidator: PropTypes.Validator<(...args: any[]) => any>;
        };
        state: {
            changed: PropTypes.Validator<boolean>;
            changedMap: PropTypes.Validator<object>;
            submitting: PropTypes.Validator<boolean>;
            label: PropTypes.Validator<boolean>;
            disabled: PropTypes.Validator<boolean>;
            placeholder: PropTypes.Validator<boolean>;
            showInlineError: PropTypes.Validator<boolean>;
        };
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        randomId: PropTypes.Validator<(...args: any[]) => any>;
    };
    export const __childContextTypesBuild: (type: any) => any;
    export default class BaseForm extends Component<any, any> {
        static displayName: string;
        static defaultProps: {
            model: {};
            label: boolean;
            autosave: boolean;
            autosaveDelay: number;
            noValidate: boolean;
        };
        static propTypes: {
            error: PropTypes.Requireable<object>;
            model: PropTypes.Requireable<object>;
            schema: PropTypes.Validator<any>;
            modelTransform: PropTypes.Requireable<(...args: any[]) => any>;
            onChange: PropTypes.Requireable<(...args: any[]) => any>;
            onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
            onSubmitFailure: PropTypes.Requireable<(...args: any[]) => any>;
            onSubmitSuccess: PropTypes.Requireable<(...args: any[]) => any>;
            label: PropTypes.Requireable<boolean>;
            disabled: PropTypes.Requireable<boolean>;
            placeholder: PropTypes.Requireable<boolean>;
            showInlineError: PropTypes.Requireable<boolean>;
            autosave: PropTypes.Requireable<boolean>;
            autosaveDelay: PropTypes.Requireable<number>;
        };
        static childContextTypes: {
            uniforms: any;
        };
        constructor();
        getChildContext(): {
            uniforms: {
                name: never[];
                error: any;
                model: any;
                state: {
                    changed: boolean;
                    changedMap: any;
                    submitting: any;
                    label: boolean;
                    disabled: boolean;
                    placeholder: boolean;
                    showInlineError: boolean;
                };
                schema: any;
                onChange: (key: any, value: any) => void;
                onSubmit: (event?: any) => any;
                randomId: any;
            };
        };
        componentWillMount(): void;
        componentWillReceiveProps({ schema }: any): void;
        componentWillUnmount(): void;
        delayId?: any;
        mounted: boolean;
        reset: () => void;
        change: (key: any, value: any) => void;
        submit: (event: any) => void;
        randomId: any;
        getChildContextName(): never[];
        getChildContextError(): any;
        getChildContextModel(): any;
        getChildContextState(): {
            changed: boolean;
            changedMap: any;
            submitting: any;
            label: boolean;
            disabled: boolean;
            placeholder: boolean;
            showInlineError: boolean;
        };
        getChildContextSchema(): any;
        getChildContextOnChange(): (key: any, value: any) => void;
        getChildContextOnSubmit(): (event?: any) => any;
        getModel(mode?: any): any;
        getChangedKeys(root: any, valueA: any, valueB: any): string[];
        getNativeFormProps(): {
            onSubmit: (event?: any) => any;
            key: string;
        };
        onChange(key: any, value: any): void;
        __reset(state: any): {
            changed: boolean;
            changedMap: {};
            submitting: boolean;
            resetCount: any;
        };
        onReset(): void;
        onSubmit(event?: any): any;
        render(): JSX.Element;
    }
}
declare module "uniforms/src/nothing" {
    const _default_2: JSX.Element | null;
    export default _default_2;
}
declare module "uniforms/src/QuickForm" {
    const _default_3: {
        new (): {
            [x: string]: any;
            getNativeFormProps(): any;
            getAutoField(): any;
            getErrorsField(): any;
            getSubmitField(): any;
        };
        [x: string]: any;
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_3;
}
declare module "uniforms/src/ValidatedForm" {
    const _default_4: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        [x: string]: any;
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_4;
}
declare module "uniforms/src/ValidatedQuickForm" {
    const _default_5: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        [x: string]: any;
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_5;
}
declare module "uniforms/src/AutoForm" {
    const _default_6: {
        new (): {
            [x: string]: any;
            componentWillReceiveProps({ model }: {
                model: any;
            }): void;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            getModel(mode: any): any;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onValidate(): any;
        };
        [x: string]: any;
        Auto: any;
        displayName: string;
        propTypes: any;
    };
    export default _default_6;
}
declare module "uniforms/src/BaseField" {
    import { Component } from 'react';
    export default class BaseField extends Component {
        static displayName: string;
        static propTypes: any;
        static contextTypes: {
            uniforms: any;
        };
        static childContextTypes: {
            uniforms: any;
        };
        constructor();
        getChildContext(): {
            uniforms: {
                name: string[];
                error: any;
                model: any;
                state: any;
                schema: any;
                onChange: any;
                onSubmit: any;
                randomId: any;
            };
        };
        shouldComponentUpdate(nextProps: any, _: any, { uniforms: nextContext }: {
            uniforms: any;
        }): boolean;
        props: any;
        options: {
            ensureValue: boolean;
            explicitInitialValue?: boolean;
            includeParent?: boolean;
            overrideValue: boolean;
        };
        randomId: number;
        getChildContextName(): string[];
        getChildContextError(): any;
        getChildContextModel(): any;
        getChildContextState(): any;
        getChildContextSchema(): any;
        getChildContextOnChange(): any;
        getChildContextOnSubmit(): any;
        getFieldProps(name?: any, options?: any): any;
        findError(name: any): any;
        findField(name: any): any;
        findValue(name: any): any;
    }
}
declare module "uniforms/src/connectField" {
    export default function connectField(component: any, { baseField, mapProps, ensureValue, includeInChain, includeParent, initialValue }?: any): any;
}
declare module "uniforms/src/injectName" {
    export default function injectName(name: string, children: JSX.Element | JSX.Element[], parent?: JSX.Element): JSX.Element[];
}
declare module "uniforms/src/index" {
    export { default as AutoForm } from "uniforms/src/AutoForm";
    export { default as BaseField } from "uniforms/src/BaseField";
    export { default as BaseForm } from "uniforms/src/BaseForm";
    export { default as Bridge } from "uniforms/src/Bridge";
    export { default as QuickForm } from "uniforms/src/QuickForm";
    export { default as ValidatedForm } from "uniforms/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms/src/ValidatedQuickForm";
    export { default as changedKeys } from "uniforms/src/changedKeys";
    export { default as connectField } from "uniforms/src/connectField";
    export { default as createSchemaBridge } from "uniforms/src/createSchemaBridge";
    export { default as filterDOMProps } from "uniforms/src/filterDOMProps";
    export { default as injectName } from "uniforms/src/injectName";
    export { default as joinName } from "uniforms/src/joinName";
    export { default as nothing } from "uniforms/src/nothing";
    export { default as randomIds } from "uniforms/src/randomIds";
}
declare module "uniforms/__tests__/index" { }
declare module "uniforms/__tests__/joinName" { }
declare module "uniforms/__tests__/randomIds" { }
declare module "uniforms-antd/src/wrapField" {
    export default function wrapField({ colon, error, errorMessage, extra, id, info, help, label, labelCol, required, showInlineError, wrapperCol, wrapperStyle }: {
        colon: any;
        error: any;
        errorMessage: any;
        extra: any;
        id: any;
        info: any;
        help: any;
        label: any;
        labelCol: any;
        required: any;
        showInlineError: any;
        wrapperCol: any;
        wrapperStyle: any;
    }, children: any): JSX.Element;
}
declare module "uniforms-antd/src/BoolField" {
    const _default_7: any;
    export default _default_7;
}
declare module "uniforms-antd/src/DateField" {
    const _default_8: any;
    export default _default_8;
}
declare module "uniforms-antd/src/ListDelField" {
    const _default_9: any;
    export default _default_9;
}
declare module "uniforms-antd/src/ListItemField" {
    const _default_10: any;
    export default _default_10;
}
declare module "uniforms-antd/src/ListAddField" {
    const _default_11: any;
    export default _default_11;
}
declare module "uniforms-antd/src/ListField" {
    const _default_12: any;
    export default _default_12;
}
declare module "uniforms-antd/src/NestField" {
    const _default_13: any;
    export default _default_13;
}
declare module "uniforms-antd/src/NumField" {
    const _default_14: any;
    export default _default_14;
}
declare module "uniforms-antd/src/RadioField" {
    const _default_15: any;
    export default _default_15;
}
declare module "uniforms-antd/src/SelectField" {
    const _default_16: any;
    export default _default_16;
}
declare module "uniforms-antd/src/TextField" {
    const _default_17: any;
    export default _default_17;
}
declare module "uniforms-antd/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-antd/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-antd/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: any, { uniforms: { schema } }: any): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-antd/src/BaseForm" {
    const _default_18: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        AntD: (parent: any) => any;
        displayName: string;
    };
    export default _default_18;
}
declare module "uniforms-antd/src/ErrorsField" {
    const ErrorsField: {
        ({ children, ...props }: any, { uniforms: { error, schema } }: any): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            style: {
                backgroundColor: string;
                border: string;
                borderRadius: string;
                margin: string;
                padding: string;
            };
        };
    };
    export default ErrorsField;
}
declare module "uniforms-antd/src/SubmitField" {
    const SubmitField: {
        ({ inputRef, value, ...props }: {
            [x: string]: any;
            inputRef: any;
            value: any;
        }, { uniforms: { error, state: { disabled } } }: {
            uniforms: {
                error: any;
                state: {
                    disabled: any;
                };
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            value: string;
        };
    };
    export default SubmitField;
}
declare module "uniforms-antd/src/QuickForm" {
    import AutoField from "uniforms-antd/src/AutoField";
    const _default_19: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ children, ...props }: any, { uniforms: { error, schema } }: any): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    style: {
                        backgroundColor: string;
                        border: string;
                        borderRadius: string;
                        margin: string;
                        padding: string;
                    };
                };
            };
            getSubmitField(): {
                ({ inputRef, value, ...props }: {
                    [x: string]: any;
                    inputRef: any;
                    value: any;
                }, { uniforms: { error, state: { disabled } } }: {
                    uniforms: {
                        error: any;
                        state: {
                            disabled: any;
                        };
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    value: string;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_19;
}
declare module "uniforms-antd/src/ValidatedForm" {
    const _default_20: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_20;
}
declare module "uniforms-antd/src/ValidatedQuickForm" {
    const _default_21: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_21;
}
declare module "uniforms-antd/src/AutoForm" {
    const _default_22: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_22;
}
declare module "uniforms-antd/src/ErrorField" {
    const _default_23: any;
    export default _default_23;
}
declare module "uniforms-antd/src/FormGroup" {
    const FormGroup: ({ children, ...props }: any) => JSX.Element;
    export default FormGroup;
}
declare module "uniforms-antd/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: any): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-antd/src/LongTextField" {
    const _default_24: any;
    export default _default_24;
}
declare module "uniforms-antd/src/index" {
    export { default as AutoFields } from "uniforms-antd/src/AutoFields";
    export { default as AutoField } from "uniforms-antd/src/AutoField";
    export { default as AutoForm } from "uniforms-antd/src/AutoForm";
    export { default as BaseForm } from "uniforms-antd/src/BaseForm";
    export { default as BoolField } from "uniforms-antd/src/BoolField";
    export { default as DateField } from "uniforms-antd/src/DateField";
    export { default as ErrorField } from "uniforms-antd/src/ErrorField";
    export { default as ErrorsField } from "uniforms-antd/src/ErrorsField";
    export { default as FormGroup } from "uniforms-antd/src/FormGroup";
    export { default as HiddenField } from "uniforms-antd/src/HiddenField";
    export { default as ListAddField } from "uniforms-antd/src/ListAddField";
    export { default as ListDelField } from "uniforms-antd/src/ListDelField";
    export { default as ListField } from "uniforms-antd/src/ListField";
    export { default as ListItemField } from "uniforms-antd/src/ListItemField";
    export { default as LongTextField } from "uniforms-antd/src/LongTextField";
    export { default as NestField } from "uniforms-antd/src/NestField";
    export { default as NumField } from "uniforms-antd/src/NumField";
    export { default as QuickForm } from "uniforms-antd/src/QuickForm";
    export { default as RadioField } from "uniforms-antd/src/RadioField";
    export { default as SelectField } from "uniforms-antd/src/SelectField";
    export { default as SubmitField } from "uniforms-antd/src/SubmitField";
    export { default as TextField } from "uniforms-antd/src/TextField";
    export { default as ValidatedForm } from "uniforms-antd/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-antd/src/ValidatedQuickForm";
    export { default as wrapField } from "uniforms-antd/src/wrapField";
}
declare module "uniforms-bootstrap3/src/gridClassName" {
    export default function gridClassName(grid: any, side: any): string;
}
declare module "uniforms-bootstrap3/src/wrapField" {
    export default function wrapField({ className, disabled, error, errorMessage, feedbackable, // Only some input types support feedback icons.
    grid, // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help, // Help text.
    helpClassName, // Help text class name.
    id, label, labelClassName, // Label class name (String|Array[String]).
    required, showInlineError, // Show inline error message?
    wrapClassName, // Input wrapper class name.
    ...props }: {
        [x: string]: any;
        className: any;
        disabled: any;
        error: any;
        errorMessage: any;
        feedbackable: any;
        grid: any;
        help: any;
        helpClassName: any;
        id: any;
        label: any;
        labelClassName: any;
        required: any;
        showInlineError: any;
        wrapClassName: any;
    }, children: any): JSX.Element;
}
declare module "uniforms-bootstrap3/src/BoolField" {
    const _default_25: any;
    export default _default_25;
}
declare module "uniforms-bootstrap3/src/DateField" {
    const _default_26: any;
    export default _default_26;
}
declare module "uniforms-bootstrap3/src/ListDelField" {
    const _default_27: any;
    export default _default_27;
}
declare module "uniforms-bootstrap3/src/ListItemField" {
    const _default_28: any;
    export default _default_28;
}
declare module "uniforms-bootstrap3/src/ListAddField" {
    const _default_29: any;
    export default _default_29;
}
declare module "uniforms-bootstrap3/src/ListField" {
    const _default_30: any;
    export default _default_30;
}
declare module "uniforms-bootstrap3/src/NestField" {
    const _default_31: any;
    export default _default_31;
}
declare module "uniforms-bootstrap3/src/NumField" {
    const _default_32: any;
    export default _default_32;
}
declare module "uniforms-bootstrap3/src/RadioField" {
    const _default_33: any;
    export default _default_33;
}
declare module "uniforms-bootstrap3/src/SelectField" {
    const _default_34: any;
    export default _default_34;
}
declare module "uniforms-bootstrap3/src/TextField" {
    const _default_35: any;
    export default _default_35;
}
declare module "uniforms-bootstrap3/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-bootstrap3/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-bootstrap3/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: any, { uniforms: { schema } }: any): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-bootstrap3/src/BaseForm" {
    const _default_36: {
        new (): {
            [x: string]: any;
            getChildContextState(): any;
            getNativeFormProps(): any;
        };
        [x: string]: any;
        Bootstrap3: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_36;
}
declare module "uniforms-bootstrap3/src/ErrorsField" {
    const ErrorsField: {
        ({ className, children, ...props }: any, { uniforms: { error, schema } }: any): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
    };
    export default ErrorsField;
}
declare module "uniforms-bootstrap3/src/SubmitField" {
    const SubmitField: {
        ({ className, disabled, inputClassName, inputRef, value, wrapClassName, ...props }: {
            [x: string]: any;
            className: any;
            disabled: any;
            inputClassName: any;
            inputRef: any;
            value: any;
            wrapClassName: any;
        }, { uniforms: { error, state } }: {
            uniforms: {
                error: any;
                state: any;
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            inputClassName: string;
        };
    };
    export default SubmitField;
}
declare module "uniforms-bootstrap3/src/QuickForm" {
    import AutoField from "uniforms-bootstrap3/src/AutoField";
    const _default_37: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ className, children, ...props }: any, { uniforms: { error, schema } }: any): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
            };
            getSubmitField(): {
                ({ className, disabled, inputClassName, inputRef, value, wrapClassName, ...props }: {
                    [x: string]: any;
                    className: any;
                    disabled: any;
                    inputClassName: any;
                    inputRef: any;
                    value: any;
                    wrapClassName: any;
                }, { uniforms: { error, state } }: {
                    uniforms: {
                        error: any;
                        state: any;
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    inputClassName: string;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_37;
}
declare module "uniforms-bootstrap3/src/ValidatedForm" {
    const _default_38: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_38;
}
declare module "uniforms-bootstrap3/src/ValidatedQuickForm" {
    const _default_39: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_39;
}
declare module "uniforms-bootstrap3/src/AutoForm" {
    const _default_40: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_40;
}
declare module "uniforms-bootstrap3/src/ErrorField" {
    const _default_41: any;
    export default _default_41;
}
declare module "uniforms-bootstrap3/src/FormGroup" {
    const FormGroup: ({ children, ...props }: any) => JSX.Element;
    export default FormGroup;
}
declare module "uniforms-bootstrap3/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: any): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-bootstrap3/src/LongTextField" {
    const _default_42: any;
    export default _default_42;
}
declare module "uniforms-bootstrap3/src/index" {
    export { default as AutoFields } from "uniforms-bootstrap3/src/AutoFields";
    export { default as AutoField } from "uniforms-bootstrap3/src/AutoField";
    export { default as AutoForm } from "uniforms-bootstrap3/src/AutoForm";
    export { default as BaseForm } from "uniforms-bootstrap3/src/BaseForm";
    export { default as BoolField } from "uniforms-bootstrap3/src/BoolField";
    export { default as DateField } from "uniforms-bootstrap3/src/DateField";
    export { default as ErrorField } from "uniforms-bootstrap3/src/ErrorField";
    export { default as ErrorsField } from "uniforms-bootstrap3/src/ErrorsField";
    export { default as FormGroup } from "uniforms-bootstrap3/src/FormGroup";
    export { default as HiddenField } from "uniforms-bootstrap3/src/HiddenField";
    export { default as ListAddField } from "uniforms-bootstrap3/src/ListAddField";
    export { default as ListDelField } from "uniforms-bootstrap3/src/ListDelField";
    export { default as ListField } from "uniforms-bootstrap3/src/ListField";
    export { default as ListItemField } from "uniforms-bootstrap3/src/ListItemField";
    export { default as LongTextField } from "uniforms-bootstrap3/src/LongTextField";
    export { default as NestField } from "uniforms-bootstrap3/src/NestField";
    export { default as NumField } from "uniforms-bootstrap3/src/NumField";
    export { default as QuickForm } from "uniforms-bootstrap3/src/QuickForm";
    export { default as RadioField } from "uniforms-bootstrap3/src/RadioField";
    export { default as SelectField } from "uniforms-bootstrap3/src/SelectField";
    export { default as SubmitField } from "uniforms-bootstrap3/src/SubmitField";
    export { default as TextField } from "uniforms-bootstrap3/src/TextField";
    export { default as ValidatedForm } from "uniforms-bootstrap3/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-bootstrap3/src/ValidatedQuickForm";
    export { default as gridClassName } from "uniforms-bootstrap3/src/gridClassName";
    export { default as wrapField } from "uniforms-bootstrap3/src/wrapField";
}
declare module "uniforms-bootstrap4/src/gridClassName" {
    export default function gridClassName(grid: any, side: any): string;
}
declare module "uniforms-bootstrap4/src/wrapField" {
    export default function wrapField({ className, disabled, error, errorMessage, grid, // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help, // Help text.
    helpClassName, // Help text class name.
    id, label, labelClassName, // Label class name (String|Array[String]).
    required, showInlineError, // Show inline error message?
    wrapClassName, // Input wrapper class name.
    ...props }: {
        [x: string]: any;
        className: any;
        disabled: any;
        error: any;
        errorMessage: any;
        grid: any;
        help: any;
        helpClassName: any;
        id: any;
        label: any;
        labelClassName: any;
        required: any;
        showInlineError: any;
        wrapClassName: any;
    }, children: any): JSX.Element;
}
declare module "uniforms-bootstrap4/src/BoolField" {
    const _default_43: any;
    export default _default_43;
}
declare module "uniforms-bootstrap4/src/DateField" {
    global {
        interface Window {
            Date: DateConstructor;
        }
    }
    const _default_44: any;
    export default _default_44;
}
declare module "uniforms-bootstrap4/src/ListDelField" {
    const _default_45: any;
    export default _default_45;
}
declare module "uniforms-bootstrap4/src/ListItemField" {
    const _default_46: any;
    export default _default_46;
}
declare module "uniforms-bootstrap4/src/ListAddField" {
    const _default_47: any;
    export default _default_47;
}
declare module "uniforms-bootstrap4/src/ListField" {
    const _default_48: any;
    export default _default_48;
}
declare module "uniforms-bootstrap4/src/NestField" {
    const _default_49: any;
    export default _default_49;
}
declare module "uniforms-bootstrap4/src/NumField" {
    const _default_50: any;
    export default _default_50;
}
declare module "uniforms-bootstrap4/src/RadioField" {
    const _default_51: any;
    export default _default_51;
}
declare module "uniforms-bootstrap4/src/SelectField" {
    const _default_52: any;
    export default _default_52;
}
declare module "uniforms-bootstrap4/src/TextField" {
    const _default_53: any;
    export default _default_53;
}
declare module "uniforms-bootstrap4/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-bootstrap4/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-bootstrap4/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: {
            [x: string]: any;
            autoField: any;
            element: any;
            fields: any;
            omitFields: any;
        }, { uniforms: { schema } }: {
            uniforms: {
                schema: any;
            };
        }): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-bootstrap4/src/BaseForm" {
    const _default_54: {
        new (): {
            [x: string]: any;
            getChildContextState(): any;
            getNativeFormProps(): any;
        };
        [x: string]: any;
        Bootstrap4: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_54;
}
declare module "uniforms-bootstrap4/src/ErrorsField" {
    const ErrorsField: {
        ({ className, children, ...props }: {
            [x: string]: any;
            className: any;
            children: any;
        }, { uniforms: { error, schema } }: {
            uniforms: {
                error: any;
                schema: any;
            };
        }): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
    };
    export default ErrorsField;
}
declare module "uniforms-bootstrap4/src/SubmitField" {
    const SubmitField: {
        ({ className, disabled, inputClassName, inputRef, value, wrapClassName, ...props }: {
            [x: string]: any;
            className: any;
            disabled: any;
            inputClassName: any;
            inputRef: any;
            value: any;
            wrapClassName: any;
        }, { uniforms: { error, state } }: {
            uniforms: {
                error: any;
                state: any;
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            inputClassName: string;
        };
    };
    export default SubmitField;
}
declare module "uniforms-bootstrap4/src/QuickForm" {
    import AutoField from "uniforms-bootstrap4/src/AutoField";
    const _default_55: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ className, children, ...props }: {
                    [x: string]: any;
                    className: any;
                    children: any;
                }, { uniforms: { error, schema } }: {
                    uniforms: {
                        error: any;
                        schema: any;
                    };
                }): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
            };
            getSubmitField(): {
                ({ className, disabled, inputClassName, inputRef, value, wrapClassName, ...props }: {
                    [x: string]: any;
                    className: any;
                    disabled: any;
                    inputClassName: any;
                    inputRef: any;
                    value: any;
                    wrapClassName: any;
                }, { uniforms: { error, state } }: {
                    uniforms: {
                        error: any;
                        state: any;
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    inputClassName: string;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_55;
}
declare module "uniforms-bootstrap4/src/ValidatedForm" {
    const _default_56: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_56;
}
declare module "uniforms-bootstrap4/src/ValidatedQuickForm" {
    const _default_57: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_57;
}
declare module "uniforms-bootstrap4/src/AutoForm" {
    const _default_58: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_58;
}
declare module "uniforms-bootstrap4/src/ErrorField" {
    const _default_59: any;
    export default _default_59;
}
declare module "uniforms-bootstrap4/src/FormGroup" {
    const FormGroup: ({ children, ...props }: any) => JSX.Element;
    export default FormGroup;
}
declare module "uniforms-bootstrap4/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: {
            value: any;
        }): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-bootstrap4/src/LongTextField" {
    const _default_60: any;
    export default _default_60;
}
declare module "uniforms-bootstrap4/src/index" {
    export { default as AutoFields } from "uniforms-bootstrap4/src/AutoFields";
    export { default as AutoField } from "uniforms-bootstrap4/src/AutoField";
    export { default as AutoForm } from "uniforms-bootstrap4/src/AutoForm";
    export { default as BaseForm } from "uniforms-bootstrap4/src/BaseForm";
    export { default as BoolField } from "uniforms-bootstrap4/src/BoolField";
    export { default as DateField } from "uniforms-bootstrap4/src/DateField";
    export { default as ErrorField } from "uniforms-bootstrap4/src/ErrorField";
    export { default as ErrorsField } from "uniforms-bootstrap4/src/ErrorsField";
    export { default as FormGroup } from "uniforms-bootstrap4/src/FormGroup";
    export { default as HiddenField } from "uniforms-bootstrap4/src/HiddenField";
    export { default as ListAddField } from "uniforms-bootstrap4/src/ListAddField";
    export { default as ListDelField } from "uniforms-bootstrap4/src/ListDelField";
    export { default as ListField } from "uniforms-bootstrap4/src/ListField";
    export { default as ListItemField } from "uniforms-bootstrap4/src/ListItemField";
    export { default as LongTextField } from "uniforms-bootstrap4/src/LongTextField";
    export { default as NestField } from "uniforms-bootstrap4/src/NestField";
    export { default as NumField } from "uniforms-bootstrap4/src/NumField";
    export { default as QuickForm } from "uniforms-bootstrap4/src/QuickForm";
    export { default as RadioField } from "uniforms-bootstrap4/src/RadioField";
    export { default as SelectField } from "uniforms-bootstrap4/src/SelectField";
    export { default as SubmitField } from "uniforms-bootstrap4/src/SubmitField";
    export { default as TextField } from "uniforms-bootstrap4/src/TextField";
    export { default as ValidatedForm } from "uniforms-bootstrap4/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-bootstrap4/src/ValidatedQuickForm";
    export { default as gridClassName } from "uniforms-bootstrap4/src/gridClassName";
    export { default as wrapField } from "uniforms-bootstrap4/src/wrapField";
}
declare module "uniforms-bridge-graphql/src/GraphQLBridge" {
    import Bridge from "uniforms/src/Bridge";
    export default class GraphQLBridge extends Bridge {
        extras: any;
        schema: any;
        validator: any;
        constructor(schema: any, validator: any, extras?: {});
        static check(): boolean;
        getError(name: any, error: any): any;
        getErrorMessage(name: any, error: any): any;
        getErrorMessages(error: any): any;
        getField(name: any, returnExtracted?: boolean): any;
        getInitialValue(name: any, props?: any): any;
        getProps(nameNormal: any, props?: any): any;
        getSubfields(name: any): string[];
        getType(name: any): any;
        getValidator(): any;
    }
}
declare module "uniforms-bridge-graphql/src/register" { }
declare module "uniforms-bridge-graphql/src/index" {
    import "uniforms-bridge-graphql/src/register";
    export { default, default as GraphQLBridge } from "uniforms-bridge-graphql/src/GraphQLBridge";
}
declare module "uniforms-bridge-json-schema/src/JSONSchemaBridge" {
    import Bridge from "uniforms/src/Bridge";
    export default class JSONSchemaBridge extends Bridge {
        schema: any;
        _compiledSchema: {};
        validator: any;
        constructor(schema: any, validator: any);
        static check(): boolean;
        getError(name: any, error: any): any;
        getErrorMessage(name: any, error: any): any;
        getErrorMessages(error: any): any;
        getField(name: any): any;
        getInitialValue(name: any, props?: any): any;
        getProps(name: any, props?: any): {
            [x: string]: any;
            [x: number]: any;
        };
        getSubfields(name: any): string[];
        getType(name: any): any;
        getValidator(): any;
    }
}
declare module "uniforms-bridge-json-schema/src/register" { }
declare module "uniforms-bridge-json-schema/src/index" {
    import "uniforms-bridge-json-schema/src/register";
    export { default, default as JSONSchemaBridge } from "uniforms-bridge-json-schema/src/JSONSchemaBridge";
}
declare module "uniforms-bridge-simple-schema/src/SimpleSchemaBridge" {
    import Bridge from "uniforms/src/Bridge";
    export default class SimpleSchemaBridge extends Bridge {
        schema: any;
        constructor(schema: any);
        static check(schema: any): boolean;
        getError(name: any, error: any): any;
        getErrorMessage(name: any, error: any): any;
        getErrorMessages(error: any): any;
        getField(name: any): any;
        getInitialValue(name: any, props?: any): any;
        getProps(name: any, props?: any): any;
        getSubfields(name: any): any;
        getType(name: any): any;
        getValidator(options?: {
            clean: boolean;
        }): any;
    }
}
declare module "uniforms-bridge-simple-schema/src/register" { }
declare module "uniforms-bridge-simple-schema/src/index" {
    import "uniforms-bridge-simple-schema/src/register";
    export { default, default as SimpleSchemaBridge } from "uniforms-bridge-simple-schema/src/SimpleSchemaBridge";
}
declare module "uniforms-bridge-simple-schema-2/src/SimpleSchema2Bridge" {
    import Bridge from "uniforms/src/Bridge";
    export default class SimpleSchema2Bridge extends Bridge {
        schema: any;
        constructor(schema: any);
        static check(schema: any): boolean;
        getError(name: any, error: any): any;
        getErrorMessage(name: any, error: any): any;
        getErrorMessages(error: any): any;
        getField(name: any): any;
        getInitialValue(name: any, props?: any): any;
        getProps(name: any, props?: any): any;
        getSubfields(name: any): any;
        getType(name: any): any;
        getValidator(options?: {
            clean: boolean;
            mutate: boolean;
        }): any;
    }
}
declare module "uniforms-bridge-simple-schema-2/src/register" { }
declare module "uniforms-bridge-simple-schema-2/src/index" {
    import "uniforms-bridge-simple-schema-2/src/register";
    export { default, default as SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2/src/SimpleSchema2Bridge";
}
declare module "uniforms-material/src/wrapField" {
    import React from 'react';
    function wrap({ component, disabled, error, errorMessage, fullWidth, helperText, margin, required, showInlineError, variant }: any, ...children: any[]): React.FunctionComponentElement<import("@material-ui/core/OverridableComponent").DefaultComponentProps<{
        props: {
            disabled?: boolean | undefined;
            error?: boolean | undefined;
            fullWidth?: boolean | undefined;
            margin?: "normal" | "none" | "dense" | undefined;
            onBlur?: ((event: any) => void) | undefined;
            onFocus?: ((event: any) => void) | undefined;
            required?: boolean | undefined;
            variant?: "standard" | "filled" | "outlined" | undefined;
        };
        defaultComponent: "div";
        classKey: import("@material-ui/core/FormControl").FormControlClassKey;
    }>>;
    const _default_61: typeof wrap & {
        _filterDOMProps: (props: any) => Pick<any, number | symbol>;
        _filterDOMPropsList: string[];
    };
    export default _default_61;
}
declare module "uniforms-material/src/BoolField" {
    const _default_62: any;
    export default _default_62;
}
declare module "uniforms-material/src/DateField" {
    const _default_63: any;
    export default _default_63;
}
declare module "uniforms-material/src/ListDelField" {
    const _default_64: any;
    export default _default_64;
}
declare module "uniforms-material/src/ListItemField" {
    const _default_65: any;
    export default _default_65;
}
declare module "uniforms-material/src/ListAddField" {
    const _default_66: any;
    export default _default_66;
}
declare module "uniforms-material/src/ListField" {
    const _default_67: any;
    export default _default_67;
}
declare module "uniforms-material/src/NestField" {
    const _default_68: any;
    export default _default_68;
}
declare module "uniforms-material/src/NumField" {
    const _default_69: any;
    export default _default_69;
}
declare module "uniforms-material/src/RadioField" {
    const _default_70: any;
    export default _default_70;
}
declare module "uniforms-material/src/SelectField" {
    const _default_71: any;
    export default _default_71;
}
declare module "uniforms-material/src/TextField" {
    const _default_72: any;
    export default _default_72;
}
declare module "uniforms-material/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-material/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-material/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: {
            [x: string]: any;
            autoField: any;
            element: any;
            fields: any;
            omitFields: any;
        }, { uniforms: { schema } }: {
            uniforms: {
                schema: any;
            };
        }): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-material/src/BaseForm" {
    const _default_73: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Material: (parent: any) => any;
        displayName: string;
    };
    export default _default_73;
}
declare module "uniforms-material/src/ErrorsField" {
    const ErrorsField: {
        ({ children, fullWidth, margin, variant, ...props }: {
            [x: string]: any;
            children: any;
            fullWidth: any;
            margin: any;
            variant: any;
        }, { uniforms: { error, schema } }: {
            uniforms: {
                error: any;
                schema: any;
            };
        }): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            fullWidth: boolean;
            margin: string;
        };
    };
    export default ErrorsField;
}
declare module "uniforms-material/src/SubmitField" {
    const SubmitField: {
        ({ children, disabled, inputRef, label, value, ...props }: {
            [x: string]: any;
            children: any;
            disabled: any;
            inputRef: any;
            label: any;
            value: any;
        }, { uniforms: { error, state } }: {
            uniforms: {
                error: any;
                state: any;
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
        defaultProps: {
            label: string;
            variant: string;
        };
    };
    export default SubmitField;
}
declare module "uniforms-material/src/QuickForm" {
    import AutoField from "uniforms-material/src/AutoField";
    const _default_74: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ children, fullWidth, margin, variant, ...props }: {
                    [x: string]: any;
                    children: any;
                    fullWidth: any;
                    margin: any;
                    variant: any;
                }, { uniforms: { error, schema } }: {
                    uniforms: {
                        error: any;
                        schema: any;
                    };
                }): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    fullWidth: boolean;
                    margin: string;
                };
            };
            getSubmitField(): {
                ({ children, disabled, inputRef, label, value, ...props }: {
                    [x: string]: any;
                    children: any;
                    disabled: any;
                    inputRef: any;
                    label: any;
                    value: any;
                }, { uniforms: { error, state } }: {
                    uniforms: {
                        error: any;
                        state: any;
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
                defaultProps: {
                    label: string;
                    variant: string;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_74;
}
declare module "uniforms-material/src/ValidatedForm" {
    const _default_75: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_75;
}
declare module "uniforms-material/src/ValidatedQuickForm" {
    const _default_76: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_76;
}
declare module "uniforms-material/src/AutoForm" {
    const _default_77: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_77;
}
declare module "uniforms-material/src/ErrorField" {
    const _default_78: any;
    export default _default_78;
}
declare module "uniforms-material/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: {
            value: any;
        }): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-material/src/LongTextField" {
    const _default_79: any;
    export default _default_79;
}
declare module "uniforms-material/src/index" {
    export { default as AutoFields } from "uniforms-material/src/AutoFields";
    export { default as AutoField } from "uniforms-material/src/AutoField";
    export { default as AutoForm } from "uniforms-material/src/AutoForm";
    export { default as BaseForm } from "uniforms-material/src/BaseForm";
    export { default as BoolField } from "uniforms-material/src/BoolField";
    export { default as DateField } from "uniforms-material/src/DateField";
    export { default as ErrorField } from "uniforms-material/src/ErrorField";
    export { default as ErrorsField } from "uniforms-material/src/ErrorsField";
    export { default as HiddenField } from "uniforms-material/src/HiddenField";
    export { default as ListAddField } from "uniforms-material/src/ListAddField";
    export { default as ListDelField } from "uniforms-material/src/ListDelField";
    export { default as ListField } from "uniforms-material/src/ListField";
    export { default as ListItemField } from "uniforms-material/src/ListItemField";
    export { default as LongTextField } from "uniforms-material/src/LongTextField";
    export { default as NestField } from "uniforms-material/src/NestField";
    export { default as NumField } from "uniforms-material/src/NumField";
    export { default as QuickForm } from "uniforms-material/src/QuickForm";
    export { default as RadioField } from "uniforms-material/src/RadioField";
    export { default as SelectField } from "uniforms-material/src/SelectField";
    export { default as SubmitField } from "uniforms-material/src/SubmitField";
    export { default as TextField } from "uniforms-material/src/TextField";
    export { default as ValidatedForm } from "uniforms-material/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-material/src/ValidatedQuickForm";
}
declare module "uniforms-semantic/src/BoolField" {
    const _default_80: any;
    export default _default_80;
}
declare module "uniforms-semantic/src/DateField" {
    const _default_81: any;
    export default _default_81;
}
declare module "uniforms-semantic/src/ListDelField" {
    const _default_82: any;
    export default _default_82;
}
declare module "uniforms-semantic/src/ListItemField" {
    const _default_83: any;
    export default _default_83;
}
declare module "uniforms-semantic/src/ListAddField" {
    const _default_84: any;
    export default _default_84;
}
declare module "uniforms-semantic/src/ListField" {
    const _default_85: any;
    export default _default_85;
}
declare module "uniforms-semantic/src/NestField" {
    const _default_86: any;
    export default _default_86;
}
declare module "uniforms-semantic/src/NumField" {
    const _default_87: any;
    export default _default_87;
}
declare module "uniforms-semantic/src/RadioField" {
    const _default_88: any;
    export default _default_88;
}
declare module "uniforms-semantic/src/SelectField" {
    const _default_89: any;
    export default _default_89;
}
declare module "uniforms-semantic/src/TextField" {
    const _default_90: any;
    export default _default_90;
}
declare module "uniforms-semantic/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-semantic/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-semantic/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: {
            [x: string]: any;
            autoField: any;
            element: any;
            fields: any;
            omitFields: any;
        }, { uniforms: { schema } }: {
            uniforms: {
                schema: any;
            };
        }): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-semantic/src/BaseForm" {
    const _default_91: {
        new (): {
            [x: string]: any;
            getNativeFormProps(): any;
        };
        [x: string]: any;
        Semantic: (parent: any) => any;
        displayName: string;
    };
    export default _default_91;
}
declare module "uniforms-semantic/src/ErrorsField" {
    const ErrorsField: {
        ({ className, children, ...props }: {
            [x: string]: any;
            className: any;
            children: any;
        }, { uniforms: { error, schema } }: {
            uniforms: {
                error: any;
                schema: any;
            };
        }): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
    };
    export default ErrorsField;
}
declare module "uniforms-semantic/src/SubmitField" {
    const SubmitField: {
        ({ className, disabled, inputRef, value, ...props }: {
            [x: string]: any;
            className: any;
            disabled: any;
            inputRef: any;
            value: any;
        }, { uniforms: { error, state } }: {
            uniforms: {
                error: any;
                state: any;
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
    };
    export default SubmitField;
}
declare module "uniforms-semantic/src/QuickForm" {
    import AutoField from "uniforms-semantic/src/AutoField";
    const _default_92: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ className, children, ...props }: {
                    [x: string]: any;
                    className: any;
                    children: any;
                }, { uniforms: { error, schema } }: {
                    uniforms: {
                        error: any;
                        schema: any;
                    };
                }): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
            };
            getSubmitField(): {
                ({ className, disabled, inputRef, value, ...props }: {
                    [x: string]: any;
                    className: any;
                    disabled: any;
                    inputRef: any;
                    value: any;
                }, { uniforms: { error, state } }: {
                    uniforms: {
                        error: any;
                        state: any;
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_92;
}
declare module "uniforms-semantic/src/ValidatedForm" {
    const _default_93: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_93;
}
declare module "uniforms-semantic/src/ValidatedQuickForm" {
    const _default_94: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_94;
}
declare module "uniforms-semantic/src/AutoForm" {
    const _default_95: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_95;
}
declare module "uniforms-semantic/src/ErrorField" {
    const _default_96: any;
    export default _default_96;
}
declare module "uniforms-semantic/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: {
            value: any;
        }): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-semantic/src/LongTextField" {
    const _default_97: any;
    export default _default_97;
}
declare module "uniforms-semantic/src/index" {
    export { default as AutoFields } from "uniforms-semantic/src/AutoFields";
    export { default as AutoField } from "uniforms-semantic/src/AutoField";
    export { default as AutoForm } from "uniforms-semantic/src/AutoForm";
    export { default as BaseForm } from "uniforms-semantic/src/BaseForm";
    export { default as BoolField } from "uniforms-semantic/src/BoolField";
    export { default as DateField } from "uniforms-semantic/src/DateField";
    export { default as ErrorField } from "uniforms-semantic/src/ErrorField";
    export { default as ErrorsField } from "uniforms-semantic/src/ErrorsField";
    export { default as HiddenField } from "uniforms-semantic/src/HiddenField";
    export { default as ListAddField } from "uniforms-semantic/src/ListAddField";
    export { default as ListDelField } from "uniforms-semantic/src/ListDelField";
    export { default as ListField } from "uniforms-semantic/src/ListField";
    export { default as ListItemField } from "uniforms-semantic/src/ListItemField";
    export { default as LongTextField } from "uniforms-semantic/src/LongTextField";
    export { default as NestField } from "uniforms-semantic/src/NestField";
    export { default as NumField } from "uniforms-semantic/src/NumField";
    export { default as QuickForm } from "uniforms-semantic/src/QuickForm";
    export { default as RadioField } from "uniforms-semantic/src/RadioField";
    export { default as SelectField } from "uniforms-semantic/src/SelectField";
    export { default as SubmitField } from "uniforms-semantic/src/SubmitField";
    export { default as TextField } from "uniforms-semantic/src/TextField";
    export { default as ValidatedForm } from "uniforms-semantic/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-semantic/src/ValidatedQuickForm";
}
declare module "uniforms-unstyled/src/BoolField" {
    const _default_98: any;
    export default _default_98;
}
declare module "uniforms-unstyled/src/DateField" {
    const _default_99: any;
    export default _default_99;
}
declare module "uniforms-unstyled/src/ListDelField" {
    const _default_100: any;
    export default _default_100;
}
declare module "uniforms-unstyled/src/ListItemField" {
    const _default_101: any;
    export default _default_101;
}
declare module "uniforms-unstyled/src/ListAddField" {
    const _default_102: any;
    export default _default_102;
}
declare module "uniforms-unstyled/src/ListField" {
    const _default_103: any;
    export default _default_103;
}
declare module "uniforms-unstyled/src/NestField" {
    const _default_104: any;
    export default _default_104;
}
declare module "uniforms-unstyled/src/NumField" {
    const _default_105: any;
    export default _default_105;
}
declare module "uniforms-unstyled/src/RadioField" {
    const _default_106: any;
    export default _default_106;
}
declare module "uniforms-unstyled/src/SelectField" {
    const _default_107: any;
    export default _default_107;
}
declare module "uniforms-unstyled/src/TextField" {
    const _default_108: any;
    export default _default_108;
}
declare module "uniforms-unstyled/src/AutoField" {
    import BaseField from "uniforms/src/BaseField";
    export default class AutoField extends BaseField {
        static displayName: string;
        getChildContextName(): any;
        render(): import("react").ComponentElement<any, import("react").Component<any, any, any>>;
    }
}
declare module "uniforms-unstyled/src/AutoFields" {
    import PropTypes from 'prop-types';
    import AutoField from "uniforms-unstyled/src/AutoField";
    const AutoFields: {
        ({ autoField, element, fields, omitFields, ...props }: {
            [x: string]: any;
            autoField: any;
            element: any;
            fields: any;
            omitFields: any;
        }, { uniforms: { schema } }: {
            uniforms: {
                schema: any;
            };
        }): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        contextTypes: {
            uniforms: any;
        };
        propTypes: {
            autoField: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            element: PropTypes.Requireable<string | ((...args: any[]) => any)>;
            fields: PropTypes.Requireable<(string | null)[]>;
            omitFields: PropTypes.Requireable<(string | null)[]>;
        };
        defaultProps: {
            autoField: typeof AutoField;
            element: string;
            omitFields: never[];
        };
    };
    export default AutoFields;
}
declare module "uniforms-unstyled/src/BaseForm" {
    const _default_109: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Unstyled: (parent: any) => any;
        displayName: string;
    };
    export default _default_109;
}
declare module "uniforms-unstyled/src/ErrorsField" {
    const ErrorsField: {
        ({ children, ...props }: {
            [x: string]: any;
            children: any;
        }, { uniforms: { error, schema } }: {
            uniforms: {
                error: any;
                schema: any;
            };
        }): JSX.Element | null;
        contextTypes: {
            uniforms: any;
        };
    };
    export default ErrorsField;
}
declare module "uniforms-unstyled/src/SubmitField" {
    const SubmitField: {
        ({ disabled, inputRef, value, ...props }: {
            [x: string]: any;
            disabled: any;
            inputRef: any;
            value: any;
        }, { uniforms: { error, state } }: {
            uniforms: {
                error: any;
                state: any;
            };
        }): JSX.Element;
        contextTypes: {
            uniforms: any;
        };
    };
    export default SubmitField;
}
declare module "uniforms-unstyled/src/QuickForm" {
    import AutoField from "uniforms-unstyled/src/AutoField";
    const _default_110: {
        new (): {
            [x: string]: any;
            getAutoField(): typeof AutoField;
            getErrorsField(): {
                ({ children, ...props }: {
                    [x: string]: any;
                    children: any;
                }, { uniforms: { error, schema } }: {
                    uniforms: {
                        error: any;
                        schema: any;
                    };
                }): JSX.Element | null;
                contextTypes: {
                    uniforms: any;
                };
            };
            getSubmitField(): {
                ({ disabled, inputRef, value, ...props }: {
                    [x: string]: any;
                    disabled: any;
                    inputRef: any;
                    value: any;
                }, { uniforms: { error, state } }: {
                    uniforms: {
                        error: any;
                        state: any;
                    };
                }): JSX.Element;
                contextTypes: {
                    uniforms: any;
                };
            };
            getNativeFormProps(): any;
        };
        Quick: (parent: any) => any;
        displayName: string;
        propTypes: any;
    };
    export default _default_110;
}
declare module "uniforms-unstyled/src/ValidatedForm" {
    const _default_111: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_111;
}
declare module "uniforms-unstyled/src/ValidatedQuickForm" {
    const _default_112: {
        new (): {
            [x: string]: any;
            validate: (key?: any, value?: any) => Promise<unknown>;
            validateModel: (model: any) => Promise<unknown>;
            getChildContextError(): any;
            getChildContextState(): any;
            getNativeFormProps(): Pick<any, string | number | symbol>;
            componentWillReceiveProps({ model, schema, validate, validator }: any): void;
            onChange(key: any, value: any): void;
            __reset(state: any): any;
            onSubmit(event: any): Promise<unknown>;
            onValidate(key?: any, value?: any): Promise<unknown>;
            onValidateModel(model: any): Promise<unknown>;
        };
        Validated: (parent: any) => any;
        displayName: string;
        defaultProps: any;
        propTypes: any;
        childContextTypes: any;
    };
    export default _default_112;
}
declare module "uniforms-unstyled/src/AutoForm" {
    const _default_113: {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
        Auto: (parent: any) => any;
    };
    export default _default_113;
}
declare module "uniforms-unstyled/src/ErrorField" {
    const _default_114: any;
    export default _default_114;
}
declare module "uniforms-unstyled/src/HiddenField" {
    import BaseField from "uniforms/src/BaseField";
    export default class HiddenField extends BaseField {
        static displayName: string;
        constructor();
        componentWillReceiveProps({ value: valueDesired }: {
            value: any;
        }): void;
        render(): JSX.Element | null;
    }
}
declare module "uniforms-unstyled/src/LongTextField" {
    const _default_115: any;
    export default _default_115;
}
declare module "uniforms-unstyled/src/index" {
    export { default as AutoFields } from "uniforms-unstyled/src/AutoFields";
    export { default as AutoField } from "uniforms-unstyled/src/AutoField";
    export { default as AutoForm } from "uniforms-unstyled/src/AutoForm";
    export { default as BaseForm } from "uniforms-unstyled/src/BaseForm";
    export { default as BoolField } from "uniforms-unstyled/src/BoolField";
    export { default as DateField } from "uniforms-unstyled/src/DateField";
    export { default as ErrorField } from "uniforms-unstyled/src/ErrorField";
    export { default as ErrorsField } from "uniforms-unstyled/src/ErrorsField";
    export { default as HiddenField } from "uniforms-unstyled/src/HiddenField";
    export { default as ListAddField } from "uniforms-unstyled/src/ListAddField";
    export { default as ListDelField } from "uniforms-unstyled/src/ListDelField";
    export { default as ListField } from "uniforms-unstyled/src/ListField";
    export { default as ListItemField } from "uniforms-unstyled/src/ListItemField";
    export { default as LongTextField } from "uniforms-unstyled/src/LongTextField";
    export { default as NestField } from "uniforms-unstyled/src/NestField";
    export { default as NumField } from "uniforms-unstyled/src/NumField";
    export { default as QuickForm } from "uniforms-unstyled/src/QuickForm";
    export { default as RadioField } from "uniforms-unstyled/src/RadioField";
    export { default as SelectField } from "uniforms-unstyled/src/SelectField";
    export { default as SubmitField } from "uniforms-unstyled/src/SubmitField";
    export { default as TextField } from "uniforms-unstyled/src/TextField";
    export { default as ValidatedForm } from "uniforms-unstyled/src/ValidatedForm";
    export { default as ValidatedQuickForm } from "uniforms-unstyled/src/ValidatedQuickForm";
}
