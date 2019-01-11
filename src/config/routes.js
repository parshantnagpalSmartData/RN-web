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
// import setup from "../store/setup";

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

// const store = setup();
/* eslint-disable */
/**
 * HOC for wrapping toast and loader
 */

const WrapScreen = (ReduxScreen, store) => props => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <ReduxScreen {...props} />
      <ToastNotification />
      <Loading />
    </View>
  </Provider>
);

/* eslint-enable */

export const registerScreens = store => {
  // Auth stack
  Navigation.registerComponent(
    "SignIn",
    () => WrapScreen(SignIn, store),
    () => SignIn
  );
  Navigation.registerComponent(
    "ForgotPassword",
    () => WrapScreen(ForgotPassword, store),
    () => ForgotPassword
  );
  // Dashboard Stack
  Navigation.registerComponent(
    "MySchedule",
    () => WrapScreen(MySchedule, store),
    () => MySchedule
  );
  Navigation.registerComponent(
    "MessageCenter",
    () => WrapScreen(MessageCenter, store),
    () => MessageCenter
  );
  Navigation.registerComponent(
    "MyProfile",
    () => WrapScreen(MyProfile, store),
    () => MyProfile
  );
  Navigation.registerComponent(
    "OpenShift",
    () => WrapScreen(OpenShift, store),
    () => OpenShift
  );
  Navigation.registerComponent(
    "PotientialCases",
    () => WrapScreen(PotientialCases, store),
    () => PotientialCases
  );
  Navigation.registerComponent(
    "PrintableForms",
    () => WrapScreen(PrintableForms, store),
    () => PrintableForms
  );
  Navigation.registerComponent(
    "ResetPassword",
    () => WrapScreen(ResetPassword, store),
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
    () => WrapScreen(OTPScreen, store),
    () => OTPScreen
  );
};
