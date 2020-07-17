const { tweetType } = require('../NodeTypes');
const Tweet = require('../../models/tweet');
const {
    GraphQLString, GraphQLID, GraphQLNonNull
} = require('graphql');

module.exports = {
    CreateTweetMutation: {
        type: tweetType,
        args: {
            content: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parents, args) {
            let tweet = new Tweet({
                content: args.content,
                date:  Date.now(),
                user: '5f0659c70f8d332174afaf38',
                replyTweet: args.replyTweet
            })
            return tweet.save();
        }
    }
};