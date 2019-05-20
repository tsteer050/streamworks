const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Album = mongoose.model('albums');
const ArtistType = require('./artist_type');
const Artist = mongoose.model('artists');

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    album_art_url: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve(parentValue) {
        return Artist.findById(parentValue.artist)
        .then(artist => artist)
        .catch(err => null);
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