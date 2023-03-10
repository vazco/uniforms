import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { target: `node${process.version.slice(1)}` },
  test: {
    alias: [
      {
        find: /^meteor\/([^:]*):(.*)$/,
        replacement: resolve('packages/uniforms/__mocks__/meteor/$1_$2.ts'),
      },
      {
        find: /^meteor\/([^:]*)$/,
        replacement: resolve('packages/uniforms/__mocks__/meteor/$1.ts'),
      },
      {
        find: /^simpl-schema$/,
        replacement: resolve('node_modules/simpl-schema'),
      },
      {
        find: /^uniforms\/__suites__$/,
        replacement: resolve('packages/uniforms/__suites__'),
      },
      {
        find: /^uniforms([^/]*)(.*)$/,
        replacement: resolve('packages/uniforms$1/src$2'),
      },
    ],
    coverage: {
      include: ['packages/*/src/*.{ts,tsx}'],
      provider: 'istanbul',
      reporter: ['html', 'lcovonly', 'text-summary'],
    },
    include: ['**/__tests__/[^_]*'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./scripts/setupEnzyme.ts', './scripts/setupMatchers.ts'],
  },
});
