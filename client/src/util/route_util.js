import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";


// our route switches on routeType
const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        // if the route type is "auth" then this route will only render if the
        // user is not logged in - useful for authentication routes
        // like login or register
        
        if (routeType === "auth") {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
              }
            />
          );
        } else {
          // otherwise this will be a protected route which will only
          // render the component if the user is logged in
          return (
            <Route
              {...rest}
              render={props =>
                data.isLoggedIn ? (
                  <Component {...props} />
                ) : (
                     <Redirect to="/login" />
                  )
              }
            />
          );
        }
      }}
    </Query>
  );

export default AuthRoute;