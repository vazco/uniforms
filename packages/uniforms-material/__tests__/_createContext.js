import PropTypes from 'prop-types';

import randomIds from 'uniforms/randomIds';

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
        }
    },
    childContextTypes: {
        uniforms: PropTypes.object
    }
});

export default createContext;
