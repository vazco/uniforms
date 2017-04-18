import React    from 'react';
import {mount}  from 'enzyme';

import AutoFields     from 'uniforms-semantic/AutoFields';
import AutoForm       from 'uniforms-semantic/AutoForm';
import ErrorField     from 'uniforms-semantic/ErrorField';
import ErrorsField    from 'uniforms-semantic/ErrorsField';
import HiddenField    from 'uniforms-semantic/HiddenField';
import ListAddField   from 'uniforms-semantic/ListAddField';
import ListDelField   from 'uniforms-semantic/ListDelField';
import ListField      from 'uniforms-semantic/ListField';
import ListItemField  from 'uniforms-semantic/ListItemField';
import LongTextField  from 'uniforms-semantic/LongTextField';
import NumField       from 'uniforms-semantic/NumField';
import SelectField    from 'uniforms-semantic/SelectField';
import SubmitField    from 'uniforms-semantic/SubmitField';
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
    const allowedValues = [1, 2, 3];
    const base = {label, required};

    const schema = {
        'x00':     {...base, id: 'x00',    __type__: Number},
        'x01':     {...base, id: 'x01',    __type__: String},
        'x02':     {...base, id: 'x02',    __type__: Number, allowedValues},
        'x03':     {...base,               __type__: Number, allowedValues, checkboxes},
        'x04':     {...base,               __type__: Array,  allowedValues, checkboxes},
        'x04.$':   {...base,               __type__: Number},
        'x05':     {...base, id: 'x05',    __type__: Date},
        'x06':     {...base, id: 'x06',    __type__: Boolean},
        'x08':     {...base, id: 'x08',    __type__: Object, subfields: ['y01', 'y02']},
        'x08.y01': {...base, id: 'x08y01', __type__: String},
        'x08.y02': {...base, id: 'x08y02', __type__: Number},
        'x09':     {...base, id: 'x09',    __type__: Array},
        'x09.$':   {...base,               __type__: String},
        'x15':     {...base, id: 'x15',    __type__: Array, minCount: 3},
        'x15.$':   {...base,               __type__: String},
        'x16':     {...base, id: 'x16',    __type__: Array, maxCount: 3},
        'x16.$':   {...base,               __type__: String},
        'x17':     {...base, id: 'x17',    __type__: Number, allowedValues, transform},
        'x18':     {...base,               __type__: Number, allowedValues, checkboxes, transform},
        'x19':     {...base,               __type__: Array,  allowedValues, checkboxes, transform},
        'x22':     {...base, id: 'x22',    __type__: Number, decimal: true},
        'x23':     {...base, id: 'x23',    __type__: String, type: 'password'},
        'x24':     {...base, id: 'x24',    __type__: Object, children: <p>x24</p>},
        'x25':     {...base, id: 'x25',    __type__: String, component: LongTextField},
        'x26':     {...base, id: 'x27',    __type__: Array, initialCount: 1, children: <p>x27</p>},
        'x26.$':   {...base,               __type__: String},
        'x27':     {...base, id: 'x26',    __type__: Array, minCount: 1, initialCount: 1, maxCount: 2},
        'x27.$':   {...base,               __type__: String},
        'x28':     {...base,               __type__: String, component: ErrorField},
        'x31':     {...base,               __type__: Number, allowedValues, checkboxes, component: SelectField},
        'x32':     {...base, id: 'x32',    __type__: String, component: HiddenField},
        'x33':     {...base, id: 'x33',    __type__: String, component: HiddenField, value: undefined},
        'x34':     {...base, id: 'x34',    __type__: String, icon: 'user'},
        'x35':     {...base, id: 'x35',    __type__: String, iconLeft: 'user'},
        'x36':     {...base, id: 'x36',    __type__: Date, icon: 'user'},
        'x37':     {...base, id: 'x37',    __type__: Date, iconLeft: 'user'},
        'x38':     {...base, id: 'x38',    __type__: Number, icon: 'user'},
        'x39':     {...base, id: 'x39',    __type__: Number, iconLeft: 'user'},
        'x40':     {...base, id: 'x40',    __type__: Number, step: 4}
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
        const children = (
            <section>
                <AutoFields />
                <ErrorsField />
                <SubmitField />
            </section>
        );

        wrapper.setProps({children});
        wrapper.update();

        await new Promise(resolve => setTimeout(resolve, 5));

        wrapper.setProps({children: null});
        wrapper.update();
    });

    it('works (NumField)', async () => {
        expect(wrapper.find('#x00').props()).toHaveProperty('value', '0');
        expect(wrapper.find('#x00').simulate('change', {target: {value: '-10'}})).toBeTruthy();
        expect(wrapper.find('#x00').props()).toHaveProperty('value', '-10');
        expect(wrapper.find('#x00').simulate('change', {target: {value: '0'}})).toBeTruthy();
        expect(wrapper.find('#x00').props()).toHaveProperty('value', '0');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x00', 0);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x00: 0}));
    });

    it('works (NumField, invalid)', async () => {
        expect(wrapper.find('#x00').props()).toHaveProperty('value', '0');
        expect(wrapper.find('#x00').simulate('change', {target: {value: 'invalid'}})).toBeTruthy();
        expect(wrapper.find('#x00').props()).toHaveProperty('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x00', undefined);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x00: undefined}));
    });

    it('works (NumField, step)', async () => {
        expect(wrapper.find('#x40').props()).toHaveProperty('step', 4);
    });

    it('works (TextField)', async () => {
        expect(wrapper.find('#x01').props()).toHaveProperty('value', '');
        expect(wrapper.find('#x01').simulate('change', {target: {value: 'x01'}})).toBeTruthy();
        expect(wrapper.find('#x01').props()).toHaveProperty('value', 'x01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x01', 'x01');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x01: 'x01'}));
    });

    it('works (SelectField)', async () => {
        expect(wrapper.find('#x02').props()).toHaveProperty('value', 1);
        expect(wrapper.find('#x02').simulate('change', {target: {value: 2}})).toBeTruthy();
        expect(wrapper.find('#x02').props()).toHaveProperty('value', 2);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x02', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x02: 2}));
    });

    it('works (RadioField, on)', async () => {
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).toBe(false);
        expect(wrapper.find('[name="x03"]').at(1).simulate('change', {target: {checked: true}})).toBeTruthy();
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x03', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x03: 2}));
    });

    it('works (RadioField, off)', async () => {
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).toBe(false);
        expect(wrapper.find('[name="x03"]').at(0).simulate('change', {target: {checked: true}})).toBeTruthy();
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x03', 1);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x03: 1}));
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).toBe(false);
        expect(wrapper.find('[name="x04"]').at(1).simulate('change', {target: {value: true}})).toBeTruthy();
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).toBe(true);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x04', [2]);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x04: [2]}));
    });

    it('works (SelectField, checkboxes, multiple, off)', async () => {
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x04"]').at(1).simulate('change', {target: {value: false}})).toBeTruthy();
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x04', []);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x04: []}));
    });

    it('works (DateField)', async () => {
        expect(wrapper.find('#x05').props()).toHaveProperty('value', dateA.toISOString().slice(0, -8));
        expect(wrapper.find('#x05').simulate('change', {target: {valueAsNumber: +dateB}})).toBeTruthy();
        expect(wrapper.find('#x05').props()).toHaveProperty('value', dateB.toISOString().slice(0, -8));

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x05', dateB);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x05: dateB}));
    });

    it('works (BoolField)', async () => {
        expect(wrapper.find('#x06').prop('checked')).toBe(false);
        expect(wrapper.find('#x06').simulate('change', {target: {value: true}})).toBeTruthy();
        expect(wrapper.find('#x06').prop('checked')).toBe(true);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x06', true);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x06: true}));
    });

    it('works (NestField, TextField)', async () => {
        expect(wrapper.find('#x08y01').props()).toHaveProperty('value', '');
        expect(wrapper.find('#x08y01').simulate('change', {target: {value: 'x08y01'}})).toBeTruthy();
        expect(wrapper.find('#x08y01').props()).toHaveProperty('value', 'x08y01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x08.y01', 'x08y01');
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({
            x08: expect.objectContaining({y01: 'x08y01'})
        }));
    });

    it('works (NestField, NumField)', async () => {
        expect(wrapper.find('#x08y02').props()).toHaveProperty('value', '0');
        expect(wrapper.find('#x08y02').simulate('change', {target: {value: '2'}})).toBeTruthy();
        expect(wrapper.find('#x08y02').props()).toHaveProperty('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x08.y02', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x08: expect.objectContaining({y02: 2})}));
    });

    it('works (NumField, decimal, nullable)', async () => {
        expect(wrapper.find('#x22').props()).toHaveProperty('value', '0');
        expect(wrapper.find('#x22').simulate('change', {target: {value: ''}})).toBeTruthy();
        expect(wrapper.find('#x22').props()).toHaveProperty('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x22', undefined);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x22: undefined}));
    });

    it('works (NumField, decimal)', async () => {
        expect(wrapper.find('#x22').props()).toHaveProperty('value', '');
        expect(wrapper.find('#x22').simulate('change', {target: {value: '2'}})).toBeTruthy();
        expect(wrapper.find('#x22').props()).toHaveProperty('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x22', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x22: 2}));
    });

    it('works (LongTextField)', async () => {
        expect(wrapper.find('#x25').props()).toHaveProperty('value', '');
        expect(wrapper.find('#x25').simulate('change', {target: {value: 'x25'}})).toBeTruthy();
        expect(wrapper.find('#x25').props()).toHaveProperty('value', 'x25');

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
        expect(wrapper.find('[name="x31"]').at(0).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x31"]').at(1).prop('checked')).toBe(false);
        expect(wrapper.find('[name="x31"]').at(1).simulate('change', {target: {value: true}})).toBeTruthy();
        expect(wrapper.find('[name="x31"]').at(1).prop('checked')).toBe(true);
        expect(wrapper.find('[name="x31"]').at(0).prop('checked')).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange).toHaveBeenLastCalledWith('x31', 2);
        expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining({x31: 2}));
    });

    it('works (HiddenField)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find('#x32').props()).toHaveProperty('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find('#x32').props()).toHaveProperty('value', 'x32');

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
