const mongoose = require("mongoose");
const graphql = require("graphql");
<<<<<<< HEAD
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const LibraryType = require('./library_type');
const Library = mongoose.model('libraries');
=======
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const LibraryType = require("./library_type");
const Library = mongoose.model("libraries");
>>>>>>> backend-auth

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
<<<<<<< HEAD
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
=======
    library: {
      type: LibraryType,
      resolve(parentValue) {
        return Library.findById(parentValue.library)
          .then(library => library)
          .catch(err => null);
      }
    },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
>>>>>>> backend-auth
