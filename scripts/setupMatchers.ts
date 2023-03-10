import matchers, {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- Types workaround.
  namespace Vi {
    interface JestAssertion<T>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers);
