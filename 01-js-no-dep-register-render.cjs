/**
 * Using the svelte/register
 * We can register a component and render it at runtime
 */

require('svelte/register')

const tweets = require('./twitter-service/tweets-js-no-dep.svelte')

const { head, html, css } = tweets.default.render({
  preview: [{
    content: "yo"
  }, {
    content: "ciao"
  }]
})

console.log({ head, html, css })
