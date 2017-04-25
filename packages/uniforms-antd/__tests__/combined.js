import React    from 'react';
import {mount}  from 'enzyme';

import AntDCheckbox    from 'antd/lib/checkbox';
import AntDDatePicker  from 'antd/lib/date-picker';
import AntDInput       from 'antd/lib/input';
import AntDInputNumber from 'antd/lib/input-number';
import AntDRadio       from 'antd/lib/radio';
import AntDSelect      from 'antd/lib/select';
import AntDSwitch      from 'antd/lib/switch';
import moment          from 'moment';

import AutoFields     from 'uniforms-antd/AutoFields';
import AutoForm       from 'uniforms-antd/AutoForm';
import ErrorField     from 'uniforms-antd/ErrorField';
import ErrorsField    from 'uniforms-antd/ErrorsField';
import FormGroup      from 'uniforms-antd/FormGroup';
import HiddenField    from 'uniforms-antd/HiddenField';
import ListAddField   from 'uniforms-antd/ListAddField';
import ListDelField   from 'uniforms-antd/ListDelField';
import ListField      from 'uniforms-antd/ListField';
import ListItemField  from 'uniforms-antd/ListItemField';
import LongTextField  from 'uniforms-antd/LongTextField';
import NumField       from 'uniforms-antd/NumField';
import SelectField    from 'uniforms-antd/SelectField';
import SubmitField    from 'uniforms-antd/SubmitField';
import filterDOMProps from 'uniforms/filterDOMProps';

filterDOMProps.register(
    '__type__',
    'allowedValues',
    'checkboxes',
    'component',
    'maxCount',
    'minCount',
    'subfields'
);

describe('Everything', () => {
    const validator = jest.fn();

    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const dateA = new Date(2004, 4, 4);
    const dateB = new Date(2005, 5, 5);

    const label         = 'label';
    const required      = true;
    const transform     = x => x;
    const checkboxes    = true;
    const allowedValues = ['1', '2', '3'];
    const base = {label, required};

    const schema = {
        'x00':     {...base, __type__: Number},
        'x01':     {...base, __type__: String},
        'x02':     {...base, __type__: String, allowedValues},
        'x03':     {...base, __type__: String, allowedValues, checkboxes},
        'x04':     {...base, __type__: Array,  allowedValues, checkboxes},
        'x04.$':   {...base, __type__: Number},
        'x05':     {...base, __type__: Date},
        'x06':     {...base, __type__: Boolean},
        'x08':     {...base, __type__: Object, subfields: ['y01', 'y02']},
        'x08.y01': {...base, __type__: String},
        'x08.y02': {...base, __type__: Number},
        'x09':     {...base, __type__: Array},
        'x09.$':   {...base, __type__: String},
        'x15':     {...base, __type__: Array, minCount: 3},
        'x15.$':   {...base, __type__: String},
        'x16':     {...base, __type__: Array, maxCount: 3},
        'x16.$':   {...base, __type__: String},
        'x17':     {...base, __type__: String, allowedValues, transform},
        'x18':     {...base, __type__: String, allowedValues, checkboxes, transform},
        'x19':     {...base, __type__: Array,  allowedValues, checkboxes, transform},
        'x22':     {...base, __type__: Number, decimal: true},
        'x23':     {...base, __type__: String, type: 'password'},
        'x24':     {...base, __type__: Object, children: <p>x24</p>},
        'x25':     {...base, __type__: String, component: LongTextField},
        'x26':     {...base, __type__: Array, initialCount: 1, children: <p>x27</p>},
        'x26.$':   {...base, __type__: String},
        'x27':     {...base, __type__: Array, minCount: 1, initialCount: 1, maxCount: 2},
        'x27.$':   {...base, __type__: String},
        'x28':     {...base, __type__: String, component: ErrorField},
        'x31':     {...base, __type__: String, allowedValues, checkboxes, component: SelectField},
        'x32':     {...base, __type__: String, component: HiddenField},
        'x33':     {...base, __type__: String, component: HiddenField, value: undefined},
        'x34':     {...base, __type__: Number, step: 4}
    };

    const bridgeName = name => name.replace(/\.\d+/g, '.$');
    const bridge = {
        getError:        (name, error) => error ? {noop: 0} : undefined,
        getErrorMessage: (name, error) => error ? 'message' : undefined,

        getErrorMessages: error => error
            ? Object.keys(schema)
            : [],

        getField: name => schema[bridgeName(name)],
        getType:  name => schema[bridgeName(name)].__type__,
        getProps: name => ({...schema[bridgeName(name)], __type__: null}),

        getInitialValue: name => schema[bridgeName(name)].__type__ === Date
            ? dateA
            : schema[bridgeName(name)].allowedValues && schema[bridgeName(name)].__type__ !== Array
                ? schema[bridgeName(name)].allowedValues[0]
                : schema[bridgeName(name)].__type__(),

        getSubfields: name => name
            ? schema[bridgeName(name)].subfields || []
            : Object.keys(schema).filter(field => field.indexOf('.') === -1),

        getValidator: () => validator
    };

    const wrapper = mount(
        <AutoForm
            autosave
            onChange={onChange}
            onSubmit={onSubmit}
            placeholder
            schema={bridge}
        />
    );

    it('works (AutoFields, ErrorsField, SubmitField)', async () => {
        // eslint-disable-next-line no-undef
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

        const children = (
            <div>
                <AutoFields />
                <ErrorsField />
                <SubmitField />
            </div>
        );

        wrapper.setProps({children});
        wrapper.update();

        await new Promise(resolve => setTimeout(resolve, 5));

        wrapper.setProps({children: null});
        wrapper.update();
    });

    it('works (NumField)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x00');

        expect(find().props()).toHaveProperty('value', 0);
        expect(find().props().onChange(-10)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', -10);
        expect(find().props().onChange(0)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', 0);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x00', 0);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x00: 0}));
    });

    it('works (NumField, invalid)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x00');

        expect(find().props()).toHaveProperty('value', 0);
        expect(find().props().onChange(NaN)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', undefined);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x00', undefined);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x00: undefined}));
    });

    it('works (NumField, step)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x34');

        expect(find().props()).toHaveProperty('step', 4);
    });

    it('works (TextField)', async () => {
        const find = () => wrapper.find(AntDInput).filterWhere(x => x.props().name === 'x01');

        expect(find().props()).toHaveProperty('value', '');
        expect(find().props().onChange({target: {value: 'x01'}})).toBe(undefined);
        expect(find().props()).toHaveProperty('value', 'x01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x01', 'x01');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x01: 'x01'}));
    });

    it('works (SelectField)', async () => {
        const find = () => wrapper.find(AntDSelect).filterWhere(x => x.props().name === 'x02');

        expect(find().props()).toHaveProperty('value', '1');
        expect(find().props().onChange('2')).toBe(undefined);
        expect(find().props()).toHaveProperty('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x02', '2');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x02: '2'}));
    });

    it('works (RadioField, on)', async () => {
        const find = () => wrapper.find(AntDRadio.Group).filterWhere(x => x.props().name === 'x03');

        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);
        expect(find().props().onChange({target: {value: '2'}})).toBe(undefined);
        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x03', '2');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x03: '2'}));
    });

    it('works (RadioField, off)', async () => {
        const find = () => wrapper.find(AntDRadio.Group).filterWhere(x => x.props().name === 'x03');

        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);
        expect(find().props().onChange({target: {value: '1'}})).toBe(undefined);
        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x03', '1');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x03: '1'}));
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        const find = () => wrapper.find(AntDCheckbox.Group).filterWhere(x => x.props().name === 'x04');

        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual([]);
        expect(find().props().onChange(['2'])).toBe(undefined);
        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual(['2']);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x04', ['2']);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x04: ['2']}));
    });

    it('works (SelectField, checkboxes, multiple, off)', async () => {
        const find = () => wrapper.find(AntDCheckbox.Group).filterWhere(x => x.props().name === 'x04');

        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual(['2']);
        expect(find().props().onChange([])).toBe(undefined);
        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual([]);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x04', []);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x04: []}));
    });

    it('works (DateField)', async () => {
        const find = () => wrapper.find(AntDDatePicker).filterWhere(x => x.props().name === 'x05');

        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual(moment(dateA));
        expect(find().props().onChange(moment(dateB))).toBe(undefined);
        expect(find().props()).toHaveProperty('value');
        expect(find().props().value).toEqual(moment(dateB));

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x05', dateB);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x05: dateB}));
    });

    it('works (BoolField)', async () => {
        const find = () => wrapper.find(AntDSwitch).filterWhere(x => x.props().name === 'x06');

        expect(find().props()).toHaveProperty('checked', false);
        expect(find().props().onChange(true)).toBe(undefined);
        expect(find().props()).toHaveProperty('checked', true);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x06', true);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x06: true}));
    });

    it('works (NestField, TextField)', async () => {
        const find = () => wrapper.find(AntDInput).filterWhere(x => x.props().name === 'x08.y01');

        expect(find().props()).toHaveProperty('value', '');
        expect(find().props().onChange({target: {value: 'x08y01'}})).toBe(undefined);
        expect(find().props()).toHaveProperty('value', 'x08y01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x08.y01', 'x08y01');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({
            x08: expect.objectContaining({y01: 'x08y01'})
        }));
    });

    it('works (NestField, NumField)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x08.y02');

        expect(find().props()).toHaveProperty('value', 0);
        expect(find().props().onChange(2)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', 2);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x08.y02', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x08: expect.objectContaining({y02: 2})}));
    });

    it('works (NumField, decimal, nullable)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x22');

        expect(find().props()).toHaveProperty('value', 0);
        expect(find().props().onChange(undefined)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', undefined);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x22', undefined);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x22: undefined}));
    });

    it('works (NumField, decimal)', async () => {
        const find = () => wrapper.find(AntDInputNumber).filterWhere(x => x.props().name === 'x22');

        expect(find().props()).toHaveProperty('value', undefined);
        expect(find().props().onChange(NaN)).toBe(undefined);
        expect(find().props()).toHaveProperty('value', undefined);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x22', undefined);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x22: undefined}));
    });

    it('works (LongTextField)', async () => {
        const find = () => wrapper.find(AntDInput).filterWhere(x => x.props().name === 'x25');

        expect(find().props()).toHaveProperty('value', '');
        expect(find().props().onChange({target: {value: 'x25'}})).toBe(undefined);
        expect(find().props()).toHaveProperty('value', 'x25');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x25', 'x25');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x25: 'x25'}));
    });

    it('works (ListAddField, one)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onClick).last().simulate('click')).toBeTruthy();

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x27.0', '');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x27: ['']}));
    });

    it('works (ListAddField, two)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onClick).last().simulate('click')).toBeTruthy();

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x27.1', '');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x27: ['', '']}));
    });

    it('works (ListDelField)', async () => {
        expect(wrapper.find(ListDelField).at(0).simulate('click')).toBeTruthy();

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x27', ['']);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x27: ['']}));
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        const find = () => wrapper.find(AntDRadio.Group).filterWhere(x => x.props().name === 'x31');

        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);
        expect(find().props().onChange({target: {value: '2'}})).toBe(undefined);
        expect(find().find(AntDRadio).at(0).children().at(0).prop('checked')).toBe(false);
        expect(find().find(AntDRadio).at(1).children().at(0).prop('checked')).toBe(true);
        expect(find().find(AntDRadio).at(2).children().at(0).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x31', '2');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x31: '2'}));
    });

    it('works (HiddenField)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find(HiddenField).props()).toHaveProperty('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find(HiddenField).props()).toHaveProperty('value', 'x32');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x32', 'x32');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x32: 'x32'}));
    });

    it('works (HiddenField, noDOM)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" noDOM />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find(HiddenField).props()).toHaveProperty('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find(HiddenField).props()).toHaveProperty('value', 'x32');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x32', 'x32');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x32: 'x32'}));
    });

    it('works (ListField, custom children)', async () => {
        // eslint-disable-next-line no-undef
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

        const children = (
            <ListField name="x04" value={[1]}>
                <ListItemField name="$">
                    <NumField />
                </ListItemField>
            </ListField>
        );

        wrapper.setProps({children});
        wrapper.update();

        await new Promise(resolve => setTimeout(resolve, 5));

        wrapper.setProps({children: null});
        wrapper.update();
    });

    it('works (remount)', () => {
        wrapper.unmount();
        wrapper.mount();
    });

    it('works (rest)', () => {
        wrapper.setProps({error: {}});
        wrapper.setProps({model: {...wrapper.state('model'), x09: ['', '', '']}});

        schema.x = {__type__: () => {}};

        expect(() => wrapper.update()).toThrow(/Unsupported field type/);
    });
});

test('FormGroup should be deprecated', () => {
    console.error = jest.fn();

    mount(<FormGroup />);

    expect(console.error).toHaveBeenCalledTimes(1);
});
