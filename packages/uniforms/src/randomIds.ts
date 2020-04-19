// Workaround for SSR
// https://github.com/vazco/uniforms/issues/40
// https://github.com/facebook/react/issues/4000
function randomIdsGenerator(prefix: string) {
  let counter = 0;

  return () => `${prefix}-${('000' + (counter++).toString(36)).slice(-4)}`;
}

const randomIdPrefix = randomIdsGenerator('uniforms');

export function randomIds(prefix = randomIdPrefix()) {
  return randomIdsGenerator(prefix);
}
