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

      for (let i = 0; i < 17; i++) {

        artistIds.push(ObjectId());
      }

      let albumIds = [];

      for (let i = 0; i < 19; i++) {

        albumIds.push(ObjectId());
      }

      let songIds = [];

      for (let i = 0; i < 207; i++) {

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
            _id: artistIds[10],
            name: "Muse",
            genre: "Rock",
            bio: "Muse are an English rock band from Teignmouth, Devon, formed in 1994. The band consists of Matt Bellamy (lead vocals, guitar, keyboards), Chris Wolstenholme (bass guitar, backing vocals), and Dominic Howard (drums).",
            artist_image_url: 'https://pmcvariety.files.wordpress.com/2018/11/muse-2-1-e1541966572862.jpg?w=1000&h=563&crop=1',
            albums: [albumIds[12]]
          },
          {
            _id: artistIds[11],
            name: "Ratatat",
            genre: "Electronic Rock",
            bio: "Ratatat (/ˈrætətæt/ RAT-ə-tat) is a Brooklyn-based electronic rock duo consisting of Mike Stroud (guitar, melodica, synthesizers, percussion) and producer Evan Mast (bass, synthesizers, percussion).",
            artist_image_url: 'http://www.mixdownmag.com.au/sites/default/files/styles/flexslider_h400/public/images/Ratatat.jpg?itok=vNQzSMwg',
            albums: [albumIds[13]]
          },
          {
            _id: artistIds[12],
            name: "Mutemath",
            genre: "Rock",
            bio: "Mutemath (sometimes styled as MuteMath or MUTEMATH) is an American alternative rock band from New Orleans that formed in 2002.",
            artist_image_url: 'https://live.staticflickr.com/6119/6299329999_1c1355a15c_b.jpg',
            albums: [albumIds[14]]
          },
          {
            _id: artistIds[13],
            name: "Red Hot Chili Peppers",
            genre: "Rock",
            bio: "Red Hot Chili Peppers are an American rock band formed in Los Angeles in 1983. The group's musical style primarily consists of rock with an emphasis on funk, as well as elements from other genres such as punk rock and psychedelic rock.",
            artist_image_url: 'https://junkee.com/wp-content/uploads/2019/02/330e12cfdf1ece78f3a80437944efea81.jpg',
            albums: [albumIds[15]]
          },
          {
            _id: artistIds[14],
            name: "Jurrasic 5",
            genre: "Hip Hop",
            bio: "Jurassic 5 is an American alternative hip hop group formed in 1991 by members of two previous groups (Rebels of Rhythm and Unity Committee[1]): rappers Charles Stewart (Chali 2na), Dante Givens (Akil), Courtenay Henderson (Soup aka Zaakir), Marc Stuart (Marc 7); and disc jockeys Mark Potsic (DJ Nu-Mark) and Lucas Macfadden (Cut Chemist).",
            artist_image_url: 'https://www.lalive.com/assets/img/Jurassic-5-640x360.jpg',
            albums: [albumIds[16]]
          },
          {
            _id: artistIds[15],
            name: "Loreena McKennitt",
            genre: "Folk",
            bio: "Loreena Isabel Irene McKennitt, CM OM (born February 17, 1957) is a Canadian musician, composer, harpist, accordionist, and pianist who writes, records and performs world music with Celtic and Middle Eastern themes.",
            artist_image_url: 'http://i.ebayimg.com/images/g/nXQAAOSwux5YRaMa/s-l1600.jpg',
            albums: [albumIds[17]]
          },
          {
            _id: artistIds[16],
            name: "Phoenix",
            genre: "Indie",
            bio: "Phoenix is an indie pop-rock band from Versailles, France,[1] consisting of Thomas Mars (lead vocals), Deck d'Arcy (bass/keyboards/backing vocals), Christian Mazzalai (guitar/backing vocals) and Laurent Brancowitz (guitar/keyboards/backing vocals).",
            artist_image_url: 'https://media.gq.com/photos/5919b3ad5607d02ba9e29a6b/16:9/w_1280,c_limit/Phoenix0174-Phoenix-Alex-Reside-GQ-2.jpg',
            albums: [albumIds[18]]
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
                  _id: albumIds[12],
                  title: "Absolution",
                  album_art_url: 'https://i.ytimg.com/vi/pElWfOTCnIE/hqdefault.jpg',
                  artist: artistIds[10],
                  songs: [songIds[119], songIds[120], songIds[121], songIds[122], songIds[123], songIds[124], songIds[125], songIds[126], songIds[127], songIds[128], songIds[129], songIds[130], songIds[131], songIds[132]]
                },
                {
                  _id: albumIds[13],
                  title: "Ratatat",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Ratatatcover.jpg/220px-Ratatatcover.jpg',
                  artist: artistIds[11],
                  songs: [songIds[133], songIds[134], songIds[135], songIds[136], songIds[137], songIds[138], songIds[139], songIds[140], songIds[141], songIds[142], songIds[143]]
                },
                {
                  _id: albumIds[14],
                  title: "Mute Math",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Muthemath%2C_album_cover.jpg/220px-Muthemath%2C_album_cover.jpg',
                  artist: artistIds[12],
                  songs: [songIds[144], songIds[145], songIds[146], songIds[147], songIds[148], songIds[149], songIds[150], songIds[151], songIds[152], songIds[153], songIds[154], songIds[155], songIds[156], songIds[157]]
                },
                {
                  _id: albumIds[15],
                  title: "Californication",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg',
                  artist: artistIds[13],
                  songs: [songIds[158], songIds[159], songIds[160], songIds[161], songIds[162], songIds[163], songIds[164], songIds[165], songIds[166], songIds[167], songIds[168], songIds[169], songIds[170], songIds[171], songIds[172]]
                },
                {
                  _id: albumIds[16],
                  title: "Quality Control",
                  album_art_url: 'https://media.pitchfork.com/photos/5929c1c2c0084474cd0c33b7/1:1/w_320/94892900.gif',
                  artist: artistIds[14],
                  songs: [songIds[173], songIds[174], songIds[175], songIds[176], songIds[177], songIds[178], songIds[179], songIds[180], songIds[181], songIds[182], songIds[183], songIds[184], songIds[185], songIds[186], songIds[187]]
                },
                {
                  _id: albumIds[17],
                  title: "The Book of Secrets",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Album_Cover-The_Book_of_Secrets.jpg',
                  artist: artistIds[15],
                  songs: [songIds[188], songIds[189], songIds[190], songIds[191], songIds[192], songIds[193], songIds[194], songIds[195]]
                },
                {
                  _id: albumIds[18],
                  title: "Alphabetical",
                  album_art_url: 'https://upload.wikimedia.org/wikipedia/en/9/98/PhoenixAlphabeticalalbumcover.jpg',
                  artist: artistIds[16],
                  songs: [songIds[196], songIds[197], songIds[198], songIds[199], songIds[200], songIds[201], songIds[202], songIds[203], songIds[204], songIds[205]]
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

                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/01+Beautiful+Day.mp3',
                        length: 248,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[80],
                        title: "Stuck in a Moment You Can't Get Out Of",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/02+Stuck+in+a+Moment+You+Can\'t+Get+Out+Of.mp3',

                        length: 272,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[81],
                        title: "Elevation",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/03+Elevation.mp3',

                        length: 228,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[82],
                        title: "Walk On",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/04+Walk+On.mp3',

                        length: 296,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[83],
                        title: "Kite",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/05+Kite.mp3',

                        length: 267,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[84],
                        title: "In a Little While",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/06+In+a+Little+While.mp3',

                        length: 219,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[85],
                        title: "Wild Honey",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/07+Wild+Honey.mp3',

                        length: 227,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[86],
                        title: "Peace on Earth",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/08+Peace+on+Earth.mp3',

                        length: 288,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[87],
                        title: "When I Looked at the World",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/09+When+I+Look+at+the+World.mp3',

                        length: 258,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[88],
                        title: "New York",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/10+New+York.mp3',

                        length: 330,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[89],
                        title: "Grace",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/All+That+You+Can\'t+Leave+Behind/11+Grace.mp3',

                        length: 331,
                        album: albumIds[8]
                      },
                      {
                        _id: songIds[90],
                        title: "Autumn Rain",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/01+Autumn+Rain.mp3',

                        length: 457,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[91],
                        title: "Blue Moon",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/02+Blue+Moon.mp3',

                        length: 595,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[92],
                        title: "Gypsy",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/03+Gypsy.mp3',

                        length: 313,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[93],
                        title: "Invitation",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/04+Invitation.mp3',

                        length: 793,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[94],
                        title: "I Remember Italy",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/05+I+Remember+Italy.mp3',

                        length: 787,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[95],
                        title: "Laura",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/06+Laura.mp3',

                        length: 329,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[96],
                        title: "Morning Mist",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/07+Morning+Mist.mp3',

                        length: 499,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[97],
                        title: "This Is the Life",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/08+This+Is+the+Life.mp3',

                        length: 428,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[98],
                        title: "Woody'n You",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Blue+Moon-+The+New+York+Session-The+Paris+Concert/09+Woody\'n+You.mp3',

                        length: 296,
                        album: albumIds[9]
                      },
                      {
                        _id: songIds[99],
                        title: "You're My Thrill",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/01+You\'re+My+Thrill.mp3',

                        length: 233,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[100],
                        title: "At Last",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/02+At+Last.mp3',

                        length: 268,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[101],
                        title: "Comes Love",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/03+Comes+Love.mp3',

                        length: 269,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[102],
                        title: "You've Changed",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/04+You\'ve+Changed.mp3',

                        length: 301,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[103],
                        title: "Answer Me, My Love",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/05+Answer+Me%2C+My+Love.mp3',

                        length: 204,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[104],
                        title: "A Case of you",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/06+A+Case+of+You.mp3',

                        length: 354,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[105],
                        title: "Don't Go to Strangers",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/07+Don\'t+Go+to+Strangers.mp3',

                        length: 251,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[106],
                        title: "Sometimes I'm Happy",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/08+Sometimes+I\'m+Happy.mp3',

                        length: 238,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[107],
                        title: "Don't Worry 'Bout Me",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/09+Don\'t+Worry+\'Bout+Me.mp3',

                        length: 230,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[108],
                        title: "Stormy Weather",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/10+Stormy+Weather.mp3',

                        length: 187,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[109],
                        title: "I Wish I Were in Love Again",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/11+I+Wish+I+Were+in+Love+Again.mp3',

                        length: 216,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[110],
                        title: "Both Sides Now",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Both+Sides+Now/12+Both+Sides%2C+Now+%5BVersion%5D.mp3',

                        length: 346,
                        album: albumIds[10]
                      },
                      {
                        _id: songIds[111],
                        title: "Prologue",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/01+Prologue.mp3',

                        length: 265,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[112],
                        title: "The Mummer's Dance",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/02+The+Mummers\'+Dance.mp3',

                        length: 369,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[113],
                        title: "Skellig",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/03+Skellig.mp3',

                        length: 368,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[114],
                        title: "Marco Pollo",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/04+Marco+Polo.mp3',

                        length: 319,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[115],
                        title: "The Highwayman",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/05+The+Highwayman.mp3',

                        length: 621,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[116],
                        title: "La Serenissima",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/06+La+Serenissima.mp3',

                        length: 310,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[117],
                        title: "Night Ride Across the Caucasus",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/07+Night+Ride+Across+the+Caucasus.mp3',

                        length: 513,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[118],
                        title: "Dante's Prayer",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/08+Dante\'s+Prayer.mp3',
                        length: 431,
                        album: albumIds[11]
                      },
                      {
                        _id: songIds[119],
                        title: "Intro",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/01+Intro.mp3',
                        length: 23,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[120],
                        title: "Apocalypse Please",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/02+Apocalypse+Please.mp3',
                        length: 253,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[121],
                        title: "Time Is Running Out",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/03+Time+is+Running+Out.mp3',
                        length: 236,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[122],
                        title: "Sing for Absolution",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/04+Sing+for+Absolution.mp3',
                        length: 295,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[123],
                        title: "Stockholm Syndrome",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/05+Stockholm+Syndrome.mp3',
                        length: 299,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[124],
                        title: "Falling Away With You",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/06+Falling+Away+with+You.mp3',
                        length: 281,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[125],
                        title: "Interlude",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/07+Interlude.mp3',
                        length: 38,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[126],
                        title: "Hysteria",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/08+Hysteria.mp3',
                        length: 227,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[127],
                        title: "Blackout",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/09+Blackout.mp3',
                        length: 262,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[128],
                        title: "Butterflies and Hurricanes",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/10+Butterflies+and+Hurricanes.mp3',
                        length: 302,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[129],
                        title: "Endlessly",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/11+Endlessly.mp3',
                        length: 229,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[130],
                        title: "Thoughts of A Dying Atheist",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/12+Thoughts+of+A+Dying+Atheist.mp3',
                        length: 191,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[131],
                        title: "The Small Print",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/13+TSP+(The+Small+Print).mp3',
                        length: 209,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[132],
                        title: "Ruled by Secrecy",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Absolution/14+Ruled+by+Secrecy.mp3',
                        length: 294,
                        album: albumIds[12]
                      },
                      {
                        _id: songIds[133],
                        title: "Seventeen Years",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/01+Seventeen+Years.mp3',
                        length: 266,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[134],
                        title: "El Pico",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/02+El+Pico.mp3',
                        length: 282,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[135],
                        title: "Crips",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/03+Crips.mp3',
                        length: 228,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[136],
                        title: "Desert Eagle",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/04+Desert+Eagle.mp3',
                        length: 266,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[137],
                        title: "Everest",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/05+Everest.mp3',
                        length: 251,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[138],
                        title: "Bustelo",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/06+Bustelo.mp3',
                        length: 147,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[139],
                        title: "Breaking Away",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/07+Breaking+Away.mp3',
                        length: 260,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[140],
                        title: "Lapland",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/08+Lapland.mp3',
                        length: 297,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[141],
                        title: "Germany to Germany",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/09+Germany+To+Germany.mp3',
                        length: 218,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[142],
                        title: "Spanish Armada",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/10+Spanish+Armada.mp3',
                        length: 179,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[143],
                        title: "Cherry",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Ratatat/11+Cherry.mp3',
                        length: 338,
                        album: albumIds[13]
                      },
                      {
                        _id: songIds[144],
                        title: "Collapse",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/01+Collapse.mp3',
                        length: 73,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[145],
                        title: "Typical",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/02+Typical.mp3',
                        length: 252,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[146],
                        title: "After We Have Left Our Homes",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/03+After+We+Have+Left+Our+Homes.mp3',
                        length: 74,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[147],
                        title: "Chaos",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/04+Chaos.mp3',
                        length: 294,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[148],
                        title: "Noticed",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/05+Noticed.mp3',
                        length: 269,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[149],
                        title: "Plan B",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/06+Plan+B.mp3',
                        length: 286,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[150],
                        title: "Stare At The Sun",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/07+Stare+At+The+Sun.mp3',
                        length: 273,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[151],
                        title: "Obsolete",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/08+Obsolete.mp3',
                        length: 270,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[152],
                        title: "Break The Same",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/09+Break+The+Same.mp3',
                        length: 360,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[153],
                        title: "You Are Mine",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/10+You+Are+Mine.mp3',
                        length: 283,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[154],
                        title: "Control",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/11+Control.mp3',
                        length: 279,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[155],
                        title: "Picture",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/12+Picture.mp3',
                        length: 326,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[156],
                        title: "Stall Out",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/13+Stall+Out.mp3',
                        length: 430,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[157],
                        title: "Reset",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Mute+Math/14+Reset.mp3',
                        length: 325,
                        album: albumIds[14]
                      },
                      {
                        _id: songIds[158],
                        title: "Around The World",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/01+Around+The+World.mp3',
                        length: 239,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[159],
                        title: "Parallel Universe",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/02+Parallel+Universe.mp3',
                        length: 269,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[160],
                        title: "Scartissue",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/03+Scartissue.mp3',
                        length: 216,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[161],
                        title: "Otherside",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/04+Otherside.mp3',
                        length: 256,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[162],
                        title: "Get On Top",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/05+Get+On+Top.mp3',
                        length: 198,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[163],
                        title: "Californication",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/06+Californication.mp3',
                        length: 330,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[164],
                        title: "Easily",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/07+Easily.mp3',
                        length: 231,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[165],
                        title: "Porcelain",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/08+Porcelain.mp3',
                        length: 164,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[166],
                        title: "Emit Remmu",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/09+Emit+Remmus.mp3',
                        length: 240,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[167],
                        title: "I Like Dirt",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/10+I+Like+Dirt.mp3',
                        length: 158,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[168],
                        title: "This Velvet Glove",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/11+This+Velvet+Glove.mp3',
                        length: 225,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[169],
                        title: "Savior",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/12+Savior.mp3',
                        length: 293,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[170],
                        title: "Purple Stain",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/13+Purple+Stain.mp3',
                        length: 254,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[171],
                        title: "Right On Time",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/14+Right+On+Time.mp3',
                        length: 113,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[172],
                        title: "Road Trippin'",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Californication/15+Road+Trippin\'.mp3',
                        length: 205,
                        album: albumIds[15]
                      },
                      {
                        _id: songIds[173],
                        title: "How We Get Along",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/01+How+we+get+along.mp3',
                        length: 74,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[174],
                        title: "The Influence",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/02+The+influence.mp3',
                        length: 236,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[175],
                        title: "Great Expectations",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/03+Great+expectations.mp3',
                        length: 218,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[176],
                        title: "Quality Intro",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/04+Quality+intro.mp3',
                        length: 31,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[177],
                        title: "Quality Control",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/05+Quality+control.mp3',
                        length: 289,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[178],
                        title: "Contact",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/06+Contact.mp3',
                        length: 76,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[179],
                        title: "Lausd",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/07+Lausd.mp3',
                        length: 248,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[180],
                        title: "World of Entertainment",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/08+World+of+entertainment.mp3',
                        length: 238,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[181],
                        title: "Monkey Bars",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/09+Monkey+bars.mp3',
                        length: 246,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[182],
                        title: "Jurass Finish First",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/10+Jurass+finish+first.mp3',
                        length: 275,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[183],
                        title: "Contribution",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/11+Contribution.mp3',
                        length: 226,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[184],
                        title: "Twelve",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/12+Twelve.mp3',
                        length: 265,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[185],
                        title: "The Game",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/13+The+game.mp3',
                        length: 274,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[186],
                        title: "Concrete and Clay",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/14+Concrete+and+clay.mp3',
                        length: 209,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[187],
                        title: "Swing Set",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Quality+Control/15+Swing+set.mp3',
                        length: 319,
                        album: albumIds[16]
                      },
                      {
                        _id: songIds[188],
                        title: "Prologue",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/01+Prologue.mp3',
                        length: 265,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[189],
                        title: "The Mummers' Dance",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/02+The+Mummers\'+Dance.mp3',
                        length: 369,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[190],
                        title: "Skellig",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/03+Skellig.mp3',
                        length: 368,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[191],
                        title: "Marco Polo",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/04+Marco+Polo.mp3',
                        length: 319,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[192],
                        title: "The Highwayman",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/05+The+Highwayman.mp3',
                        length: 621,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[193],
                        title: "La Serenissima",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/06+La+Serenissima.mp3',
                        length: 310,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[194],
                        title: "Night Ride Across the Caucasus",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/07+Night+Ride+Across+the+Caucasus.mp3',
                        length: 513,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[195],
                        title: "Dante's Prayer",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/The+Book+of+Secrets/08+Dante\'s+Prayer.mp3',
                        length: 431,
                        album: albumIds[17]
                      },
                      {
                        _id: songIds[196],
                        title: "Everything is Everything",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/01+Everything+Is+Everything.mp3',
                        length: 180,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[197],
                        title: "Run Run Run",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/02+Run+Run+Run.mp3',
                        length: 230,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[198],
                        title: "I'm An Actor",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/03+I\'m+An+Actor.mp3',
                        length: 153,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[199],
                        title: "Love For Granted",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/04+Love+For+Granted.mp3',
                        length: 265,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[200],
                        title: "Victim of the Crime",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/05+Victim+Of+The+Crime.mp3',
                        length: 242,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[201],
                        title: "(You Can't Blame it On) Anybody",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/06+(You+Can\'t+Blame+It+On)+Anybody.mp3',
                        length: 214,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[202],
                        title: "Congratulations",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/07+Congratulations.mp3',
                        length: 73,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[203],
                        title: "If It's Not With You",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/08+If+It\'s+Not+With+You.mp3',
                        length: 237,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[204],
                        title: "Holdin' On Together",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/09+Holdin\'+On+Together.mp3',
                        length: 207,
                        album: albumIds[18]
                      },
                      {
                        _id: songIds[205],
                        title: "Alphabetical",
                        audio_url: 'https://streamworks-songs.s3.us-east-2.amazonaws.com/Alphabetical/10+Alphabetical.mp3',
                        length: 456,
                        album: albumIds[18]
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