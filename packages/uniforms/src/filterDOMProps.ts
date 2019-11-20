import omit from 'lodash/omit';

const registered = [
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
  'component',
];

function filter(props: {}) {
  return omit(props, registered);
}

function register(...props: string[]) {
  props.forEach(prop => {
    if (!registered.includes(prop)) {
      registered.push(prop);
    }
  });
}

export default Object.assign(filter, { register, registered });
