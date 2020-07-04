const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
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

const tweetType = new GraphQLObjectType({
    name: 'Tweet',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return _.find(users, { userId: parent.userId });
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
                return _.filter(tweets, { userId: parent.userId});
            }
        }
    })
});

module.exports = { userType, tweetType };