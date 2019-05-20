const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "albums"
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }],
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: "playlists"
  }],
  artists: [{
    type: Schema.Types.ObjectId,
    ref: "artists"
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

});

module.exports = mongoose.model("libraries", LibrarySchema);