const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }
  type Show {
    _id: ID!
    showId: ID
    name: String
    description: String
    imageSrc: String
  }
  type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    savedShows: [Show!]
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }
  input showInput {
    showId: ID!
    name: String!
    description: String!
    imageSrc: String!
  }
  type Mutation {
    AddUser(username: String!, email: String!, password: String!): Auth
    RemoveUser(id: String): User
    login(email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    SaveShow(show: showInput): User
    RemoveShow(showId: ID!): User
  }
`;

module.exports = typeDefs;
