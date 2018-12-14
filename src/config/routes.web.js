/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React from "react";
import { Router, Route, Link } from "react-router-dom";
import SignIn from "../container/auth/Login";
import ForgotPassword from "../container/auth/ForgotPassword";
import Screen2 from "../container/Screen2";

import history from "../utilities/history";
export default (routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/Screen2" component={Screen2} />
      </div>
    </Router>
  );
});
