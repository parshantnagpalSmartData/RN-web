import React from "react";
import { View } from "react-native";
import { Navigation } from "react-native-navigation";
import { Toast } from "react-native-redux-toast";
import { Provider } from "react-redux";
import setup from "../store/setup";

import SignIn from "../container/auth/Login";
import ForgotPassword from "../container/auth/ForgotPassword";
import Loader from "../container/Loader";
import Loading from "../components/common/Loader";
import Home from "../container/Home";
import OpenShift from "../container/OpenShift";
import PotientialCases from "../container/PotientialCases";
import PrintableForms from "../container/PrintableForms";
import MyProfile from "../container/MyProfile";
import MessageCenter from "../container/MessageCenter";
import ResetPassword from "../container/ResetPassword";
import OTPScreen from "../container/auth/OTPScreen";
import SideMenu from "../container/SideMenu";

const store = setup();

/* eslint-disable */
const LoadReducxSceen = ReduxScreen => props => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <ReduxScreen {...props} />
      <Loading />
      <Toast
        messageStyle={{ color: "white" }}
        containerStyle={{ top: 100, backgroundColor: "red", flex: 1 }}
      />
    </View>
  </Provider>
);

/* eslint-enable */

export const registerScreens = () => {
  // Loader Stack
  Navigation.registerComponent(
    "Loader",
    () => LoadReducxSceen(Loader),
    () => Loader
  );
  // Auth stack
  Navigation.registerComponent(
    "SignIn",
    () => LoadReducxSceen(SignIn),
    () => SignIn
  );
  Navigation.registerComponent(
    "ForgotPassword",
    () => LoadReducxSceen(ForgotPassword),
    () => ForgotPassword
  );
  // Dashboard Stack
  Navigation.registerComponent("Home", () => LoadReducxSceen(Home), () => Home);
  Navigation.registerComponent(
    "MessageCenter",
    () => LoadReducxSceen(MessageCenter),
    () => MessageCenter
  );
  Navigation.registerComponent(
    "MyProfile",
    () => LoadReducxSceen(MyProfile),
    () => MyProfile
  );
  Navigation.registerComponent(
    "OpenShift",
    () => LoadReducxSceen(OpenShift),
    () => OpenShift
  );
  Navigation.registerComponent(
    "PotientialCases",
    () => LoadReducxSceen(PotientialCases),
    () => PotientialCases
  );
  Navigation.registerComponent(
    "PrintableForms",
    () => LoadReducxSceen(PrintableForms),
    () => PrintableForms
  );
  Navigation.registerComponent(
    "ResetPassword",
    () => LoadReducxSceen(ResetPassword),
    () => ResetPassword
  );

  Navigation.registerComponent(
    "SideMenu",
    () => LoadReducxSceen(SideMenu),
    () => SideMenu
  );
  Navigation.registerComponent(
    "OTPScreen",
    () => LoadReducxSceen(OTPScreen),
    () => OTPScreen
  );
};
