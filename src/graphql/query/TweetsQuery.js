const { tweetType, userType } = require('../nodeTypes');
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const TweetService = require('../../services/TweetService');

const TweetsQuery = {
    type: GraphQLList(tweetType),
    args: {},
    resolve: async () => {
        const tweetService = new TweetService();
        const tweets = await tweetService.getAllTweets();

        return tweets;
    }
};

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: {id: {type: GraphQLID}}
        }
    }
});

module.exports = { TweetsQuery };