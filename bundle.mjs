// @ts-check
import { rollup } from 'rollup';
import svelteCompiler from 'svelte/compiler';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svelteRollup from 'rollup-plugin-svelte';
import glob from "glob"
import path from 'path'

svelteCompiler.preprocess()
// import "node"

// TODO:
/*

1. Check that compiling a svelte file can later be required for SSR (with our constraints)
    'svelte/register' => cmpt.default.render({ props }) => { html, css, head }
1.a. Try to do this but without requiring svelte as an SSR rendering dependency (no `svelte/register`)
2. Same thing, but with a external js function call
3. Same thing, but with a < lang="ts">
4. Same thing, but with an external ts function call

*/

glob('**/*.svelte', {}, async (err, files) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  /** @type { any[] } */
  const bundles = []

  for (const svelteFile of files) {
    const maybeBundle = await tryBundleSvelte(svelteFile).catch((err) => {
      if (err instanceof NotAPreviewSvelteFile) {
        return Promise.resolve(null)
        // ignore
      } else {
        return Promise.reject(err)
      }
    })
    
    if (maybeBundle) {
      bundles.push(maybeBundle)
    }
  }

  console.log(bundles)
})

class NotAPreviewSvelteFile extends Error {
  constructor() {
    super('Could not use onPreview export properly (is probably the error)')
    this.name = NotAPreviewSvelteFile.name
  }
}

async function tryBundleSvelte(filePath) {
  const outputDir = path.resolve(filePath, "../../previews")
  console.log("out dir", outputDir, "for", filePath)
  const outputFile = path.resolve(outputDir, "./1.js");

  const bundle = await rollup({
    input: filePath,
    external: (
			source,
			importer,
			isResolved,
	  ) => {
      console.log({ source, importer })
      return !/.*\.svelte$/.test(source)
    },
    plugins: [
      svelteRollup({
        preprocess: autoPreprocess(),
        compilerOptions: {
          // format: "",
          generate: "ssr",
          sourcemap: true,
          outputFilename: outputFile,
          hydratable: true,
        }

        // // we'll extract any component CSS out into
        // // a separate file — better for performance
        // css: css => {
        //   css.write('public/build/bundle.css');
        // }
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      nodeResolve(),
      commonjs(),
      typescript({ sourceMap: true })
    ]
  })

  /** @type {import("rollup").OutputChunk} */
  const chunk = (await bundle.generate({
    file: outputFile,
    // dir: outputDir
  })).output[0]


  chunk.code
}
