const { likeType } = require('../NodeTypes');
const Like = require('../../models/like');
const {
    GraphQLID, GraphQLNonNull
} = require('graphql');

module.exports = {
    CreateLikeMutation: {
        type: likeType,
        args: {
            userId: { type: new GraphQLNonNull(GraphQLID) },
            tweetId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parents, args) {
            let like = new Like({
                userId: args.userId,
                tweetId: args.tweetId
            })
            return like.save();
        }
    }
}