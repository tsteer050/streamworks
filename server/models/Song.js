const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "albums"
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  },
  title: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  audio_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("songs", SongSchema);