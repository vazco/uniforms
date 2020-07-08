import pickBy from 'lodash/pickBy';
import sortedIndex from 'lodash/sortedIndex';
import sortedIndexOf from 'lodash/sortedIndexOf';

import { FilterDOMProps } from '.';

type FilterDOMPropsKeys = keyof FilterDOMProps;

const registered: FilterDOMPropsKeys[] = [];

function filter<T extends object>(props: T) {
  return pickBy(props, filterOne) as Omit<T, FilterDOMPropsKeys>;
}

function filterOne(value: unknown, prop: string) {
  return sortedIndexOf(registered, prop) === -1;
}

function register(...props: FilterDOMPropsKeys[]) {
  props.forEach(prop => {
    if (sortedIndexOf(registered, prop) === -1) {
      registered.splice(sortedIndex(registered, prop), 0, prop);
    }
  });
}

export const filterDOMProps = Object.assign(filter, {
  register,
  registered: registered as readonly FilterDOMPropsKeys[],
});

register(
  // These props are provided by useField directly.
  'changed',
  'error',
  'errorMessage',
  'field',
  'fieldType',
  'fields',
  'initialCount',
  'name',
  'onChange',
  'transform',
  'value',

  // These props are provided by useField through context.state.
  'disabled',
  'label',
  'placeholder',
  'showInlineError',

  // This is used by AutoField.
  'component',

  // These is used by AutoField and bridges.
  'allowedValues',
);
