import React from "react";
import { Provider } from "react-redux";
import AppData from "../index";
import setup from "../store/setup";
const store = setup();
export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppData />
      </Provider>
    );
  }
}
