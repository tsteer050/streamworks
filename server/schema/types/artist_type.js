const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    bio: { type: GraphQLString },
    artist_image_url: { type: GraphQLString }
  })
})

module.exports = ArtistType;