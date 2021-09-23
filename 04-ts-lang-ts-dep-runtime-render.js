import tweets from './dist/04/tweets.js'

const { head, html, css } = tweets.render({
  onPreview: () => {
    console.log('ONPREVIEW')
  }
})

console.log({ head, html, css })
