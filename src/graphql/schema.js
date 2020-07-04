const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { userType, tweetType } = require('./nodeTypes');
const {
    CreateTweetMutation,
    UpdateTweetMutation,
    DeleteTweetMutation
} = require('./mutation/TweetsMutation');
const _ = require('lodash');

var users = [
    { username: 'User1', password: 'password', userId: '1' },
    { username: 'User2', password: 'password', userId: '2' },
    { username: 'User3', password: 'password', userId: '3' }
];

var tweets = [
    { id: '1', userId: '1', content: 'First Tweet', date: "date" },
    { id: '2', userId: '1', content: 'Second Tweet', date: "date" },
    { id: '3', userId: '2', content: 'Third Tweet', date: "date" },
    { id: '4', userId: '3', content: 'Fourth Tweet', date: "date" },
    { id: '5', userId: '3', content: 'Fifth Tweet', date: "date" },
    { id: '6', userId: '3', content: 'Sixth Tweet', date: "date" }
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tweet: {
            type: tweetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(tweets, { id: args.id });
            }
        },
        user: {
            type: userType,
            args: { username: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(users, { username: args.username });
            }
        },
        tweets: {
            type: new GraphQLList(tweetType),
            resolve(parent, args) {
                return tweets;
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return users;
            }
        }
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createTweet: CreateTweetMutation,
        deleteTweet: DeleteTweetMutation,
        updateTweet: UpdateTweetMutation
    })
});

const schema = new GraphQLSchema({ query: RootQuery });

module.exports = schema;