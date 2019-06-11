
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }]
});

PlaylistSchema.statics.updateOwner = (playlistId, ownerId) => {
  const Playlist = mongoose.model("playlists");
  const User = mongoose.model("users");

  return Playlist.findById(playlistId).then(playlist => {
    if (playlist.owner) {
      User.findById(playlist.owner).then(oldOwner => {
        oldOwner.playlists.pull(playlist);
        return oldOwner.save();
      });
    }
    return User.findById(ownerId).then(newOwner => {
      playlist.owner = newOwner;
      newOwner.playlists.push(playlist);
      return Promise.all([playlist.save(), newOwner.save()]).then(
        ([playlist, owner]) => playlist
      );
    });
  });
};


PlaylistSchema.statics.newPlaylist = async(title, ownerId) => {
  const Playlist = mongoose.model("playlists");
  const User = mongoose.model("users");

  const owner = await User.findById(ownerId);
  let playlist = new Playlist({ title, owner });
  playlist = await playlist.save();
  owner.playlists.push(playlist);
  await owner.save();

  return playlist;
  
};

PlaylistSchema.statics.addSubscriber = (playlistId, subscriberId) => {
  const Playlist = mongoose.model('playlists');
  const User = mongoose.model('users');

  return Playlist.findById(playlistId).then(playlist => {
    return User.findById(subscriberId).then(subscriber => {
      playlist.subscribers.push(subscriber);
      subscriber.playlists.push(playlist);
      return Promise.all([playlist.save(), subscriber.save()]).then(
        ([playlist, subscriber]) => playlist
      );
    });
  });
};

PlaylistSchema.statics.removeSubscriber = (playlistId, subscriberId) => {
  const Playlist = mongoose.model('playlists');
  const User = mongoose.model('users');

  return Playlist.findById(playlistId).then(playlist => {
    return User.findById(subscriberId).then(subscriber => {
        playlist.subscribers.pull(subscriber);
        subscriber.playlists.pull(playlist);
        return Promise.all([playlist.save(), subscriber.save()]).then(
          ([playlist, subscriber]) => playlist
        );
    });
  });
};

PlaylistSchema.statics.addSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');
  const Song = mongoose.model('songs');

  return Playlist.findById(playlistId).then(playlist => {
    return Song.findById(songId).then(song => {
      playlist.songs.push(song);

      return playlist.save().then(playlist => playlist);
    });
  });
};

PlaylistSchema.statics.removeSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');
  const Song = mongoose.model('songs');

  return Playlist.findById(playlistId).then(playlist => {
    return Song.findById(songId).then(song => {
      playlist.songs.pull(song);

      return playlist.save().then(playlist => playlist);
    });
  });
};



module.exports = mongoose.model("playlists", PlaylistSchema);
