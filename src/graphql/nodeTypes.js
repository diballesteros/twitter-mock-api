const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const User = require('../models/user');
const Tweet = require('../models/tweet');
const Follower = require('../models/follower');
const Like = require('../models/like');
const Retweet = require('../models/retweet');

const tweetType = new GraphQLObjectType({
    name: 'Tweet',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
        replyTweet: { type: GraphQLID },
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.user);
            }
        },
        likes: {
            type: new GraphQLList(likeType),
            resolve(parent, args) {
                return Like.find({ tweetId: parent.id });
            }
        },
        retweets: {
            type: new GraphQLList(retweetType),
            resolve(parent, args) {
                return Retweet.find({ tweetId: parent.id });
            }
        },
        replies: {
            type: new GraphQLList(tweetType),
            resolve(parent, args) {
                return Tweet.find({ replyTweetId: parent.id });
            }
        }
    })
});

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        joinDate: { type: GraphQLString },
        displayName: { type: GraphQLString },
        picture: { type: GraphQLString },
        tweets: {
            type: new GraphQLList(tweetType),
            resolve(parent, args) {
                return Tweet.find({ user: parent.id });
            }
        },
        followers: {
            type: new GraphQLList(followerType),
            resolve(parent, args) {
                return Follower.find({ userId: parent.id });
            }
        },
        following: {
            type: new GraphQLList(followerType),
            resolve(parent, args) {
                return Follower.find({ userId: parent.id });
            }
        }
    })
});

const followerType = new GraphQLObjectType({
    name: 'Follower',
    fields: () => ({
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.user)
            }
        },
        follower: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.follower)
            }
        }
    })
});

const likeType = new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        tweet: {
            type: tweetType,
            resolve(parent, args) {
                return Tweet.findById(parent.tweetId)
            }
        }
    })
});

const retweetType = new GraphQLObjectType({
    name: 'Retweet',
    fields: () => ({
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        tweet: {
            type: tweetType,
            resolve(parent, args) {
                return User.findById(parent.tweetId)
            }
        }
    })
});

const authDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLInt },
        user: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.user);
            }
        }
    })
})

module.exports = { userType, tweetType, followerType, likeType, retweetType, authDataType };