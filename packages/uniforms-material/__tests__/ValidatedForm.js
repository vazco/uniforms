import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React       from 'react';
import {mount}     from 'enzyme';
import {PropTypes} from 'react';

import ValidatedForm from 'uniforms-material/ValidatedForm';

import createSchema from './_createSchema';

const createContext = () =>
    ({context: {muiTheme: getMuiTheme()}, childContextTypes: {muiTheme: PropTypes.object.isRequired}});

test('<ValidatedForm> - works', () => {
    const element = <ValidatedForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
