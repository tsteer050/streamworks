const { GraphQLUnionType } = require("graphql");

const AlbumType = require("./album_type");
const ArtistType = require("./artist_type");
const PlaylistType = require("./playlist_type");
const SongType = require("./song_type");

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
    // if (value instanceof Playlist) {
    //   return PlaylistType;
    // }
    // if (value instanceof Song) {
    //   return SongType;
    // }
  }
});

module.exports = SearchType;
