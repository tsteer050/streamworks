
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

AlbumSchema.statics.updateArtist = (albumId, artistId) => {
  const Album = mongoose.model("albums");
  const Artist = mongoose.model("artists");

  return Album.findById(albumId).then(album => {
    if (album.artist) {
      Artist.findById(album.artist).then(oldArtist => {
        oldArtist.albums.pull(album);
        return oldArtist.save();
      });
    }
    return Artist.findById(artistId).then(newArtist => {
      album.artist = newArtist;
      newArtist.albums.push(album);

      return Promise.all([album.save(), newArtist.save()]).then(
        ([album, newArtist]) => album
      );
    });
  });
};

AlbumSchema.statics.addSong = (albumId, songId) => {
  const Album = mongoose.model('albums');
  const Song = mongoose.model('songs');

  return Album.findById(albumId).then(album => {
    return Song.findById(songId).then(song => {
      album.songs.push(song);
      song.album = album;

      return Promise.all([album.save(), song.save()]).then(
        ([album, song]) => album
      );
    });
  });
};

AlbumSchema.statics.removeSong = (albumId, songId) => {
  const Album = mongoose.model('albums');
  const Song = mongoose.model('songs');

  return Album.findById(albumId).then(album => {
    return Song.findById(songId).then(song => {
      album.songs.pull(song);
      song.album = null;

      return Promise.all([album.save(), song.save()]).then(
        ([album, song]) => album
      );
    });
  });
};



module.exports = mongoose.model("albums", AlbumSchema);
