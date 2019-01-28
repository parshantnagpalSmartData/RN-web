/*
 * @file: Connection.js
 * @description: contains all constants
 * @date: 9 Jan 2019
 * @author: Parshant Nagpal
 * */
import { Platform } from "react-native";

let AppConstants = {
  AppName: "ACT Nurses Portal",
  Notificaitons: {
    Error: 1,
    Success: 2,
    Warning: 3
  },
  Error: {
    serverError:
      "The server is not reachable right now, sorry for inconvenience."
  },
  Alert: {
    Logout: "Are you sure you want to logout?"
  },
  limit: Platform.OS == "web" ? 1000 : 15
};

module.exports = AppConstants;
