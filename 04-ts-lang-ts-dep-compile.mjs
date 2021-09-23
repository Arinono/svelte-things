import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess'
import { transformSync } from 'esbuild'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const svelteTs = sveltePreprocess.typescript

// Should be taken care of by our other build steps, doing it here
// to shown off
const ts = await rollup({
  input: './twitter-service/getTweets-ts.action.ts',
  plugins: [
    typescript()
  ]
})

await ts.write({
  dir: './dist/04'
})

// end no need

const bdl = await rollup({
  input: './twitter-service/tweets-ts-lang-ts-dep.svelte',
  external: (source, importer, isResolved) => {
    return !/.*\.svelte$/.test(source)
  },
  plugins: [
    // nodeResolve(),
    // commonjs(),
    svelte({
      // sveltePreprocess

      // preprocess: [
      //   svelteTs({
      //     compilerOptions: {
      //       "moduleResolution": "node",
      //       "allowJs": true
      //     }
      //   })
      // ],

      // esbuild
      preprocess: sveltePreprocess({
        typescript({ content }) {
          const { code, map } = transformSync(content, {
            loader: 'ts',
          })
          return { code, map }
        }
      }),
      compilerOptions: {
        generate: 'ssr'
      }
    }),
  ]
})

await bdl.write({
  file: 'dist/04/tweets.js'
})
