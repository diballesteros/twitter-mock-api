const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { TweetsQuery } = require('./query/TweetsQuery');
const {
    CreateTweetMutation,
    UpdateTweetMutation,
    DeleteTweetMutation
} = require('./mutation/TweetsMutation');

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        tweets: TweetsQuery
    })
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createTweet: CreateTweetMutation,
        deleteTweet: DeleteTweetMutation,
        updateTweet: UpdateTweetMutation
    })
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;