// -Album
//   - Artist
//   - Title
//   - Songs
//   - Art

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }],
  title: {
    type: String,
    required: true
  },
  album_art_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("albums", AlbumSchema);
