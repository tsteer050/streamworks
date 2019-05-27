import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      loggedIn
      _id
      name
      email
    }
  }
`;

export const CREATE_ALBUM = gql`
  mutation FetchAlbums($title: String!, $album_art_url: String!) {
    newAlbum(title: $title, album_art_url: $album_art_url) {
      _id
      title
      album_art_url
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

// export const GET_CURRENTUSER_ID = gql`
//   mutation VerifyUser($token: String!) {
//     verifyUser(token: $token) {
//       loggedIn
//     }
//   }
// `;

export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($title: String!) {
    newPlaylist(title: $title) {
      _id,
      title
    }
  }
`;


export const ADD_USER_ALBUM = gql`
  mutation AddUserAlbum($userId: ID!, $albumId: ID!) {
    addUserAlbum(userId: $userId, albumId: $albumId) {
      _id
      albums {
        _id
      }
    }
  }
`;

export const REMOVE_USER_ALBUM = gql`
  mutation RemoveUserAlbum($userId: ID!, $albumId: ID!) {
    removeUserAlbum(userId: $userId, albumId: $albumId) {
      _id
      albums {
        _id
      }
    }
  }
`;

export const ADD_USER_ARTIST = gql`
  mutation AddUserArtist($userId: ID!, $artistId: ID!) {
    addUserArtist(userId: $userId, artistId: $artistId) {
      _id
      artists {
        _id
      }
    }
  }

`;

export const REMOVE_USER_ARTIST = gql`
  mutation RemoveUserArtist($userId: ID!, $artistId: ID!) {
    removeUserArtist(userId: $userId, artistId: $artistId) {
      _id
      artists {
        _id
      }
    }
  }

`;

export const ADD_USER_SONG = gql`
  mutation AddUserSong($userId: ID!, $songId: ID!) {
    addUserSong(userId: $userId, songId: $songId) {
      _id
      songs {
        _id
      }
    }
  }

`;

export const REMOVE_USER_SONG = gql`
  mutation RemoveUserSong($userId: ID!, $songId: ID!) {
    removeUserSong(userId: $userId, songId: $songId) {
      _id
      songs {
        _id
      }
    }
  }

`;

