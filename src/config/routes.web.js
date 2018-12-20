/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React, { Component } from "react";
import { Router, Switch } from "react-router-dom";
import { dashboardLayout, frontLayout } from "../container/Layout";
import { connect } from "react-redux";

import AppRoute from "./AppRoute";
import SignIn from "../container/auth/Login";
import ForgotPassword from "../container/auth/ForgotPassword";
import NotFound from "../container/errors/NotFound";
import Home from "../container/Home";
import MessageCenter from "../container/MessageCenter";
import MyProfile from "../container/MyProfile";
import OpenShift from "../container/OpenShift";
import PotientialCases from "../container/PotientialCases";
import PrintableForms from "../container/PrintableForms";
import ResetPassword from "../container/ResetPassword";
import history from "../utilities/history";
/******** Check authentications ********/
// const requireAuth = () => {
//   if (!state.user.isLoggedIn && history.location.pathname !== "/") {
//     history.push("/");
//   } else if (state.user.isLoggedIn && history.location.pathname === "/Home") {
//     history.push("/Home");
//   }
// };
class Routes extends Component {
  constructor(props) {
    super(props);
  }
  requireAuth = () => {
    let { isLoggedIn } = this.props.user;
    // console.log("pathname", history.location.pathname);
    if (!isLoggedIn && history.location.pathname !== "/") {
      history.push("/");
    } else if (
      isLoggedIn &&
      (history.location.pathname === "/" ||
        history.location.pathname === "/Home")
    ) {
      history.push("/Home");
    } else if (isLoggedIn && history.location.pathname !== "/Home") {
      history.push(history.location.pathname);
    }
  };
  render() {
    let { isLoggedIn } = this.props.user;
    return (
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={SignIn}
            requireAuth={this.requireAuth}
            layout={frontLayout}
            // isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/ForgotPassword"
            component={ForgotPassword}
            requireAuth={this.requireAuth}
            layout={frontLayout}
            // isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/Home"
            component={Home}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MessageCenter"
            component={MessageCenter}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MyProfile"
            component={MyProfile}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/OpenShift"
            component={OpenShift}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />{" "}
          <AppRoute
            exact
            path="/PotientialCases"
            component={PotientialCases}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />{" "}
          <AppRoute
            exact
            path="/PrintableForms"
            component={PrintableForms}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />{" "}
          <AppRoute
            exact
            path="/ResetPassword"
            component={ResetPassword}
            requireAuth={this.requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            component={NotFound}
            layout={frontLayout}
            isLogin={isLoggedIn}
            requireAuth={this.requireAuth}
          />
          {/* <AppRoute
            component={NotFound}
            layout={frontLayout}
            isLogin={isLoggedIn}
            requireAuth={this.requireAuth}
          /> */}
          {/* <Route exact path="/" component={SignIn} />
          <Route exact path="/" component={} />
          <Route exact path="/Screen2" component={Screen2} />
          <Route exact path="/Home" component={Home} /> */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Routes);
