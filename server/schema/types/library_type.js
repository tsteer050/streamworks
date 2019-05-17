const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const LibraryType = new GraphQLObjectType({
  name: "LibraryType",
  fields: () => ({
    _id: { type: GraphQLID },
  })
});

module.exports = LibraryType;