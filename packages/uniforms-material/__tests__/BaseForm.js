import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React       from 'react';
import {mount}     from 'enzyme';
import {PropTypes} from 'react';

import BaseForm from 'uniforms-material/BaseForm';

import createSchema from './_createSchema';

const createContext = () => ({context: {muiTheme: getMuiTheme()}, childContextTypes: {muiTheme: PropTypes.object.isRequired}}); // eslint-disable-line max-len

test('<BaseForm> - works', () => {
    const element = <BaseForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(BaseForm)).toHaveLength(1);
});
