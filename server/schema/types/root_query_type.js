const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = graphql;

const AlbumType = require("./album_type");
const Album = mongoose.model("albums");
const ArtistType = require("./artist_type");
const Artist = mongoose.model("artists");
const PlaylistType = require("./playlist_type");
const Playlist = mongoose.model("playlists");
const SongType = require("./song_type");
const Song = mongoose.model("songs");
const UserType = require("./user_type");
const User = mongoose.model("users");
const SearchType = require("./search_type");

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
        return Artist.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Artist.findById(args._id);
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
        console.log(_);
        return User.findById(args._id);
      }
    },
    search: {
      type: new GraphQLList(SearchType),
      args: { filter: { type: GraphQLString } },
      resolve: async (_, args) => {
        let album = await Album.find({
          title: { $regex: args.filter, $options: "i" }
        });
        console.log(args.filter);
        let song = await Song.find({
          title: { $regex: args.filter, $options: "i" }
        });
        let playlist = await Playlist.find({
          title: { $regex: args.filter, $options: "i" }
        });
        let artist = await Artist.find({
          name: { $regex: args.filter, $options: "i" }
        });

        return [...song, ...album, ...playlist, ...artist];

      }
    }
  })
});

module.exports = RootQueryType;
