const { followerType } = require('../NodeTypes');
const Follower = require('../../models/follower');
const {
    GraphQLID, GraphQLNonNull
} = require('graphql');

module.exports = {
    CreateFollowerMutation: {
        type: followerType,
        args: {
            userId: { type: new GraphQLNonNull(GraphQLID) },
            followerUserId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parents, args) {
            let follower = new Follower({
                userId: args.userId,
                followerUserId: args.followerUserId
            })
            return follower.save();
        }
    }
}