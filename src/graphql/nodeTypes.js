const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const tweetType = new GraphQLObjectType({
    name: 'Tweet',
    fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString }
    }
});

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    }
});

module.exports = { tweetType, userType };