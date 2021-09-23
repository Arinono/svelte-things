/**
 * At compile time, Using svelte/compiler
 * We can compile the component as an SSR JS module to be later used
 * by 01a-js-no-dep-runtime-render.js
 */

 const fs = require('fs')
 const compiler = require('svelte/compiler')
 
 const result = compiler.compile(
  fs.readFileSync('./twitter-service/tweets-js-dep.svelte').toString(),
  {
    generate: 'ssr'
  }
)
 
fs.writeFileSync('dist/02/tweets.js', result.js.code)

// In another part of the compilation, unrelated to svelte, JS files should be in dist
fs.copyFileSync('./twitter-service/getTweets.action.js', './dist/02/getTweets.action.js')
