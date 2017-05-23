import {PropTypes} from 'react';

import randomIds from 'uniforms/randomIds';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import createSchema from './_createSchema';

const randomId = randomIds();

const createContext = (schema, context) => ({
    context: {
        uniforms: {
            error: null,
            model: {},
            name:  [],
            onChange () {},

            ...context,

            randomId,
            schema: createSchema(schema),
            state: {
                changedMap: {},

                changed:         false,
                disabled:        false,
                label:           false,
                placeholder:     false,
                showInlineError: false,

                ...context && context.state
            }
        },
        muiTheme: getMuiTheme()
    },
    childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

export default createContext;
