export const getTweets = {
  addPreview(onPreview) {
    onPreview()
    return {
      outputs: [],
      preview: [{
        content: 'coucou'
      }]
    }
  }
}
