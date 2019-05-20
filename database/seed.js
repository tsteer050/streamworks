// node spots_seed.js

const db = require('../config/keys').MONGO_URI;
const mongoose = require('mongoose');
const Album = require('../server/models/Album');
const Artist = require('../server/models/Artist');
const Playlist = require('../server/models/Playlist');
const Song = require('../server/models/Song');
const User = require('../server/models/User');
const ObjectId = mongoose.Types.ObjectId;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then((database) => {
    Artist.remove({}).then(() => {
      let artistIds = [];

      for (let i = 0; i < 1; i++) {
        artistIds.push(ObjectId());
      }

      let albumIds = [];

      for (let i = 0; i < 1; i++) {
        albumIds.push(ObjectId());
      }

      let songIds = [];

      for (let i = 0; i < 9; i++) {
        songIds.push(ObjectId());
      }

      let playlistIds = [];

      for (let i = 0; i < 1; i++) {
        playlistIds.push(ObjectId());
      }


      Artist.create(
        [
          { 
            _id: artistIds[0], 
            name: "Organ Freeman", 
            genre: "Jazz Fusion", 
            bio: "Instrumental jazz-funk organ trio from Los Angeles", 
            artist_image_url: 'https://m.media-amazon.com/images/I/81mBzkImdvL._SS500_.jpg', 
            albums: [albumIds[0]]
          }
       ], (errors, artists) => {
          Album.remove({}).then(() => {
            Album.create(
              [
                { 
                  _id: albumIds[0], 
                  title: "Respect My Art", 
                  album_art_url: 'https://m.media-amazon.com/images/I/81mBzkImdvL._SS500_.jpg',
                  artist: artistIds[0],
                  songs: [songIds[0], songIds[1], songIds[2], songIds[3], songIds[4], songIds[5], songIds[6], songIds[7], songIds[8]]
                }
              ], (errors, albums) => {
                Song.remove({}).then(() => {
                  Song.create(
                    [
                      {
                        _id: songIds[0],
                        title: "Long Live the King",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Long+Live+the+King+1.m4a',
                        length: 316,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[1],
                        title: "Byrd vs Fish",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Byrd+vs+Fish.m4a',
                        length: 347,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[2],
                        title: "Got Change for a Nickel?",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Got+Change+for+a+Nickel_.m4a',
                        length: 310,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[3],
                        title: "The Green Green Grapes",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/The+Green+Green+Grapes.m4a',
                        length: 328,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[4],
                        title: "Don't Eat Your Fingers",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Don\'t+Eat+Your+Fingers.m4a',
                        length: 408,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[5],
                        title: "E.T. AF",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/+E.T.+AF.m4a',
                        length: 453,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[6],
                        title: "Putin and I Get Along Fantastic",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Putin+and+I+Get+Along+Fantastic.m4a',
                        length: 362,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[7],
                        title: "Reptile Moonshine",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Reptile+Moonshine.m4a',
                        length: 396,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[8],
                        title: "Fly You Fools!",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/The+Green+Green+Grapes.m4a',
                        length: 404,
                        album: albumIds[0]
                      },
                    ], (errors, songs) => {
                      Playlist.remove({}).then(() => {
                        Playlist.create(
                          [
                            {
                              _id: playlistIds[0],
                              title: "Sweet Tunes",
                              owner: ObjectId("5ce2df7716156dc70801a22a"),
                              subscribers: [ObjectId("5ce2df7716156dc70801a22a")],
                              songs: [songIds[0], songIds[4]]
                            },
                          ], (errors, playlists) => {
                            console.log(errors, artists, albums, songs, playlists);
                          }
                        );
                      });
                    }
                  );
                });
              }
            );
          });
        }
      );
    });
  });