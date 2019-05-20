const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const AlbumType = require('./types/album_type');
const Album = mongoose.model("albums");
const ArtistType = require('./types/artist_type');
const Artist = mongoose.model("artists");
const PlaylistType = require('./types/playlist_type');
const Playlist = mongoose.model("playlists");
const SongType = require('./types/song_type');
const Song = mongoose.model("songs");
const UserType = require('./types/user_type');
const User = mongoose.model('users');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newAlbum: {
      type: AlbumType,
      args: {
        title: { type: GraphQLString },
        album_art_url: { type: GraphQLString }
      },
      resolve(_, { title, album_art_url }) {
        return new Album({ title, album_art_url }).save();
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
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
        return Album.addSong( albumId, songId );
      }
    },
    removeAlbumSong: {
      type: AlbumType,
      args: {
        albumId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { albumId, songId }) {
        return Album.removeSong( albumId, songId );
      }
    },
    updateAlbumArtist: {
      type: AlbumType,
      args: {
        albumId: { type: GraphQLID },
        artistId: { type: GraphQLID }
      },
      resolve(_, { albumId, artistId }) {
        return Album.updateArtist( albumId, artistId );
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
      resolve(_, { name, genre, bio, artist_image_url }) {
        return new Artist({ name, genre, bio, artist_image_url }).save();
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
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
    addPlaylistSubscriber: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID }, 
        subscriberId: { type: GraphQLID }
      },
      resolve(_, { playlistId, subscriberId }) {
        return Playlist.addSubscriber(playlistId, subscriberId);
      }
    },
    removePlaylistSubscriber: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        subscriberId: { type: GraphQLID }
      },
      resolve(_, { playlistId, subscriberId }) {
        return Playlist.removeSubscriber(playlistId, subscriberId);
      }
    },
    updatePlaylistOwner: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID }, 
        ownerId: { type: GraphQLID }
      },
      resolve(_, { playlistId, ownerId }) {
        return Playlist.updateOwner(playlistId, ownerId);
      }
    },
    addPlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID }, 
        songId: { type: GraphQLID }
      },
      resolve(_, { playlistId, songId }) {
        return Playlist.addSong(playlistId, songId);
      }
    },
    removePlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { playlistId, songId }) {
        return Playlist.removeSong(playlistId, songId);
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
    updateSongArtist: {
      type: SongType,
      args: {
        songId: { type: GraphQLID },
        artistId: { type: GraphQLID }
      },
      resolve(_, { songId, artistId }) {
        return Song.updateArtist(songId, artistId);
      }
    },
  }
});

module.exports = mutation;