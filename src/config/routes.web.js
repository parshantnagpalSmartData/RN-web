/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import history from "../helpers/history";

import AppRoute from "./AppRoute";
import { frontLayout, dashboardLayout } from "./Layouts";

import SignIn from "../container/Auth/Login";
import ForgotPassword from "../container/Auth/ForgotPassword";
import NotFound from "../container/Errors/NotFound";
import MySchedule from "../container/MySchedule";
import OpenShift from "../container/OpenShift";
import PotientialCases from "../container/PotentialCases";
import PrintableForms from "../container/PrintableForms";
import MyProfile from "../container/MyProfile";
import MessageCenter from "../container/MessageCenter";
import ResetPassword from "../container/ResetPassword";
import OTPScreen from "../container/Auth/OTPScreen";
import PDFViewer from "../container/PrintableForms/PDFViewer";

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
            path="/OTPScreen"
            component={OTPScreen}
            //  requireAuth={requireAuth}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MySchedule"
            component={MySchedule}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/OpenShift"
            component={OpenShift}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/PrintableForms"
            component={PrintableForms}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/PDFViewer"
            component={PDFViewer}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/PotientialCases"
            component={PotientialCases}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MessageCenter"
            component={MessageCenter}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />

          <AppRoute
            exact
            path="/MyProfile"
            component={MyProfile}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/ResetPassword"
            component={ResetPassword}
            //  requireAuth={requireAuth}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          {/* <Route exact path="/DashBoard" component={Screen2} /> */}
          <Route component={NotFound} />
          {/* <Route path="/ToastNotification" component={ToastNotification} /> */}
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
