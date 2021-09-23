/**
 * At compile time, Using svelte/compiler
 * We can compile the component as an SSR JS module to be later used
 * by 01a-js-no-dep-runtime-render.js
 */

const fs = require('fs')
const compiler = require('svelte/compiler')

const result = compiler.compile(
  fs.readFileSync('./twitter-service/tweets-js-no-dep.svelte').toString(),
  {
    generate: 'ssr'
  }
)

fs.writeFileSync('dist/01a/tweets.js', result.js.code)
