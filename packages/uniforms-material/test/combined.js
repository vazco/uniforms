import React      from 'react';
import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';
import {mount}    from 'enzyme';
import {spy}      from 'sinon';
import {stub}     from 'sinon';

import MaterialCheckbox               from 'material-ui/Checkbox';
import MaterialRadio                  from 'material-ui/RadioButton';
import MaterialSelectField            from 'material-ui/SelectField';
import MaterialTextField              from 'material-ui/TextField';
import MaterialToggle                 from 'material-ui/Toggle';
import getMuiTheme                    from 'material-ui/styles/getMuiTheme';
import lightBaseTheme                 from 'material-ui/styles/baseThemes/lightBaseTheme';

import AutoFields     from 'uniforms-material/AutoFields';
import AutoForm       from 'uniforms-material/AutoForm';
import DateField      from 'uniforms-material/DateField';
import ErrorField     from 'uniforms-material/ErrorField';
import ErrorsField    from 'uniforms-material/ErrorsField';
import HiddenField    from 'uniforms-material/HiddenField';
import ListAddField   from 'uniforms-material/ListAddField';
import ListDelField   from 'uniforms-material/ListDelField';
import ListField      from 'uniforms-material/ListField';
import ListItemField  from 'uniforms-material/ListItemField';
import LongTextField  from 'uniforms-material/LongTextField';
import NumField       from 'uniforms-material/NumField';
import SelectField    from 'uniforms-material/SelectField';
import RadioField     from 'uniforms-material/RadioField';
import SubmitField    from 'uniforms-material/SubmitField';
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
        />,
        {
            childContextTypes: {muiTheme: React.PropTypes.object.isRequired},
            context: {muiTheme: getMuiTheme(lightBaseTheme, {userAgent: false})}
        }
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
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x00');

        expect(find().props()).to.have.property('value', 0);
        expect(find().props().onChange({}, 0)).to.equal(undefined);
        expect(find().props()).to.have.property('value', 0);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x00', 0)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x00: 0})).to.be.ok;
    });

    it('works (NumField, invalid)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x00');

        expect(find().props()).to.have.property('value', 0);
        expect(find().props().onChange({}, NaN)).to.equal(undefined);
        expect(find().props()).to.have.property('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x00', undefined)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x00: undefined})).to.be.ok;
    });

    it('works (NumField, step)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x34');

        expect(find().props()).to.have.property('step', 4);
    });

    it('works (TextField)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x01');

        expect(find().props()).to.have.property('value', '');
        expect(find().props().onChange({}, 'x01')).to.equal(undefined);
        expect(find().props()).to.have.property('value', 'x01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x01', 'x01')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x01: 'x01'})).to.be.ok;
    });

    it('works (SelectField)', async () => {
        const find = () => wrapper.find(MaterialSelectField).filterWhere(x => x.props().name === 'x02');

        expect(find().props()).to.have.property('value', '1');
        expect(find().props().onChange({}, 1, '2')).to.equal(undefined);
        expect(find().props()).to.have.property('value', '2');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x02', '2')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x02: '2'})).to.be.ok;
    });

    it('works (RadioField, on)', async () => {
        const find = () => wrapper.find(RadioField).filterWhere(x => x.props().name === 'x03');

        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(1).props().onCheck()).to.equal(undefined);
        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x03', '2')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x03: '2'})).to.be.ok;
    });

    it('works (RadioField, off)', async () => {
        const find = () => wrapper.find(RadioField).filterWhere(x => x.props().name === 'x03');

        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;
        expect(find().props().onChange('1')).to.equal(undefined);
        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x03', '1')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x03: '1'})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        const find = () => wrapper.find(SelectField).filterWhere(x => x.props().name === 'x04');

        expect(find().props()).to.have.property('value').that.is.deep.equal([]);
        expect(find().find(MaterialCheckbox).at(1).props().onCheck()).to.equal(undefined);
        expect(find().props()).to.have.property('value').that.is.deep.equal(['2']);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x04', ['2'])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x04: ['2']})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, off)', async () => {
        const find = () => wrapper.find(SelectField).filterWhere(x => x.props().name === 'x04');

        expect(find().props()).to.have.property('value').that.is.deep.equal(['2']);
        expect(find().find(MaterialCheckbox).at(1).props().onCheck()).to.equal(undefined);
        expect(find().props()).to.have.property('value').that.is.deep.equal([]);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x04', [])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x04: []})).to.be.ok;
    });

    it('works (DateField)', async () => {
        const find = () => wrapper.find(DateField).filterWhere(x => x.props().name === 'x05');
        const input = find().find('TextField').filterWhere(x => x.props().name === 'x05').last();

        expect(find().props()).to.have.property('value').that.is.deep.equal(dateA);
        expect(find().find('TextField').filterWhere(x => x.props().name === 'x05').last().simulate('focus')).to.be.ok;
        expect(input.props().onFocus()).to.equal(undefined);
        expect(find().find('DatePicker').props().onChange({}, dateB)).to.equal(undefined);
        expect(find().find('TimePicker').props().onChange({}, dateB)).to.equal(undefined);
        expect(find().props()).to.have.property('value').that.is.deep.equal(dateB);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x05', dateB)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x05: dateB})).to.be.ok;
    });

    it('works (BoolField)', async () => {
        const find = () => wrapper.find(MaterialToggle).filterWhere(x => x.props().name === 'x06');

        expect(find().props()).to.have.property('toggled', false);
        expect(find().props().onToggle({}, true)).to.equal(undefined);
        expect(find().props()).to.have.property('toggled', true);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x06', true)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x06: true})).to.be.ok;
    });

    it('works (NestField, TextField)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x08.y01');

        expect(find().props()).to.have.property('value', '');
        expect(find().props().onChange({}, 'x08y01')).to.equal(undefined);
        expect(find().props()).to.have.property('value', 'x08y01');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x08.y01', 'x08y01')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x08: {y01: 'x08y01'}})).to.be.ok;
    });

    it('works (NestField, NumField)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x08.y02');

        expect(find().props()).to.have.property('value', 0);
        expect(find().props().onChange({}, 2)).to.equal(undefined);
        expect(find().props()).to.have.property('value', 2);

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x08.y02', 2)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x08: {y02: 2}})).to.be.ok;
    });

    it('works (NumField, decimal, nullable)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x22');

        expect(find().props()).to.have.property('value', 0);
        expect(find().props().onChange({}, undefined)).to.equal(undefined);
        expect(find().props()).to.have.property('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x22', undefined)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x22: undefined})).to.be.ok;
    });

    it('works (NumField, decimal)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x22');

        expect(find().props()).to.have.property('value', '');
        expect(find().props().onChange({}, NaN)).to.equal(undefined);
        expect(find().props()).to.have.property('value', '');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x22', undefined)).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x22: undefined})).to.be.ok;
    });

    it('works (LongTextField)', async () => {
        const find = () => wrapper.find(MaterialTextField).filterWhere(x => x.props().name === 'x25');

        expect(find().props()).to.have.property('value', '');
        expect(find().props().onChange({}, 'x25')).to.equal(undefined);
        expect(find().props()).to.have.property('value', 'x25');

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x25', 'x25')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x25: 'x25'})).to.be.ok;
    });

    it('works (ListAddField, one)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onTouchTap).last().simulate('touchTap')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27.0', '')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['']})).to.be.ok;
    });

    it('works (ListAddField, two)', async () => {
        expect(wrapper.find(ListAddField).findWhere(x => x.props().onClick).last().simulate('touchTap')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27.1', '')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['', '']})).to.be.ok;
    });

    it('works (ListDelField)', async () => {
        expect(wrapper.find(ListDelField).at(0).simulate('touchTap')).to.be.ok;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x27', [''])).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x27: ['']})).to.be.ok;
    });

    it('works (SelectField, checkboxes, multiple, on)', async () => {
        const find = () => wrapper.find(SelectField).filterWhere(x => x.props().name === 'x31');

        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(1).props().onCheck()).to.equal(undefined);
        expect(find().find(MaterialRadio).at(0).prop('checked')).to.be.false;
        expect(find().find(MaterialRadio).at(1).prop('checked')).to.be.true;
        expect(find().find(MaterialRadio).at(2).prop('checked')).to.be.false;

        await new Promise(resolve => setTimeout(resolve, 5));

        expect(onChange.lastCall.calledWith('x31', '2')).to.be.ok;
        expect(onSubmit.lastCall.calledWithMatch({x31: '2'})).to.be.ok;
    });

    it('works (HiddenField)', async () => {
        const wrapperHidden = mount(
            <HiddenField name="x32" value="" />,
            {context: wrapper.instance().getChildContext()}
        );

        expect(wrapperHidden.find(HiddenField).props()).to.have.property('value', '');

        wrapperHidden.setProps({value: 'x32'});

        expect(wrapperHidden.find(HiddenField).props()).to.have.property('value', 'x32');

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
