/*
Name : Parshant Nagpal  
File Name : index.js
Description : Contains the Root component for App
Date : 16 Jan 2019
*/

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/config/Routes";
import { addListeners } from "./src/helpers/listeners";
// import { Provider } from "react-redux";
import setup from "./src/store/setup";
import Events from "./src/helpers/registerevents";
import { pushNotifificationInit } from "./src/helpers/PushNotification";

// console.disableYellowBox = true; // eslint-disable-line

Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  pushNotifificationInit();
  registerScreens(store);
  addListeners();
  Events.RegisterNetEvents();
  Events.RegisterComponentDidAppearListener(store);
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true
    }
  });
});
