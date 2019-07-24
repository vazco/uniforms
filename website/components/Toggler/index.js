export function getDefaultToggle(items) {
  const index = items.findIndex(({ active }) => active === true);
  return index > 0 ? index : 0;
}

export { default as TogglerHeader } from './TogglerHeader';
export { default } from './Toggler';
