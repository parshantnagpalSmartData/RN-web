/*
 * @file: AppRoute.js
 * @description: Defined all routers
 * @date: 19 Dec 2018
 * @author: Suraj Sanwal
 */

/*********** React Pages according to layouts  ****************/

import React from "react";
import { Route } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  //   requireAuth: requireAuth,
  isLogin: isLogin,
  //   path: Path,
  ...rest
}) => {
  //   console.log("rest", rest, Path);
  return (
    <Route
      {...rest}
      render={props => {
        // requireAuth();
        // console.log("requiring auth");
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
