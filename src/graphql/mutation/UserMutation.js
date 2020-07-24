const bcrypt = require('bcrypt');
const { userType } = require('../NodeTypes');
const User = require('../../models/user');
const { GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = {
	CreateUserMutation: {
		type: userType,
		args: {
			username: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) },
			displayName: { type: new GraphQLNonNull(GraphQLString) },
			picture: { type: GraphQLString },
		},
		resolve: async (parents, args) => {
			try {
				const userExists = await User.findOne({
					username: args.username.toLowerCase(),
				});
				if (userExists) {
					throw new Error('User exists already');
				}
				const hashedPassword = await bcrypt.hash(args.password, 12);
				const user = new User({
					username: args.username.toLowerCase(),
					password: hashedPassword,
					joinDate: Date.now(),
					displayName: args.displayName,
					picture: args.picture,
				});
				return await user.save();
			} catch (err) {
				throw err;
			}
		},
	},
};
