import gql from "graphql-tag";

export const FETCH_USER = gql`
  query FetchUser($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      email
      
    }
  }
`;

// export const FETCH_USER = gql`
//   {
//     user {
//       _id
//       name
//       email
//       albums
//       artists
//       songs
//       playlists
//     }
//   }
// `;

export const FETCH_ALBUMS = gql`
  {
    albums {
      _id
      title
      album_art_url
      artist {
        _id
        name
        genre
        bio
        artist_image_url
      }
      songs {
        title
      }
    }
  }
`;

export const FETCH_ALBUM = gql`
  query FetchAlbum($id: ID!) {
    album(_id: $id) {
      _id
      title
      album_art_url
      artist {
        _id
        name
        genre
        bio
        artist_image_url
      }
      songs {
        _id
        title
        length
        audio_url
      }
    }
  }
`;

export const FETCH_ARTISTS = gql`
  {
    artists {
      _id
      name
      genre
      bio
      artist_image_url
      albums {
        _id
      title
      album_art_url
      }
    }
  }
`;

export const FETCH_ARTIST = gql`
  query FetchArtist($id: ID!) {
    artist(_id: $id) {
      _id
      name
      genre
      bio
      artist_image_url
       albums {
        _id
        title
        album_art_url
      }
    }
  }
`;

export const FETCH_SONGS = gql`
  {
    songs {
      _id
      title
      length
      audio_url
    }
  }
`;

export const FETCH_SONG = gql`
  query FetchSong($id: ID!) {
    artist(_id: $id) {
      _id
      title
      length
      audio_url
    }
  }
`;

export const FETCH_USER_LIBRARY = gql`
  query FetchUser($id: ID!) {
    user(id: $id) {
      _id
      albums {
        _id
        title
        album_art_url
        songs {
          _id
          title
          length
          audio_url
        }
      }
      artists {
        _id
        name
        genre
        bio
        artist_image_url
      }
      songs {
        _id
        title
        length
        audio_url
      }
      playlists {
        _id
        title
        songs {
          _id
          title
          length
          audio_url
        }
      }
    }
  }
`;

export const FETCH_PLAYLIST = gql`
  query FetchPlaylist($id: ID!) {
    playlist(_id: $id) {
      _id
      title
      songs {
        _id
        title
        length
        audio_url
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
