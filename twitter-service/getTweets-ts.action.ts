// client type
type Tweet = {
  content: string
}


export const getTweets = {
  addPreview(onPreview: (...args: any) => any): {
    outputs: {
      tweets: { whateverListThing: string, list: any[] }
    },
    preview: Tweet[]
  } {
    onPreview()
    return {
      outputs: {
        tweets: {
          whateverListThing: 'list',
          list: []
        }
      },
      preview: [{
        content: 'coucou'
      }]
    }
  }
}
