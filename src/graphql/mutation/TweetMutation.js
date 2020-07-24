const { tweetType } = require('../NodeTypes');
const Tweet = require('../../models/tweet');
const { GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = {
	CreateTweetMutation: {
		type: tweetType,
		args: {
			content: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve: async (parents, args, req) => {
			if (!req.isAuth) {
				throw new Error('Unauthenticated');
			}
			const tweet = new Tweet({
				content: args.content,
				date: Date.now(),
				user: req.user,
				replyTweet: args.replyTweet,
			});
			return await tweet.save();
		},
	},
};
