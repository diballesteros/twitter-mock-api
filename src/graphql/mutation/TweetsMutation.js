/* eslint-disable no-unused-vars */
const { tweetType } = require('../nodeTypes');
const {
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID
} = require('graphql');
const TweetService = require('../../services/TweetService');

const CreateTweetMutation = {
    type: tweetType,
    args: {
        content: { type: GraphQLString }
    },
    resolve: async (_, { content }) => {
        const tweetService = new TweetService();
        const newNote = await tweetService.createTweet({ content });

        return newNote;
    }
};

const DeleteTweetMutation = {
    type: GraphQLID,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: async (_, { _id }) => {
        const tweetService = new TweetService();
        const res = await tweetService.deleteTweet(_id);

        if (res.ok) {
            return _id;
        }
    }
};

const UpdateTweetMutation = {
    type: tweetType,
    args: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString }
    },
    resolve: async (_, { _id, content }) => {
        const tweetService = new TweetService();
        const updatedTweet = await tweetService.updateTweet(_id, { content });

        return updatedTweet;
    }
};

module.exports = { CreateTweetMutation, UpdateTweetMutation, DeleteTweetMutation };