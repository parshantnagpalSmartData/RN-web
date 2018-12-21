/*
 * @file: AppRoute.js
 * @description: Defined all routers
 * @date: 19 April 2018
 * @author: Monika Rani
 */

/************ React Pages according to layouts  *****************/

import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  //  requireAuth: requireAuth,
  isLogin: isLogin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        // requireAuth();
        if (
          isLogin &&
          (props.location.pathname === "/" ||
            props.location.pathname === "/ForgotPassword")
        ) {
          return (
            <Redirect
              to={{
                pathname: "/Home",
                state: { from: props.location }
              }}
            />
          );
        }
        return (
          <Layout>
            <Component {...props} isLogin={isLogin} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
