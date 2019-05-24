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
