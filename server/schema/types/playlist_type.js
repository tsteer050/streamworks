const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Playlist = mongoose.model('playlists');
const UserType = require('./user_type');
const User = mongoose.model('users');

const PlaylistType = new GraphQLObjectType({
  name: "PlaylistType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    songs: {
      type: new GraphQLList(require('./song_type')),
      resolve(parentValue) {
        return Playlist.findById(parentValue.id).populate('songs')
        .then(playlist => playlist.songs);
      }
    },
    owner: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.owner)
        .then(user => user)
        .catch(err => null);
      }
    },
    subscribers: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return Playlist.findById(parentValue.id).populate('users')
        .then(playlist => playlist.subscribers);
      }
    }
  })
});

module.exports = PlaylistType;