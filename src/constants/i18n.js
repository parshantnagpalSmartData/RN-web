/*
 * @file: i18n.js
 * @description: App i18n Localization
 * */
import AppCosntants from "./AppConstants";
("use strict");

let Strings = {
  Common: {
    EmptyEmailMsg: "Please enter an email address.",
    ValidEmailAddress: "Please enter a valid email address.",
    EnterPassword: "Please enter a password.",
    EnterOTP: "Please enter a OTP.",
    MinPersonRide: "Please enter number of persons to continue ride.",
    MaxPersonRide: "Minimum 1 and maximum 20 person can travelle in a ride",
    VaildDigit: "No of persons must be between 1-20",
    OldPassword: "Please enter old password.",
    NewPassword: "Please enter new password.",
    confirmPassword: "Please confirm new password.",
    PasswordNotMatched: "Your new Password Not Matched."
  },
  Error: {},
  Permissions: {
    Locations:
      "Location access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings",
    Camera:
      "Camera access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings",
    Gallery:
      "Gallery access permission is denied for " +
      AppCosntants.AppName +
      ",Please enable it from the settings"
  }
};

module.exports = Strings;
