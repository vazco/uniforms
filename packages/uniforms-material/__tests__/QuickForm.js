import React       from 'react';
import {mount}     from 'enzyme';
import {PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import QuickForm from 'uniforms-material/QuickForm';

import createSchema from './_createSchema';

const createContext = () => ({context: {muiTheme: getMuiTheme()},childContextTypes: {muiTheme: PropTypes.object.isRequired}}); // eslint-disable-line max-len

test('<QuickForm> - renders', () => {
    const element = <QuickForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper).toHaveLength(1);
});
