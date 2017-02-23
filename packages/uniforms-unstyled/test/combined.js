import React      from 'react';
import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';
import {mount}    from 'enzyme';
import {spy}      from 'sinon';
import {stub}     from 'sinon';

import AutoFields     from 'uniforms-unstyled/AutoFields';
import AutoForm       from 'uniforms-unstyled/AutoForm';
import ErrorField     from 'uniforms-unstyled/ErrorField';
import ErrorsField    from 'uniforms-unstyled/ErrorsField';
import HiddenField    from 'uniforms-unstyled/HiddenField';
import ListAddField   from 'uniforms-unstyled/ListAddField';
import ListDelField   from 'uniforms-unstyled/ListDelField';
import ListField      from 'uniforms-unstyled/ListField';
import ListItemField  from 'uniforms-unstyled/ListItemField';
import LongTextField  from 'uniforms-unstyled/LongTextField';
import NumField       from 'uniforms-unstyled/NumField';
import SelectField    from 'uniforms-unstyled/SelectField';
import SubmitField    from 'uniforms-unstyled/SubmitField';
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
    const validator = stub();

    const onChange = spy();
    const onSubmit = spy();

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
        'x34':     {...base, id: 'x34',    __type__: Number, step: 4}
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

    it('works (AutoFields, ErrorsField, SubmitField)', async function _ () {
        this.timeout(30000);

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
        expect(wrapper.find('#x00').props()).to.have.property('value', '0');
        expect(wrapper.find('#x00').simulate('change', {target: {value: '0'}})).to.be.ok;
        expect(wrapper.find('#x00').props()).to.have.property('value', '0');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x00', 0)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x00: 0})).to.be.ok;
    });

    it('works (NumField, invalid)', async () => {
        expect(wrapper.find('#x00').props()).to.have.property('value', '0');
        expect(wrapper.find('#x00').simulate('change', {target: {value: 'invalid'}})).to.be.ok;
        expect(wrapper.find('#x00').props()).to.have.property('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x00', undefined)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x00: undefined})).to.be.ok;
    });

    it('works (NumField, step)', async () => {
        expect(wrapper.find('#x34').props()).to.have.property('step', 4);
    });

    it('works (TextField)', async () => {
        expect(wrapper.find('#x01').props()).to.have.property('value', '');
        expect(wrapper.find('#x01').simulate('change', {target: {value: 'x01'}})).to.be.ok;
        expect(wrapper.find('#x01').props()).to.have.property('value', 'x01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x01', 'x01')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x01: 'x01'})).to.be.ok;
    });

    it('works (SelectField)', async () => {
        expect(wrapper.find('#x02').props()).to.have.property('value', 1);
        expect(wrapper.find('#x02').simulate('change', {target: {value: 2}})).to.be.ok;
        expect(wrapper.find('#x02').props()).to.have.property('value', 2);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x02', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x02: 2})).to.be.ok;
    });

    it('works (RadioField, on)', async () => {
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).to.be.false;
        expect(wrapper.find('[name="x03"]').at(1).simulate('change', {target: {checked: true}})).to.be.ok;
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x03', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x03: 2})).to.be.ok;
    });

    it('works (RadioField, off)', async () => {
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).to.be.false;
        expect(wrapper.find('[name="x03"]').at(0).simulate('change', {target: {checked: true}})).to.be.ok;
        expect(wrapper.find('[name="x03"]').at(0).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x03"]').at(1).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x03', 1)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x03: 1})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).to.be.false;
        expect(wrapper.find('[name="x04"]').at(1).simulate('change', {target: {value: true}})).to.be.ok;
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).to.be.true;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x04', [2])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x04: [2]})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, off)', async () => {
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x04"]').at(1).simulate('change', {target: {value: false}})).to.be.ok;
        expect(wrapper.find('[name="x04"]').at(1).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x04', [])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x04: []})).to.be.ok;
    });

    it('works (DateField)', async () => {
        expect(wrapper.find('#x05').props()).to.have.property('value', dateA.toISOString().slice(0, -8));
        expect(wrapper.find('#x05').simulate('change', {target: {valueAsNumber: +dateB}})).to.be.ok;
        expect(wrapper.find('#x05').props()).to.have.property('value', dateB.toISOString().slice(0, -8));

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x05', dateB)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x05: dateB})).to.be.ok;
    });

    it('works (BoolField)', async () => {
        expect(wrapper.find('#x06').prop('checked')).to.be.false;
        expect(wrapper.find('#x06').simulate('change', {target: {value: true}})).to.be.ok;
        expect(wrapper.find('#x06').prop('checked')).to.be.true;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x06', true)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x06: true})).to.be.ok;
    });

    it('works (NestField, TextField)', async () => {
        expect(wrapper.find('#x08y01').props()).to.have.property('value', '');
        expect(wrapper.find('#x08y01').simulate('change', {target: {value: 'x08y01'}})).to.be.ok;
        expect(wrapper.find('#x08y01').props()).to.have.property('value', 'x08y01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x08.y01', 'x08y01')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x08: {y01: 'x08y01'}})).to.be.ok;
    });

    it('works (NestField, NumField)', async () => {
        expect(wrapper.find('#x08y02').props()).to.have.property('value', '0');
        expect(wrapper.find('#x08y02').simulate('change', {target: {value: '2'}})).to.be.ok;
        expect(wrapper.find('#x08y02').props()).to.have.property('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x08.y02', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x08: {y02: 2}})).to.be.ok;
    });

    it('works (NumField, decimal, nullable)', async () => {
        expect(wrapper.find('#x22').props()).to.have.property('value', '0');
        expect(wrapper.find('#x22').simulate('change', {target: {value: ''}})).to.be.ok;
        expect(wrapper.find('#x22').props()).to.have.property('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x22', undefined)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x22: undefined})).to.be.ok;
    });

    it('works (NumField, decimal)', async () => {
        expect(wrapper.find('#x22').props()).to.have.property('value', '');
        expect(wrapper.find('#x22').simulate('change', {target: {value: '2'}})).to.be.ok;
        expect(wrapper.find('#x22').props()).to.have.property('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x22', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x22: 2})).to.be.ok;
    });

    it('works (LongTextField)', async () => {
        expect(wrapper.find('#x25').props()).to.have.property('value', '');
        expect(wrapper.find('#x25').simulate('change', {target: {value: 'x25'}})).to.be.ok;
        expect(wrapper.find('#x25').props()).to.have.property('value', 'x25');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x25', 'x25')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x25: 'x25'})).to.be.ok;
    });

    it('works (ListAddField, one)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onClick).last().simulate('click')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27.0', '')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['']})).to.be.ok;
    });

    it('works (ListAddField, two)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onClick).last().simulate('click')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27.1', '')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['', '']})).to.be.ok;
    });

    it('works (ListDelField)', async () => {
        expect(wrapper.find(ListDelField).at(0).simulate('click')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27', [''])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['']})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        expect(wrapper.find('[name="x31"]').at(0).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x31"]').at(1).prop('checked')).to.be.false;
        expect(wrapper.find('[name="x31"]').at(1).simulate('change', {target: {value: true}})).to.be.ok;
        expect(wrapper.find('[name="x31"]').at(1).prop('checked')).to.be.true;
        expect(wrapper.find('[name="x31"]').at(0).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x31', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x31: 2})).to.be.ok;
    });

    it('works (HiddenField)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find('#x32').props()).to.have.property('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find('#x32').props()).to.have.property('value', 'x32');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x32', 'x32')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x32: 'x32'})).to.be.ok;
    });

    it('works (HiddenField, noDOM)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" noDOM />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find(HiddenField).props()).to.have.property('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find(HiddenField).props()).to.have.property('value', 'x32');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x32', 'x32')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x32: 'x32'})).to.be.ok;
    });

    it('works (ListField, custom children)', async function _ () {
        this.timeout(30000);

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

        expect(() => wrapper.update()).to.throw(/Unsupported field type/);
    });
});
