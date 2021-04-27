import { FilterDOMProps } from '.';

type FilterDOMPropsKeys = keyof FilterDOMProps;

const registered: FilterDOMPropsKeys[] = [];

export const filterDOMProps = Object.assign(
  function filterDOMProps<T extends object>(props: T) {
    const filteredProps = { ...props };
    for (const prop in props) {
      if (registered.includes(prop as any)) {
        delete filteredProps[prop];
      }
    }

    return filteredProps as Omit<T, FilterDOMPropsKeys>;
  },
  {
    register(...props: FilterDOMPropsKeys[]) {
      props.forEach(prop => {
        if (!registered.includes(prop)) {
          registered.push(prop);
        }
      });

      props.sort();
    },
    registered: registered as readonly FilterDOMPropsKeys[],
  },
);

filterDOMProps.register(
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
