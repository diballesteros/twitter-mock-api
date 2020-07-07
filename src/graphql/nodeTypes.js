const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const _ = require('lodash');
const User = require('../models/user');
const Tweet = require('../models/tweet');

const tweetType = new GraphQLObjectType({
    name: 'Tweet',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
    })
});

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        tweets: {
            type: new GraphQLList(tweetType),
            resolve(parent, args) {
                return Tweet.find({ userId: parent.id })
            }
        }
    })
});

module.exports = { userType, tweetType };