
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/routes';
import {addListeners} from './src/utilities/listeners';
import { Provider } from "react-redux";
import setup from "./src/store/setup";
import Events from "./src/helpers/registerevents";

// console.disableYellowBox = true; // eslint-disable-line


Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  registerScreens(store, Provider);
  addListeners();
  Events.RegisterNetEvents();
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader'
      }
    },
  });
});