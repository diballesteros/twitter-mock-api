const { tweetType } = require('../NodeTypes');
const Tweet = require('../../models/tweet');
const {
    GraphQLString, GraphQLID, GraphQLNonNull
} = require('graphql');

const CreateTweetMutation = {
    type: tweetType,
    args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLID) },
        replyTweet: { type: GraphQLID}
    },
    resolve(parents, args) {
        let tweet = new Tweet({
            content: args.content,
            date:  Date.now(),
            user: args.user,
            replyTweet: args.replyTweet
        })
        return tweet.save();
    }
};

module.exports = { CreateTweetMutation };