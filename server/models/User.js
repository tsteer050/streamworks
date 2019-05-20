
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
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
  }]

});



UserSchema.statics.addAlbum = (userId, albumId) => {
  const User = mongoose.model('users');
  const Album = mongoose.model('albums');

  return User.findById(userId).then(user => {
    return Album.findById(albumId).then(album => {
      user.albums.push(album);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.removeAlbum = (userId, albumId) => {
  const User = mongoose.model('users');
  const Album = mongoose.model('albums');

  return User.findById(userId).then(user => {
    return Album.findById(albumId).then(album => {
      user.albums.pull(album);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.addArtist = (userId, artistId) => {
  const User = mongoose.model('users');
  const Artist = mongoose.model('artists');

  return User.findById(userId).then(user => {
    return Artist.findById(artistId).then(artist => {
      user.artists.push(artist);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.removeArtist = (userId, artistId) => {
  const User = mongoose.model('users');
  const Artist = mongoose.model('artists');

  return User.findById(userId).then(user => {
    return Artist.findById(artistId).then(artist => {
      user.artists.pull(artist);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.addSong = (userId, songId) => {
  const User = mongoose.model('users');
  const Song = mongoose.model('songs');

  return User.findById(userId).then(user => {
    return Song.findById(songId).then(song => {
      user.songs.push(song);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.removeSong = (userId, songId) => {
  const User = mongoose.model('users');
  const Song = mongoose.model('songs');

  return User.findById(userId).then(user => {
    return Song.findById(songId).then(song => {
      user.songs.pull(song);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.addPlaylist = (userId, playlistId) => {
  const User = mongoose.model('users');
  const Playlist = mongoose.model('playlists');

  return User.findById(userId).then(user => {
    return Playlist.findById(playlistId).then(playlist => {
      user.playlists.push(playlist);
      return user.save().then(user => user);
    });
  });
};

UserSchema.statics.removePlaylist = (userId, playlistId) => {
  const User = mongoose.model('users');
  const Playlist = mongoose.model('playlists');

  return User.findById(userId).then(user => {
    return Playlist.findById(playlistId).then(playlist => {
      user.playlists.pull(playlist);
      return user.save().then(user => user);
    });
  });
};



module.exports = mongoose.model("users", UserSchema);