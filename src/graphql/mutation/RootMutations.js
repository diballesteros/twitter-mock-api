const UserMutation = require('./UserMutation');
const TweetMutation = require('./TweetMutation');
const FollowerMutation = require('./FollowerMutation');
const LikeMutation = require('./LikeMutation');
const RetweetMutation = require('./RetweetMutation');

const RootMutations = {
	...UserMutation,
	...TweetMutation,
	...FollowerMutation,
	...LikeMutation,
	...RetweetMutation,
};

module.exports = RootMutations;
