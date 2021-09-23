import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const bdl = await rollup({
  input: [
    './twitter-service/tweets-ts-lang-ts-dep.svelte',
    './twitter-service/getTweets-ts.action.ts'
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        generate: 'ssr',
      },
    }),
    resolve({
      // jail prevents node_modules resolution, or not, depending on what you want here
      jail: 'node_modules',
      // resolveOnly: [/\.\/*/]
    }),
    commonjs(),
    typescript(),
  ]
})

await bdl.write({
  dir: 'dist/04',
  format: 'esm',
  exports: 'auto'
})
