import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import setup from "./src/store/setup";

import Routes from "./src/config/routes";
const { persistor, store } = setup();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: window.innerWidth
    };
  }
  // componentDidMount() {
  //   // window.addEventListener("resize", this.updateDimensions.bind(this));
  // }
  // // updateDimensions() {
  // //   this.setState({ deviceWidth: window.innerWidth });
  // // }
  // /**
  //  * Remove event listener
  //  */
  // componentWillUnmount() {
  //   //  window.removeEventListener("resize", this.updateDimensions.bind(this));
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
