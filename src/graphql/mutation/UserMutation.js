const { userType } = require('../NodeTypes');
const User = require('../../models/user');
const {
    GraphQLString, GraphQLNonNull
} = require('graphql');

const CreateUserMutation = {
    type: userType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        joinDate: { type: new GraphQLNonNull(GraphQLString) },
        displayName: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString }
    },
    resolve(parent, args) {
        let user = new User({
            username: args.username,
            password: args.password,
            joinDate: args.joinDate,
            displayName: args.displayName,
            picture: args.picture
        });
        return user.save();
    }
}

module.exports = { CreateUserMutation };