const getTweets = {
    addPreview(onPreview) {
        onPreview();
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
        };
    }
};

export { getTweets };
