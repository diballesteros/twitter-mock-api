const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { userType, tweetType } = require('./NodeTypes');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const {
    CreateUserMutation
} = require('./mutation/UserMutation');
const { 
    CreateTweetMutation 
} = require('./mutation/TweetMutation');
const { 
    CreateFollowerMutation 
} = require('./mutation/FollowerMutation');
const { CreateLikeMutation } = require('./mutation/LikeMutation');
const { CreateRetweetMutation } = require('./mutation/RetweetMutation');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tweet: {
            type: tweetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Tweet.findById(args.id)
            }
        },
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        tweets: {
            type: new GraphQLList(tweetType),
            resolve(parent, args) {
                return Tweet.find({});
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: CreateUserMutation,
        createTweet: CreateTweetMutation,
        createFollower: CreateFollowerMutation,
        createLike: CreateLikeMutation,
        createRetweet: CreateRetweetMutation
    })
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

module.exports = schema;