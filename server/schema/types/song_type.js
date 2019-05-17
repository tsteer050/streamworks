const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    length: { type: GraphQLInt },
    audio_url: { type: GraphQLString }
  })
});

module.exports = SongType;
