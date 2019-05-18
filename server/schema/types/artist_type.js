const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Artist = mongoose.model('artists');

const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    bio: { type: GraphQLString },
    artist_image_url: { type: GraphQLString },
    albums: {
      type: new GraphQLList(require('./album_type')),
      resolve(parentValue) {
        return Artist.findById(parentValue.id).populate('albums')
        .then(artist => artist.albums);
      }
    },
    songs: {
      type: new GraphQLList(require('./song_type')),
      resolve(parentValue) {
        return Artist.findById(parentValue.id).populate('songs')
        .then(artist => artist.songs);
      }
    }
  })
});

module.exports = ArtistType;