// @flow
import omit from 'lodash/omit';

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
  'submitting',
  'transform',
  'validating',
  'value',

  // These are used by AutoField
  'allowedValues',
  'component'
];

export default function filterDOMProps(props: {}) {
  return omit(props, unwantedProps);
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
