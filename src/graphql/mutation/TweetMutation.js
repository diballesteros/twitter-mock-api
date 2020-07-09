const { tweetType } = require('../NodeTypes');
const Tweet = require('../../models/tweet');
const {
    GraphQLString, GraphQLID, GraphQLNonNull
} = require('graphql');

const CreateTweetMutation = {
    type: tweetType,
    args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        replyTweetId: { type: GraphQLID}
    },
    resolve(parents, args) {
        let tweet = new Tweet({
            content: args.content,
            date: args.date,
            userId: args.userId,
            replyTweetId: args.replyTweetId
        })
        return tweet.save();
    }
};

module.exports = { CreateTweetMutation };