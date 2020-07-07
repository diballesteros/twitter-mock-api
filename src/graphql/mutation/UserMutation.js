const { userType } = require('../NodeTypes');
const User = require('../../models/user');
const {
    GraphQLString, GraphQLNonNull
} = require('graphql');

const CreateUserMutation = {
    type: userType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        let user = new User({
            username: args.username,
            password: args.password
        });
        return user.save();
    }
}

module.exports = { CreateUserMutation };