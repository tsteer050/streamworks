const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const AlbumType = require('./album_type');
const Album = mongoose.model('albums');
const ArtistType = require('./artist_type');
const Artist = mongoose.model('artists');


const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    length: { type: GraphQLInt },
    audio_url: { type: GraphQLString },
    album: {
      type: AlbumType,
      resolve(parentValue) {
        return Album.findById(parentValue.album)
        .then(album => album)
        .catch(err => null);
      }
    },
    artist: {
      type: ArtistType,
      resolve(parentValue) {
        return Artist.findById(parentValue.artist)
        .then(artist => artist)
        .catch(err => null);
      }
    }
  })
});

module.exports = SongType;
