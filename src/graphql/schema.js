const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const { userType, tweetType, authDataType } = require('./NodeTypes');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const { CreateUserMutation, CreateTweetMutation, CreateFollowerMutation, CreateLikeMutation, CreateRetweetMutation } = require('./mutation/RootMutations');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args, req) {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated!');
                }  
                return User.findById(req.id);
            }
        },
        tweets: {
            type: new GraphQLList(tweetType),
            resolve: async (parent, args, req) => {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated!');
                }   
                return await Tweet.find({user: req.user});
            }
        },
        login: {
            type: authDataType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const userLogin = await User.findOne({ username: args.username.toLowerCase() });
                    if (!userLogin) {
                        throw new Error('Invalid credentials');
                    }
                    const isEqual = await bcrypt.compare(args.password, userLogin.password);
                    if (!isEqual) {
                        throw new Error('Invalid credentials');
                    }
                    const token = jwt.sign({ user: userLogin.id, username: userLogin.username }, 'somesupersecretkey', {
                        expiresIn: '1h',
                    });
                    return { user: userLogin.id, token: token, tokenExpiration: 1 };
                } catch (err) {
                    throw err;
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