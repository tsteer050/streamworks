const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Library = mongoose.model('libraries');
const UserType = require('./user_type');
const User = mongoose.model('users');

const LibraryType = new GraphQLObjectType({
  name: "LibraryType",
  fields: () => ({
    _id: { type: GraphQLID },
    albums: {
      type: new GraphQLList(require('./album_type')),
      resolve(parentValue) {
        return Library.findById(parentValue.id).populate('albums')
        .then(library => library.albums);
      }
    },
    artists: {
      type: new GraphQLList(require('./artist_type')),
      resolve(parentValue) {
        return Library.findById(parentValue.id).populate('artists')
        .then(library => library.artists);
      }
    },
    songs: {
      type: new GraphQLList(require('./song_type')),
      resolve(parentValue) {
        return Library.findById(parentValue.id).populate('songs')
          .then(library => library.songs);
      }
    },
    playlists: {
      type: new GraphQLList(require('./playlist_type')),
      resolve(parentValue) {
        return Library.findById(parentValue.id).populate('playlists')
          .then(library => library.playlists);
      }
    }, user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
        .then(user => user)
        .catch(err => null);
      }
    }
  })
});

module.exports = LibraryType;