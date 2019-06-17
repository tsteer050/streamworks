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

      for (let i = 0; i < 10; i++) {
        artistIds.push(ObjectId());
      }

      let albumIds = [];

      for (let i = 0; i < 12; i++) {
        albumIds.push(ObjectId());
      }

      let songIds = [];

      for (let i = 0; i < 120; i++) {
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
          }, 
          {
            _id: artistIds[1],
            name: "Coldplay",
            genre: "Alternative Rock",
            bio: "Coldplay are a British rock band formed in London in 1996.",
            artist_image_url: 'https://ichef.bbci.co.uk/images/ic/960x540/p05c99dh.jpg',
            albums: [albumIds[1], albumIds[2], albumIds[3]]
          },
          {
            _id: artistIds[2],
            name: "Alice in Chains",
            genre: "Grunge Rock",
            bio: "Alice in Chains is an American rock band from Seattle, Washington, formed in 1987.",
            artist_image_url: 'https://townsquare.media/site/366/files/2014/11/Alice-in-Chains-1080.jpg?w=980&q=75',
            albums: [albumIds[4]]
          },
          {
            _id: artistIds[3],
            name: "Metallica",
            genre: "Heavy Metal",
            bio: "Metallica is an American heavy metal band. The band was formed in 1981 in Los Angeles, California by drummer Lars Ulrich and vocalist/guitarist James Hetfield, and has been based in San Francisco, California for most of its career.",
            artist_image_url: 'https://i0.wp.com/metalinjection.net/wp-content/uploads/2019/03/metallica.jpg?fit=700%2C467&ssl=1',
            albums: [albumIds[5]]
          },
          {
            _id: artistIds[4],
            name: "Mingus Big Band",
            genre: "Jazz",
            bio: "The Mingus Big Band is an ensemble, based in New York City, that specializes in the compositions of Charles Mingus. It is managed by his widow, Sue Mingus, along with the Mingus Orchestra and Mingus Dynasty.",
            artist_image_url: 'https://www.northseajazz.com/-/media/northseajazz/rotterdam/shows/2018/mingus-big-band.jpg',
            albums: [albumIds[6]]
          },
          {
            _id: artistIds[5],
            name: "BT",
            genre: "Electronic",
            bio: "Brian Wayne Transeau (born October 4, 1971), known by his initials as BT, is an American musician, composer, singer, songwriter, DJ and audio technician.",
            artist_image_url: 'https://www.decodedmagazine.com/wp-content/uploads/2016/11/Brian-Transeau-1-decoded.jpg',
            albums: [albumIds[7]]
          },
          {
            _id: artistIds[6],
            name: "U2",
            genre: "Rock",
            bio: "U2 are an Irish rock band from Dublin, formed in 1976.",
            artist_image_url: 'https://www.udiscovermusic.com/wp-content/uploads/2018/03/U2-optimised-copy.jpg',
            albums: [albumIds[8]]
          },
          {
            _id: artistIds[7],
            name: "Ahmad Jamal",
            genre: "Jazz",
            bio: "Ahmad Jamal is an American jazz pianist, composer, bandleader, and educator.",
            artist_image_url: 'https://images-na.ssl-images-amazon.com/images/I/618jpCRULbL.jpg',
            albums: [albumIds[9]]
          },
          {
            _id: artistIds[8],
            name: "Joni Mitchell",
            genre: "Folk Jazz",
            bio: "Roberta Joan 'Joni' Mitchell is a Canadian singer-songwriter",
            artist_image_url: 'https://i.scdn.co/image/68cfb061951dbd44c95422a54cb70baec0722ca3',
            albums: [albumIds[10]]
          },
          {
            _id: artistIds[9],
            name: "Loreena McKennitt",
            genre: "Celtic",
            bio: "Loreena Isabel Irene McKennitt is a Canadian musician, composer, harpist, accordionist, and pianist.",
            artist_image_url: 'https://www.udiscovermusic.com/wp-content/uploads/2018/03/U2-optimised-copy.jpg',
            albums: [albumIds[11]]
          },
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
                },
                { 
                  _id: albumIds[1], 
                  title: "Parachutes", 
                  album_art_url: 'https://is5-ssl.mzstatic.com/image/thumb/Music30/v4/81/1c/3d/811c3dd6-587f-1f9a-18d8-ad221a5f77e3/190295978075.jpg/600x600bf.png',
                  artist: artistIds[1],
                  songs: [songIds[9], songIds[10], songIds[11], songIds[12], songIds[13], songIds[14], songIds[15], songIds[16], songIds[17], songIds[18]]
                },
                {
                  _id: albumIds[2],
                  title: "A Rush of Blood to the Head",
                  album_art_url: 'https://qph.fs.quoracdn.net/main-qimg-9488341d4770aca142f13919807a8a41.webp',
                  artist: artistIds[1],
                  songs: [songIds[19], songIds[20], songIds[21], songIds[22], songIds[23], songIds[24], songIds[25], songIds[26], songIds[27], songIds[28], songIds[29]]
                },
                {
                _id: albumIds[3],
                title: "Viva la Vida",
                  album_art_url: 'https://i.redd.it/gi20y0kqdli11.png',
                artist: artistIds[1],
                songs: [songIds[30], songIds[31], songIds[32], songIds[33], songIds[34], songIds[35], songIds[36], songIds[37], songIds[38], songIds[39], songIds[40]]
                },
                {
                  _id: albumIds[4],
                  title: "Facelift",
                  album_art_url: 'https://www.metal-archives.com/images/3/9/5/8/3958.jpg',
                  artist: artistIds[2],
                  songs: [songIds[41], songIds[42], songIds[43], songIds[44], songIds[45], songIds[46], songIds[47], songIds[48], songIds[49], songIds[50], songIds[51], songIds[52]]
                },
                {
                  _id: albumIds[5],
                  title: "Load",
                  album_art_url: 'https://www.analogueseduction.net/user/products/large/metallica_load-cover.jpg',
                  artist: artistIds[3],
                  songs: [songIds[53], songIds[54], songIds[55], songIds[56], songIds[57], songIds[58], songIds[59], songIds[60], songIds[61], songIds[62], songIds[63]]
                },
                {
                  _id: albumIds[6],
                  title: "Blues & Politics",
                  album_art_url: 'https://images-na.ssl-images-amazon.com/images/I/51Z820XDRBL.jpg',
                  artist: artistIds[4],
                  songs: [songIds[64], songIds[65], songIds[66], songIds[67], songIds[68], songIds[69], songIds[70], songIds[71]]
                },
                {
                  _id: albumIds[7],
                  title: "This Binary Universe",
                  album_art_url: 'https://i1.sndcdn.com/artworks-000283768052-vuzlke-t500x500.jpg',
                  artist: artistIds[5],
                  songs: [songIds[72], songIds[73], songIds[74], songIds[75], songIds[76], songIds[77], songIds[78]]
                },
                {
                  _id: albumIds[8],
                  title: "All That You Can't Leave Behind",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/5/5b/U2-all-that-you-cant-leave-behind.jpg',
                  artist: artistIds[6],
                  songs: [songIds[79], songIds[80], songIds[81], songIds[82], songIds[83], songIds[84], songIds[85], songIds[86], songIds[87], songIds[88], songIds[89]]
                },
                {
                  _id: albumIds[9],
                  title: "Blue Moon- The New York Session-The Paris Concert",
                  album_art_url: 'https://images-na.ssl-images-amazon.com/images/I/51XFoHUbJ9L.jpg',
                  artist: artistIds[7],
                  songs: [songIds[90], songIds[91], songIds[92], songIds[93], songIds[94], songIds[95], songIds[96], songIds[97], songIds[98]]
                },
                {
                  _id: albumIds[10],
                  title: "Both Sides Now",
                  album_art_url: 'http://www.thelefortreport.com/blog/wp-content/uploads/1091.jpg',
                  artist: artistIds[8],
                  songs: [songIds[99], songIds[100], songIds[101], songIds[102], songIds[103], songIds[104], songIds[105], songIds[106], songIds[107], songIds[108], songIds[109], songIds[110]]
                },
                {
                  _id: albumIds[11],
                  title: "The Book of Secrets",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Album_Cover-The_Book_of_Secrets.jpg/220px-Album_Cover-The_Book_of_Secrets.jpg',
                  artist: artistIds[9],
                  songs: [songIds[111], songIds[112], songIds[113], songIds[114], songIds[115], songIds[116], songIds[117], songIds[118]]
                },
              ], (errors, albums) => {
                Song.remove({}).then(() => {
                  Song.create(
                    [
                      {
                        _id: songIds[0],
                        title: "Long Live the King",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Long+Live+the+King+1.m4a',
                        length: 316,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[1],
                        title: "Byrd vs Fish",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Byrd+vs+Fish.m4a',
                        length: 347,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[2],
                        title: "Got Change for a Nickel?",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Got+Change+for+a+Nickel_.m4a',
                        length: 310,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[3],
                        title: "The Green Green Grapes",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/The+Green+Green+Grapes.m4a',
                        length: 328,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[4],
                        title: "Don't Eat Your Fingers",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Don\'t+Eat+Your+Fingers.m4a',
                        length: 408,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[5],
                        title: "E.T. AF",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/+E.T.+AF.m4a',
                        length: 453,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[6],
                        title: "Putin and I Get Along Fantastic",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Putin+and+I+Get+Along+Fantastic.m4a',
                        length: 362,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[7],
                        title: "Reptile Moonshine",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Reptile+Moonshine.m4a',
                        length: 396,
                        album: albumIds[0]
                      },
                      {
                        _id: songIds[8],
                        title: "Fly You Fools!",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Respect+My+Art/Fly+You+Fools!.m4a',
                        length: 404,
                        album: albumIds[0]
                      },
                      //
                      {
                        _id: songIds[9],
                        title: "Don't Panic",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/01+Don\'t+Panic.mp3',
                        length: 137,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[10],
                        title: "Shiver",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/02+Shiver.mp3',
                        length: 300,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[11],
                        title: "Spies",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/03+Spies.mp3',
                        length: 319,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[12],
                        title: "Sparks",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/04+Sparks.mp3',
                        length: 227,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[13],
                        title: "Yellow",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/05+Yellow.mp3',
                        length: 269,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[14],
                        title: "Trouble",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/06+Trouble.mp3',
                        length: 271,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[15],
                        title: "Parachutes",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/07+Parachutes.mp3',
                        length: 46,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[16],
                        title: "High Speed",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/08+High+Speed.mp3',
                        length: 254,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[17],
                        title: "We Never Change",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/09+We+Never+Change.mp3',
                        length: 249,
                        album: albumIds[1]
                      },
                      {
                        _id: songIds[18],
                        title: "Everything's Not Lost",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Parachutes/10+Everything\'s+Not+Lost.mp3',
                        length: 436,
                        album: albumIds[1]
                      },
                      //
                      {
                        _id: songIds[19],
                        title: "Politik",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/01+Politik.mp3',
                        length: 319,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[20],
                        title: "In My Place",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/02+In+My+Place.mp3',
                        length: 229,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[21],
                        title: "God Put a Smile Upon Your Face",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/03+God+Put+a+Smile+Upon+Your+Face.mp3',
                        length: 297,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[22],
                        title: "The Scientist",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/04+The+Scientist.mp3',
                        length: 309,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[23],
                        title: "Clocks",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/05+Clocks.mp3',
                        length: 307,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[24],
                        title: "Daylight",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/06+Daylight.mp3',
                        length: 328,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[25],
                        title: "Green Eyes",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/07+Green+Eyes.mp3',
                        length: 223,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[26],
                        title: "Warning Sign",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/08+Warning+Sign.mp3',
                        length: 331,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[27],
                        title: "A Whisper",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/09+A+Whisper.mp3',
                        length: 238,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[28],
                        title: "A Rush of Blood to the Head",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/10+A+Rush+of+Blood+to+the+Head.mp3',
                        length: 351,
                        album: albumIds[2]
                      },
                      {
                        _id: songIds[29],
                        title: "Amsterdam",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/A+Rush+of+Blood+to+the+Head/11+Amsterdam.mp3',
                        length: 319,
                        album: albumIds[2]
                      },
                      //
                      {
                        _id: songIds[31],
                        title: "Life in Technicolor",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/01+Life+in+Technicolor.mp3',
                        length: 149,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[32],
                        title: "Cemeteries of London",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/02+Cemeteries+of+London.mp3',
                        length: 201,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[33],
                        title: "Lost!",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/03+Lost!.mp3',
                        length: 236,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[34],
                        title: "42",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/04+42.mp3',
                        length: 238,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[35],
                        title: "Lovers in Japan-Reign of Love",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/05+Lovers+in+Japan-Reign+of+Love.mp3',
                        length: 411,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[36],
                        title: "Yes",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/06+Yes.mp3',
                        length: 427,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[37],
                        title: "Viva la Vida",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/07+Viva+La+Vida.mp3',
                        length: 243,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[38],
                        title: "Violet Hill",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/08+Violet+Hill.mp3',
                        length: 229,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[39],
                        title: "Strawberry Swing",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/09+Strawberry+Swing.mp3',
                        length: 250,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[40],
                        title: "Death and All His Friends",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Viva+la+Vida/10+Death+and+All+His+Friends.mp3',
                        length: 379,
                        album: albumIds[3]
                      },
                      {
                        _id: songIds[41],
                        title: "We Die Young",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/01+We+Die+Young.mp3',
                        length: 152,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[42],
                        title: "Man in the Box",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/02+Man+in+the+Box.mp3',
                        length: 286,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[43],
                        title: "Sea of Sorrow",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/03+Sea+of+Sorrow.mp3',
                        length: 349,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[44],
                        title: "Bleed the Freak",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/04+Bleed+the+Freak.mp3',
                        length: 241,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[45],
                        title: "I Can't Remember",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/05+I+Can\'t+Remember.mp3',
                        length: 222,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[46],
                        title: "Love, Hate, Love",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/06+Love%2C+Hate%2C+Love.mp3',
                        length: 386,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[47],
                        title: "It Ain't Like That",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/07+It+Ain\'t+Like+That.mp3',
                        length: 277,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[48],
                        title: "Sunshine",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/08+Sunshine.mp3',
                        length: 284,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[49],
                        title: "Put You Down",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/09+Put+You+Down.mp3',
                        length: 196,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[50],
                        title: "Confusion",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/10+Confusion.mp3',
                        length: 344,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[51],
                        title: "I Know Something (Bout You)",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/11+I+Know+Somethin+(Bout+You).mp3',
                        length: 262,
                        album: albumIds[4]
                      },
                      {
                        _id: songIds[52],
                        title: "Real Thing",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Facelift/12+Real+Thing.mp3',
                        length: 243,
                        album: albumIds[4]
                      },
                      //
                      {
                        _id: songIds[53],
                        title: "Ain't My Bitch",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/01+Ain\'t+My+Bitch.m4a',
                        length: 304,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[54],
                        title: "2 X 4",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/02+2+X+4.m4a',
                        length: 328,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[55],
                        title: "The House Jack Built",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/03+The+House+Jack+Built.m4a',
                        length: 399,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[56],
                        title: "Until It Sleeps",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/04+Until+It+Sleeps.m4a',
                        length: 270,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[57],
                        title: "King Nothing",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/05+King+Nothing.m4a',
                        length: 328,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[58],
                        title: "Hero of the Day",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/06+Hero+of+the+Day.m4a',
                        length: 262,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[59],
                        title: "Bleeding Me",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/07+Bleeding+Me.m4a',
                        length: 498,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[60],
                        title: "Cure",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/08+Cure.m4a',
                        length: 294,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[61],
                        title: "Poor Twisted Me",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/09+Poor+Twisted+Me.m4a',
                        length: 240,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[62],
                        title: "Wasting My Hate",
                        audio_url: 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Load/10+Wasting+My+Hate.m4a',
                        length: 237,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[63],
                        title: "Mama Said",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Load/11+Mama+Said.m4a',
                        length: 320,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[64],
                        title: "It Was a Lonely Day In Selma, Alabama",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-01+It+Was+A+Lonely+Day+In+Selma%2C+Alabama_Freedom.m4a',
                        length: 525,
                        album: albumIds[5]
                      },
                      {
                        _id: songIds[65],
                        title: "Haitian Fight Song",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-02+Haitian+Fight+Song.m4a',
                        length: 500,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[66],
                        title: "Goodbye Pork Pie Hat",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-03+Goodbye+Pork+Pie+Hat.m4a',
                        length: 583,
                        album: albumIds[6]
                      },
                                            {
                        _id: songIds[67],
                        title: "Don't Let it Happen Here",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-04+Don\'t+Let+It+Happen+Here.m4a',
                        length: 315,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[68],
                        title: "Meditations For A Pair of Wire-Cutters",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-05+Meditations+For+A+Pair+Of+Wire-Cutters.m4a',
                        length: 699,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[69],
                        title: "Pussycat Dues",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-06+Pussycat+Dues.m4a',
                        length: 397,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[70],
                        title: "Oh Lord, Don't Let Them Drop That Atomic Bomb On Me",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-07+Oh+Lord%2C+Don\'t+Let+Them+Drop+That+Atomic+Bomb+On+Me.m4a',
                        length: 537,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[71],
                        title: "Little Royal Suite",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blues+%26+Politics/1-08+Little+Royal+Suite.m4a',
                        length: 959,
                        album: albumIds[6]
                      },
                      {
                        _id: songIds[72],
                        title: "All That Makes Us Human Continues",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/01+All+That+Makes+Us+Human+Continues+1.m4a',
                        length: 496,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[73],
                        title: "Dynamic Symmetry",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/02+Dynamic+Symmetry+1.m4a',
                        length: 684,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[74],
                        title: "The Internal Locus",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/03+The+Internal+Locus+1.m4a',
                        length: 628,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[75],
                        title: "1.618",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/04+1.618+1.m4a',
                        length: 694,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[76],
                        title: "See You on the Other Side",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/05+See+You+on+the+Other+Side+1.m4a',
                        length: 864,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[77],
                        title: "The Antikythera Mechanism",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/06+The+Anhtkythera+Mechanism+1.m4a',
                        length: 606,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[78],
                        title: "Good Morning Kaia",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/This+Binary+Universe/07+Good+Morning+Kaia+1.m4a',
                        length: 492,
                        album: albumIds[7]
                      },
                      {
                        _id: songIds[79],
                        title: "Beautiful Day",
                        audio_url: '',
                        length: 248,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[80],
                        title: "Stuck in a Moment You Can't Get Out Of",
                        audio_url: '',
                        length: 272,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[81],
                        title: "Elevation",
                        audio_url: '',
                        length: 228,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[82],
                        title: "Walk On",
                        audio_url: '',
                        length: 296,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[83],
                        title: "Kite",
                        audio_url: '',
                        length: 267,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[84],
                        title: "In a Little While",
                        audio_url: '',
                        length: 219,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[85],
                        title: "Wild Honey",
                        audio_url: '',
                        length: 227,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[86],
                        title: "Peace on Earth",
                        audio_url: '',
                        length: 288,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[87],
                        title: "When I Looked at the World",
                        audio_url: '',
                        length: 258,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[88],
                        title: "New York",
                        audio_url: '',
                        length: 330,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[89],
                        title: "Grace",
                        audio_url: '',
                        length: 331,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[90],
                        title: "Autumn Rain",
                        audio_url: '',
                        length: 457,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[91],
                        title: "Blue Moon",
                        audio_url: '',
                        length: 595,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[92],
                        title: "Gypsy",
                        audio_url: '',
                        length: 313,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[93],
                        title: "Invitation",
                        audio_url: '',
                        length: 793,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[94],
                        title: "I Remember Italy",
                        audio_url: '',
                        length: 787,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[95],
                        title: "Laura",
                        audio_url: '',
                        length: 329,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[96],
                        title: "Morning Mist",
                        audio_url: '',
                        length: 499,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[97],
                        title: "This Is the Life",
                        audio_url: '',
                        length: 428,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[98],
                        title: "Woody'n You",
                        audio_url: '',
                        length: 296,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[99],
                        title: "You're My Thrill",
                        audio_url: '',
                        length: 233,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[100],
                        title: "At Last",
                        audio_url: '',
                        length: 268,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[101],
                        title: "Comes Love",
                        audio_url: '',
                        length: 269,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[102],
                        title: "You've Changed",
                        audio_url: '',
                        length: 301,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[103],
                        title: "Answer Me, My Love",
                        audio_url: '',
                        length: 204,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[104],
                        title: "A Case of you",
                        audio_url: '',
                        length: 354,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[105],
                        title: "Don't Go to Strangers",
                        audio_url: '',
                        length: 251,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[106],
                        title: "Sometimes I'm Happy",
                        audio_url: '',
                        length: 238,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[107],
                        title: "Don't Worry 'Bout Me",
                        audio_url: '',
                        length: 230,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[108],
                        title: "Stormy Weather",
                        audio_url: '',
                        length: 187,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[109],
                        title: "I Wish I Were in Love Again",
                        audio_url: '',
                        length: 216,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[110],
                        title: "Both Sides Now",
                        audio_url: '',
                        length: 346,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[111],
                        title: "Prologue",
                        audio_url: '',
                        length: 265,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[112],
                        title: "The Mummer's Dance",
                        audio_url: '',
                        length: 369,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[113],
                        title: "Skellig",
                        audio_url: '',
                        length: 368,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[114],
                        title: "Marco Pollo",
                        audio_url: '',
                        length: 319,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[115],
                        title: "The Highwayman",
                        audio_url: '',
                        length: 621,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[116],
                        title: "La Serenissima",
                        audio_url: '',
                        length: 310,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[117],
                        title: "Night Ride Across the Caucasus",
                        audio_url: '',
                        length: 513,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[118],
                        title: "Dante's Prayer",
                        audio_url: '',
                        length: 431,
                        album: albumIds[11]
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