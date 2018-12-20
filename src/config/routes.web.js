/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import SignIn from "../container/auth/Login";
import ForgotPassword from "../container/auth/ForgotPassword";
import Screen2 from "../container/Screen2";
import NotFound from "../container/errors/NotFound";
import { frontLayout, dashboardLayout } from "../components/route/Layouts";
import AppRoute from "./AppRoute";
import { connect } from "react-redux";

import history from "../utilities/history";

// const routes = ({store}) => {
//   const state = store.getState();
//   console.log('storestatestatestatestatestate',state)
//   // const requireAuth = () => {
//   //    console.log('statestatestatestate',state)
// 	// 	// if (!state.user.isLoggedIn && history.location.pathname !== '/') {
//   //   //   console.log('workinggggggggg')
//   //   //   // history.push('/');
//   //   // }else if (
// 	// 	// 	state.user.isLoggedIn &&
// 	// 	// 	(history.location.pathname === '/' || history.location.pathname === '/admin')
// 	// 	// ) {
// 	// 	// 	// history.push('/Home');
// 	// 	// }
//   // };

class Routes extends Component {
  render() {
    let { isLoggedIn } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={SignIn}
            // requireAuth={requireAuth}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/ForgotPassword"
            component={ForgotPassword}
            // requireAuth={requireAuth}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          {/* <Route exact path="/" component={SignIn} /> */}
          {/* <Route exact path="/ForgotPassword" component={ForgotPassword} /> */}
          <AppRoute
            exact
            path="/Home"
            component={Screen2}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          {/* <Route exact path="/DashBoard" component={Screen2} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  null
)(Routes);
