const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const AlbumType = require("./types/album_type");
const Album = mongoose.model("albums");
const ArtistType = require("./types/artist_type");
const Artist = mongoose.model("artists");
const PlaylistType = require("./types/playlist_type");
const Playlist = mongoose.model("playlists");
const SongType = require("./types/song_type");
const Song = mongoose.model("songs");
const UserType = require("./types/user_type");
const User = mongoose.model("users");
const AuthService = require("../services/auth");

//Remove this comment!

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newAlbum: {
      type: AlbumType,
      args: {
        title: { type: GraphQLString },
        album_art_url: { type: GraphQLString }
      },

      resolve(_, { title, album_art_url }, ctx) {
        return new Album({ title, album_art_url }).save();
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        id: { type: GraphQLID }
      },

      resolve(_, { id }, ctx) {
        return Album.remove({ _id: id });
      }
    },
    addAlbumSong: {
      type: AlbumType,
      args: {
        albumId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { albumId, songId }) {
        return Album.addSong(albumId, songId);
      }
    },
    removeAlbumSong: {
      type: AlbumType,
      args: {
        albumId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { albumId, songId }) {
        return Album.removeSong(albumId, songId);
      }
    },
    updateAlbumArtist: {
      type: AlbumType,
      args: {
        albumId: { type: GraphQLID },
        artistId: { type: GraphQLID }
      },
      resolve(_, { albumId, artistId }) {
        return Album.updateArtist(albumId, artistId);
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

      resolve(_, { name, genre, bio, artist_image_url }, ctx) {
        return new Artist({ name, genre, bio, artist_image_url }).save();
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }, ctx) {
        return Artist.remove({ _id: id });
      }
    },
    addArtistALbum: {
      type: ArtistType,
      args: {
        artistId: { type: GraphQLID },
        albumId: { type: GraphQLID }
      },
      resolve(_, { artistId, albumId }) {
        return Artist.addAlbum(artistId, albumId);
      }
    },
    removeArtistAlbum: {
      type: ArtistType,
      args: {
        artistId: { type: GraphQLID },
        albumId: { type: GraphQLID }
      },
      resolve(_, { artistId, albumId }) {
        return Artist.removeAlbum(artistId, albumId);
      }
    },
    newPlaylist: {
      type: PlaylistType,
      args: {
        title: { type: GraphQLString }
      },
      async resolve(_, { title }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return new Playlist({ title }).save();
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    deletePlaylist: {
      type: PlaylistType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(_, { id }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return Playlist.remove({ _id: id });
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    addPlaylistSubscriber: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        subscriberId: { type: GraphQLID }
      },
      async resolve(_, { playlistId, subscriberId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return Playlist.addSubscriber(playlistId, subscriberId);
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    removePlaylistSubscriber: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        subscriberId: { type: GraphQLID }
      },
      async resolve(_, { playlistId, subscriberId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return Playlist.removeSubscriber(playlistId, subscriberId);
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    updatePlaylistOwner: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        ownerId: { type: GraphQLID }
      },
      async resolve(_, { playlistId, ownerId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our product is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return Playlist.updateOwner(playlistId, ownerId);
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    addPlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      async resolve(_, { playlistId, songId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our product is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return Playlist.addSong(playlistId, songId);
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
      }
    },
    removePlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      async resolve(_, { playlistId, songId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our product is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return Playlist.removeSong(playlistId, songId);
        } else {
          throw new Error(
            "Sorry, you need to be logged in to perform this action."
          );
        }
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
    updateSongAlbum: {
      type: SongType,
      args: {
        songId: { type: GraphQLID },
        albumId: { type: GraphQLID }
      },
      resolve(_, { songId, albumId }) {
        return Song.updateAlbum(songId, albumId);
      }
    },

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
      async resolve(_, { _id }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our product is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return AuthService.logout(args);
        } else {
          throw new Error("Not logged in.");
        }
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
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
    },
    addUserAlbum: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        albumId: { type: GraphQLID }
      },
      resolve(_, { userId, albumId }) {
        return User.addAlbum(userId, albumId);
      }
    },
    removeUserAlbum: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        albumId: { type: GraphQLID }
      },
      resolve(_, { userId, albumId }) {
        return User.removeAlbum(userId, albumId);
      }
    },
  }
});

module.exports = mutation;
