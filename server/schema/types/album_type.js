const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Album = mongoose.model('albums');

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    album_art_url: { type: GraphQLString },
    artist: {
      type: new GraphQLList(require('./artist_type')),
      resolve(parentValue) {
        return Album.findById(parentValue.id).populate("artists")
        .then(album => album.artist);
      }
    },
    songs: {
      type: new GraphQLList(require('./song_type')), 
      resolve(parentValue) {
        return Album.findById(parentValue.id).populate("songs")
        .then(album => album.songs);
      }
    }
  })
});

module.exports = AlbumType;