const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const AlbumType = require("./album_type");
const Album = mongoose.model("albums");
const ArtistType = require("./artist_type");
const Artist = mongoose.model("artists");
const LibraryType = require("./library_type");
const Library = mongoose.model("libraries");
const PlaylistType = require("./playlist_type");
const Playlist = mongoose.model("playlists");
const SongType = require("./song_type");
const Song = mongoose.model("songs");
const UserType = require("./user_type");
const User = mongoose.model("users");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    albums: {
      type: new GraphQLList(AlbumType),
      resolve() {
        return Album.find({});
      }
    },
    album: {
      type: AlbumType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Album.findById(args._id);
      }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve() {
        return Artists.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Artist.findById(args._id);
      }
    },
      libraries: {
      type: new GraphQLList(LibraryType),
      resolve() {
        return Library.find({});
      }
    },
    library: {
      type: LibraryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Library.findById(args._id);
      }
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve() {
        return Playlist.find({});
      }
    },
    playlist: {
      type: PlaylistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Playlist.findById(args._id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: new GraphQLList(SongType),
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve() {
        return Song.findById(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;