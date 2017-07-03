import PropTypes      from 'prop-types';
import getMuiTheme    from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import tapEventPlugin from 'react-tap-event-plugin';

import randomIds from 'uniforms/randomIds';

import createSchema from './_createSchema';

tapEventPlugin();

const randomId = randomIds();

const createContext = (schema, context) => ({
    context: {
        muiTheme: getMuiTheme(lightBaseTheme, {userAgent: false}),
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
        }
    },
    childContextTypes: {
        muiTheme: PropTypes.object,
        uniforms: PropTypes.object
    }
});

export default createContext;
