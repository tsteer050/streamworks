
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }],
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = mongoose.model("playlists", PlaylistSchema);
