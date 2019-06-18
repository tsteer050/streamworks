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
         _id
        title
        audio_url
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

  query FetchUserLibrary($id: ID!) {
    user(_id: $id) {
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
        artist {
          _id
          name
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
        album {
          _id
          title
          album_art_url
          artist {
            _id
            name
          }
        }
      }
      playlists {
        _id
        title
        songs {
          _id
          title
          length
          audio_url
          album {
            _id
            title
            album_art_url
            songs {
              _id
              title
              length
              audio_url
            }
            artist {
              _id
              name
            }
          }
        }
        subscribers {
          _id
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
        album {
          _id
          title
          album_art_url
          songs {
            _id
            title
            length
            audio_url
          }
          artist {
            _id
            name
          }
        }
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const SEARCH_QUERY = gql`
  query SearchQuery($filter: String!) {
    search(filter: $filter) {
      ... on SongType {
        _id
        title
        audio_url
        length
        album {
          _id
          title
          album_art_url
          artist {
            _id
            name
            artist_image_url
          }
        }
        __typename
      }
      ... on AlbumType {
        _id
        title
        __typename
        album_art_url
        artist {
          _id
          name
        }
      }
      ... on ArtistType {
        _id
        name
        artist_image_url
        __typename
      }
    }
  }
`;
