import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
// import { onError } from "apollo-link-error";
import {HashRouter} from 'react-router-dom';
import { VERIFY_USER } from './graphql/mutations';
import { Provider } from 'react-redux';
import { store } from './util/redux_config';

// change the connection uri based on whether it's a production or development launch
let connectionUri = null;
if (process.env.NODE_ENV === "production") {
  connectionUri = `/graphql`;
} else {
  connectionUri = "http://localhost:5000/graphql";
} 

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: connectionUri,
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

if (token) {
  client
    // use the VERIFY_USER mutation directly use the returned data to know if the returned
    // user is loggedIn
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}



// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
// });



const Root = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
