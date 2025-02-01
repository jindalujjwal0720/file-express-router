import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['exports/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  splitting: true,
  minify: true,
});
