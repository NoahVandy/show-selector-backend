const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("friends");
        return userData;
      }
    },
    users: async () => {
      return User.find().select(`-__v, -password`).populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select(`-__v -password`)
        .populate("show")
        .populate("friends");
    },
  },
  Mutation: {
    AddUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    RemoveUser: async (parent, args) => {
      const user = await User.findOneAndRemove({ _id: args.id });

      return { user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials!");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $addToSet: {
              friends: friendId,
            },
          },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You must be signed in!");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              friends: friendId,
            },
          },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You must be signed in!");
    },
    SaveShow: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $addToSet: {
              savedShows: args.show,
            },
          }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    RemoveShow: async (parent, { showId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $pull: {
            savedShows: {
              showId: showId,
            },
          },
        },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
