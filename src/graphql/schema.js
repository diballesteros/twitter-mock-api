const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const { userType, tweetType, authDataType } = require('./NodeTypes');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const { CreateUserMutation, CreateTweetMutation, CreateFollowerMutation, CreateLikeMutation, CreateRetweetMutation } = require('./mutation/RootMutations');

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
        },
        login: {
            type: authDataType,
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const userLogin = User.findOne({username: args.username});
                if (!user) {
                    
                }
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: CreateUserMutation,
        createTweet: CreateTweetMutation,
        createFollower: CreateFollowerMutation,
        createLike: CreateLikeMutation,
        createRetweet: CreateRetweetMutation
    })
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: RootMutation });

module.exports = schema;