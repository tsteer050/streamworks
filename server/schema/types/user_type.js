const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const User = mongoose.model('users');

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },

    albums: {
      type: new GraphQLList(require("./album_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("albums")
          .then(user => user.albums);
      }
    },
    artists: {
      type: new GraphQLList(require("./artist_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("artists")
          .then(user => user.artists);
      }
    },
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("songs")
          .then(user => user.songs);
      }
    },
    playlists: {
      type: new GraphQLList(require("./playlist_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("playlists")
          .then(user => user.playlists);
      }
    }
  })
});

module.exports = UserType;
