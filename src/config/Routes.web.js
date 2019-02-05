/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appAction from "../actions";
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
import Resources from "../container/Resources";
import MyProfile from "../container/MyProfile";
import MessageCenter from "../container/MessageCenter";
import ResetPassword from "../container/ResetPassword";
import OTPScreen from "../container/Auth/OTPScreen";
import PDFViewer from "../container/PrintableForms/PDFViewer";
import MessageDetails from "../container/MessageCenter/MessageDetails";

class Routes extends Component {
  componentDidMount() {
    let { isLoggedIn } = this.props,
      { pathname } = history.location;
    if (isLoggedIn) {
      // Setting the current side menu selected in reducer
      this.props.appAction.setCurrentSideMenuRoute(
        pathname.substring(1, pathname.length)
      );
    }
  }
  render() {
    let { isLoggedIn } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={SignIn}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/ForgotPassword"
            component={ForgotPassword}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/OTPScreen"
            component={OTPScreen}
            layout={frontLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MySchedule"
            component={MySchedule}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/OpenShift"
            component={OpenShift}
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
            path="/Resources"
            component={Resources}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/PDFViewer"
            component={PDFViewer}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/PotientialCases"
            component={PotientialCases}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MessageCenter"
            component={MessageCenter}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MessageDetails"
            component={MessageDetails}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/MyProfile"
            component={MyProfile}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <AppRoute
            exact
            path="/ResetPassword"
            component={ResetPassword}
            layout={dashboardLayout}
            isLogin={isLoggedIn}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
