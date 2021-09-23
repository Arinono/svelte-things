import tweets from './dist/02/tweets.js'

const { head, html, css } = tweets.render({
  onPreview: () => {
    console.log('ONPREVIEW')
  }
})

console.log({ head, html, css })

