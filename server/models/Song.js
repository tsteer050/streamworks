const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "albums"
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

SongSchema.statics.updateAlbum = (songId, albumId) => {
  const Song = mongoose.model('songs');
  const Album = mongoose.model('albums');

  return Song.findById(songId).then(song => {
    if (song.album) {
      Album.findById(song.album).then(oldAlbum => {
        oldAlbum.songs.pull(song);
        return oldAlbum.save();
      });
    }
    return Album.findById(albumId).then(album => {
      album.songs.push(song);
      song.album = album;

      return Promise.all([song.save(), album.save()]).then(
        ([song, album]) => song
      );
    });
  });
};

module.exports = mongoose.model("songs", SongSchema);