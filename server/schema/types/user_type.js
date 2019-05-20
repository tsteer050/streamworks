const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const LibraryType = require("./library_type");
const Library = mongoose.model("libraries");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
    // library: {
    //   type: LibraryType,
    //   resolve(parentValue) {
    //     return Library.findById(parentValue.library)
    //     .then(library => library)
    //     .catch(err => null);
    //   }
    // }
  })
});

module.exports = UserType;
