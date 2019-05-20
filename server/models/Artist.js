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

ArtistSchema.statics.addAlbum = (artistId, albumId) => {
  const Artist = mongoose.model('artists');
  const Album = mongoose.model('albums');

  return Artist.findById(artistId).then(artist => {
    return Album.findById(albumId).then(album => {
      artist.albums.push(album);
      album.artist = artist;

      return Promise.all([artist.save(), album.save()]).then(
        ([artist, album]) => artist
      );
    });
  });
};

ArtistSchema.statics.removeAlbum = (artistId, albumId) => {
  const Artist = mongoose.model('artists');
  const Album = mongoose.model('albums');
  
  return Artist.findById(artistId).then(artist => {
    return Album.findById(albumId).then(album => {
      artist.albums.pull(album);
      //This might not work.  If it doesn't, we need a removeArtist mutation on Album
      album.artist = null;

      return Promise.all([artist.save(), album.save()]).then(
        ([artist, album]) => artist
      );
    });
  });
};

module.exports = mongoose.model("artists", ArtistSchema);
