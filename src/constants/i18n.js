/*
 * @file: i18n.js
 * @description: App i18n Localization
 * @date: 9 Jan 2019
 * @author: Parshant Nagpal
 * */
import AppConstants from "./AppConstants";
("use strict");

let Strings = {
  Common: {
    EmptyEmailMsg: "Enter your email address.",
    ValidEmailAddress: "Enter valid email address.",
    EnterPassword: "Enter your password.",
    EnterOTP: "Enter OTP.",
    OldPassword: "Enter your old password.",
    NewPassword: "Enter your new password.",
    confirmPassword: "Confirm your new password.",
    PasswordNotMatched: "Your Password Not Matched.",
    OTPDigit: "OTP must be 4 digit."
  },
  Error: {},
  Sucess: {
    likeIndicator: "Case added to favourites."
  },
  Permissions: {
    Locations:
      "Location access permission is denied for " +
      AppConstants.AppName +
      ",Please enable it from the settings",
    Camera:
      "Camera access permission is denied for " +
      AppConstants.AppName +
      ",Please enable it from the settings",
    Gallery:
      "Gallery access permission is denied for " +
      AppConstants.AppName +
      ",Please enable it from the settings"
  },
  MySchedule: {
    SchdeularName: "Scheduler Name"
  }
};

module.exports = Strings;
