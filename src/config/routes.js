/*
 * @file: Connection.js
 * @description: contains all routes for app
 * @date: 9 Jan 2019
 * @author: Parshant Nagpal
 * */

import React from "react";
import { Navigation } from "react-native-navigation";
import { View } from "react-native";
import { Provider } from "react-redux";
import setup from "../store/setup";

import SignIn from "../container/auth/Login";
import ForgotPassword from "../container/auth/ForgotPassword";
import Loading from "../components/common/Loader";
import MySchedule from "../container/mySchedule";
import OpenShift from "../container/OpenShift";
import PotientialCases from "../container/PotentialCases";
import PrintableForms from "../container/PrintableForms";
import MyProfile from "../container/myProfile/MyProfile";
import MessageCenter from "../container/MessageCenter";
import ResetPassword from "../container/ResetPassword";
import OTPScreen from "../container/auth/OTPScreen";
import SideMenu from "../container/SideMenu";
import ToastNotification from "../components/common/ToastNotification";

const store = setup();
/* eslint-disable */
/**
 * HOC for wrapping toast and loader
 */

const WrapScreen = ReduxScreen => props => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <ReduxScreen {...props} />
      <ToastNotification />
      <Loading />
    </View>
  </Provider>
);

/* eslint-enable */

export const registerScreens = () => {
  // Auth stack
  Navigation.registerComponent(
    "SignIn",
    () => WrapScreen(SignIn),
    () => SignIn
  );
  Navigation.registerComponent(
    "ForgotPassword",
    () => WrapScreen(ForgotPassword),
    () => ForgotPassword
  );
  // Dashboard Stack
  Navigation.registerComponent(
    "MySchedule",
    () => WrapScreen(MySchedule),
    () => MySchedule
  );
  Navigation.registerComponent(
    "MessageCenter",
    () => WrapScreen(MessageCenter),
    () => MessageCenter
  );
  Navigation.registerComponent(
    "MyProfile",
    () => WrapScreen(MyProfile),
    () => MyProfile
  );
  Navigation.registerComponent(
    "OpenShift",
    () => WrapScreen(OpenShift),
    () => OpenShift
  );
  Navigation.registerComponent(
    "PotientialCases",
    () => WrapScreen(PotientialCases),
    () => PotientialCases
  );
  Navigation.registerComponent(
    "PrintableForms",
    () => WrapScreen(PrintableForms),
    () => PrintableForms
  );
  Navigation.registerComponent(
    "ResetPassword",
    () => WrapScreen(ResetPassword),
    () => ResetPassword
  );

  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => SideMenu,
    Provider,
    store
  );
  Navigation.registerComponent(
    "OTPScreen",
    () => WrapScreen(OTPScreen),
    () => OTPScreen
  );
};
