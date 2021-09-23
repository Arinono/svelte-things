/**
 * At runtime, we can import SSR generated component to render it
 * with props
 */

import tweets from './dist/01a/tweets.js'

const { head, html, css } = tweets.render({
  preview: [{
    content: "yo"
  }, {
    content: "ciao"
  }]
})

console.log({ head, html, css })

