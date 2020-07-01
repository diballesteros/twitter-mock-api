const MongoDbRepo = require('../repository/mongoDbRepository');

class TweetService {
    constructor() {
        this.TweetRepository = new MongoDbRepo('Tweets');
    }

    getallTweets() {
        return this.TweetRepository.getAll();
    }

    updateTweet(_id, opt) {
        return this.TweetRepository.updateOne(_id, opt);
    }

    deleteTweet(_id) {
        return this.TweetRepository.deleteOne(_id);
    }

    createTweet(opt) {
        return this.TweetRepository.create(opt);
    }
}

module.exports = TweetService;