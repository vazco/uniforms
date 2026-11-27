/**
 * Merges the default props of a single MUI slot with the ones passed in
 * `slotProps[slot]`, which can be either an object or a function of the owner
 * state. Passed props take precedence over the defaults.
 */
export default function mergeSlotProps<T>(defaults: object, override: T): T {
  if (typeof override === 'function') {
    return ((ownerState: unknown) => ({
      ...defaults,
      ...override(ownerState),
    })) as T;
  }

  return { ...defaults, ...(override as object | undefined) } as T;
}
