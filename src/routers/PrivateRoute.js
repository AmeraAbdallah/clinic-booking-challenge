import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div className="layout">
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
