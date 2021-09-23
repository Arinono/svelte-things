import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess'
import { transformSync } from 'esbuild'
import fs from 'fs'

const bdl = await rollup({
  input: './twitter-service/tweets-ts-lang-js-dep.svelte',
  external: (source, importer, isResolved) => {
    return !/.*\.svelte$/.test(source)
  },
  plugins: [
    svelte({
      // esbuild
      preprocess: sveltePreprocess({
        typescript({ content }) {
          const { code, map } = transformSync(content, {
            loader: 'ts'
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
  file: 'dist/03/tweets.js'
})

// In another part of the compilation, unrelated to svelte, JS files should be in dist
fs.copyFileSync('./twitter-service/getTweets.action.js', './dist/03/getTweets.action.js')

