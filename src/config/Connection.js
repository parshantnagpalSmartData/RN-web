/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 13.12.2018
 * @author: Suraj Sanwal
 * */
/* eslint-disable */
"use strict";
const localhost = {
  smartdata: "172.24.4.48:3010"
};
const frontEndLocal = "172.24.4.48:4200";
const frontEndStaging = "stagingsdei.com:4201";
const apiServer = "api.acthomehealthservices.us";
const live = "176.126.246.61";
const apiPath = "api";

//uncomment these four line for use staging

const running_url = apiServer,
  frontEndUrl = `https://${frontEndStaging}`,
  http_url = `https://${running_url}`,
  apiBase_url = `https://${running_url}/`;

export default class Connection {
  static getResturl() {
    return apiBase_url;
  }
  static getCmsUrl() {
    return frontEndUrl;
  }
  static getBaseUrl() {
    return http_url;
  }
  static getSuccessUrl() {
    return `${apiBase_url}success.html`;
  }
  static getErroUrl() {
    return `${apiBase_url}failure.html`;
  }
}
