const mongoose = require("mongoose");
const { GraphQLUnionType, GraphQLObjectType, GraphQLList } = require("graphql");
const AlbumType = require("./album_type");
const Album = mongoose.model("albums");
const ArtistType = require("./artist_type");
const Artist = mongoose.model("artists");
const PlaylistType = require("./playlist_type");
const Playlist = mongoose.model("playlists");
const SongType = require("./song_type");
const Song = mongoose.model("songs");

const SearchType = new GraphQLUnionType({
  name: "Search",
  types: [AlbumType, ArtistType, PlaylistType, SongType],
  resolveType(value) {
    if (value instanceof Album) {
      return AlbumType;
    }
    if (value instanceof Artist) {
      return ArtistType;
    }
    if (value instanceof Playlist) {
      return PlaylistType;
    }
    if (value instanceof Song) {
      return SongType;
    }
  }
});

module.exports = SearchType;
