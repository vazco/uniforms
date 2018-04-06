// @flow

const unwantedProps = [
    // These props are provided by BaseField
    'changed',
    'changedMap',
    'disabled',
    'error',
    'errorMessage',
    'field',
    'fieldType',
    'fields',
    'findError',
    'findField',
    'findValue',
    'initialCount',
    'label',
    'name',
    'onChange',
    'parent',
    'placeholder',
    'showInlineError',
    'transform',
    'value',

    // These are used by AutoField
    'allowedValues',
    'component'
];

// Some benchmarks
// https://albertxing.com/stool/#bb5cbc0441ad7ac47602694f6c7183b4
export default function filterDOMProps (props: {}) {
    const filteredProps = {};

    for (const prop in props) {
        if (unwantedProps.indexOf(prop) === -1) {
            filteredProps[prop] = props[prop];
        }
    }

    return filteredProps;
}

// Bridges have to register additional props
filterDOMProps.register = (...props) => {
    props.forEach(prop => {
        if (unwantedProps.indexOf(prop) === -1) {
            unwantedProps.push(prop);
        }
    });
};

// It might be handy at some point
filterDOMProps.registered = unwantedProps;
