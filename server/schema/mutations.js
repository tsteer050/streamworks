const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
<<<<<<< HEAD
const AlbumType = require('./types/album_type');
const Album = mongoose.model("albums");
const ArtistType = require('./types/artist_type');
const Artist = mongoose.model("artists");
const LibraryType = require('./types/library_type');
const Library = mongoose.model("libraries");
const PlaylistType = require('./types/playlist_type');
const Playlist = mongoose.model("playlists");
const SongType = require('./types/song_type');
const Song = mongoose.model("songs");
const UserType = require('./types/user_type');
const User = mongoose.model('users');

// add validUser authentication for all mutations using 'ctx' argument
=======
const AlbumType = require("./types/album_type");
const Album = mongoose.model("albums");
const ArtistType = require("./types/artist_type");
const Artist = mongoose.model("artists");
const LibraryType = require("./types/library_type");
const Library = mongoose.model("libraries");
const PlaylistType = require("./types/playlist_type");
const Playlist = mongoose.model("playlists");
const SongType = require("./types/song_type");
const Song = mongoose.model("songs");
const UserType = require("./types/user_type");
const User = mongoose.model("users");
const AuthService = require("../services/auth");

>>>>>>> backend-auth
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newAlbum: {
      type: AlbumType,
      args: {
        title: { type: GraphQLString },
        album_art_url: { type: GraphQLString }
      },
<<<<<<< HEAD
      resolve(_, { title, album_art_url }, ctx) {
=======
      resolve(_, { title, album_art_url }) {
>>>>>>> backend-auth
        return new Album({ title, album_art_url }).save();
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        id: { type: GraphQLID }
      },
<<<<<<< HEAD
      resolve(_, { id }, ctx) {
=======
      resolve(_, { id }) {
>>>>>>> backend-auth
        return Album.remove({ _id: id });
      }
    },
    newArtist: {
      type: ArtistType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        bio: { type: GraphQLString },
        artist_image_url: { type: GraphQLString }
      },
<<<<<<< HEAD
      resolve(_, { name, genre, bio, artist_image_url }, ctx) {
=======
      resolve(_, { name, genre, bio, artist_image_url }) {
>>>>>>> backend-auth
        return new Artist({ name, genre, bio, artist_image_url }).save();
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLID }
      },
<<<<<<< HEAD
      resolve(_, { id }, ctx) {
=======
      resolve(_, { id }) {
>>>>>>> backend-auth
        return Artist.remove({ _id: id });
      }
    },

    // newLibrary: {
    //   type: LibraryType,
    //   args: {
    //   },
    //   resolve(_, {  }) {
    //     return new Library({  }).save();
    //   }
    // },
    deleteLibrary: {
      type: LibraryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
        return Library.remove({ _id: id });
      }
    },
    newPlaylist: {
      type: PlaylistType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(_, { title }) {
        return new Playlist({ title }).save();
      }
    },
    deletePlaylist: {
      type: PlaylistType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
        return Playlist.remove({ _id: id });
      }
    },
    newSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        length: { type: GraphQLInt },
        audio_url: { type: GraphQLString }
      },
      resolve(_, { title, length, audio_url }) {
        return new Song({ title, length, audio_url }).save();
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
        return Song.remove({ _id: id });
      }
    },
<<<<<<< HEAD


  }
});

module.exports = mutation;
=======
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;
>>>>>>> backend-auth
