export const skipTestIf = (condition?: boolean) =>
  condition ? test.skip : test;
