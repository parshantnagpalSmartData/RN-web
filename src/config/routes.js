import { Navigation } from "react-native-navigation";

export const registerScreens = (store, Provider) => {
  // Loader Stack
  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/Loader").default,
    Provider,
    store
  );
  // Auth stack
  Navigation.registerComponentWithRedux(
    "SignIn",
    () => require("../container/auth/Login").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "ForgotPassword",
    () => require("../container/auth/ForgotPassword").default,
    Provider,
    store
  );
  // Dashboard Stack
  Navigation.registerComponentWithRedux(
    "Home",
    () => require("../container/Home").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "MessageCenter",
    () => require("../container/MessageCenter").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "MyProfile",
    () => require("../container/MyProfile").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "OpenShift",
    () => require("../container/OpenShift").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "PotientialCases",
    () => require("../container/PotientialCases").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "PrintableForms",
    () => require("../container/PrintableForms").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "ResetPassword",
    () => require("../container/ResetPassword").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => require("../container/SideMenu").default,
    Provider,
    store
  );
  // Navigation.registerComponentWithRedux(
  //   "ToastNotification",
  //   () => require("../components/common/ToastNotification").default,
  //   Provider,
  //   store
  // );
};
