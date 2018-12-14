/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React from "react";
import { Router, Route, Link } from "react-router-dom";
import SignIn from "../container/auth/Login";
import Screen2 from "../container/Screen2";

import history from "../utilities/history";
export default (routes = () => {
  return (
    <Router history={history}>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={SignIn} />
        <Route path="/Screen2" component={Screen2} />
        {/* <Route path="/topics" component={Topics} /> */}
      </div>
    </Router>
  );
});

