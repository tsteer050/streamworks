// -Artist
//   - Name
//   - Albums
//   - Songs
//   - Genre
//   - Bio
//   - picture

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "albums"
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }],
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  artist_image_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("artists", ArtistSchema);
