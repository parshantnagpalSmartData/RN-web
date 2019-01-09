/**
 * Name :Parshant Nagpal
 * Description: Contains all redux store configuration of web
 * date: 7 Seopt 2018
 */
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./../reducers";
import { createLogger } from "redux-logger";
import promise from "./promise";
import array from "./array";
import whitelist from "./whitelist";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
// import * as AppAction from "./../actions";
// import history from "../utilities/history";

const persistConfig = {
  key: "root",
  storage,
  whitelist
};
export default function setup() {
  const logger = createLogger();

  const middleware = [applyMiddleware(...[thunk, promise, array, logger])];
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    middleware.push(
      applyMiddleware(require("redux-immutable-state-invariant").default())
    );
  }
  const reducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, {}, compose(...middleware));

  // Attach the store to the Chrome debug window
  if (global.isDebuggingInChrome) {
    // eslint-disable-line
    window.store = store;
  }
  const persistor = persistStore(store, null, () => {
    // console.log("newstore", store.getState().user.isLoggedIn,history);
    // console.log("historyyyy",history)
    // if (store.getState().user.isLoggedIn &&  history.location.pathname == '/') {
    //     store.dispatch(AppAction.pushTParticulatScreen("/Home"));
    // } else if (!store.getState().user.isLoggedIn && (history.location.pathname !== '/' &&  history.location.pathname !== 'ForgotPassword')) {
    //     store.dispatch(AppAction.pushTParticulatScreen("/"));
    // }
  });
  return { persistor, store };
}
