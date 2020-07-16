const { retweetType } = require('../NodeTypes');
const Retweet = require('../../models/like');
const {
    GraphQLID, GraphQLNonNull
} = require('graphql');

module.exports = {
    CreateRetweetMutation: {
        type: retweetType,
        args: {
            userId: { type: new GraphQLNonNull(GraphQLID) },
            tweetId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parents, args) {
            let retweet = new Retweet({
                userId: args.userId,
                tweetId: args.tweetId
            })
            return retweet.save();
        }
    }
};