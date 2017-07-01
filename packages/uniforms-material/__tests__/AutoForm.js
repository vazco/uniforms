import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React       from 'react';
import {mount}     from 'enzyme';
import {PropTypes} from 'react';

import AutoForm from 'uniforms-material/AutoForm';

import createSchema from './_createSchema';

const createContext = () => ({context: {muiTheme: getMuiTheme()}, childContextTypes: {muiTheme: PropTypes.object.isRequired}}); // eslint-disable-line max-len

test('<AutoForm> - works', () => {
    const element = <AutoForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(AutoForm)).toHaveLength(1);
});
