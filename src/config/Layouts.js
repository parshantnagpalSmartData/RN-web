/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 9 January 2019
 * @author:Parshant Nagpal
 */

import React from "react";
import { View } from "react-native";
import SideMenu from "../components/SideMenu";
import Loader from "../components/Common/Loader";

// import Footer from './Footer';
/*************** Front Layout ***************/

export const frontLayout = props => {
  return (
    <View style={{ flex: 1 }}>
      {props.children}
      <Loader />
    </View>
  );
};

/*************** Dashboard Layout ***************/

export const dashboardLayout = props => {
  let isToggleOpen = false;
  let {
    isLogin,
    match: { path },
    history
  } = props.children.props;
  return (
    <View style={{ flex: 1 }}>
      {isLogin ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div id="leftMenuBar" className="leftContainer">
            <SideMenu />
          </div>
          <div className="rightContentContainer">
            <a
              href="javascript:void(0)"
              className="menuToggle"
              onClick={() => {
                if (path === "/MessageDetails") {
                  history.goBack();
                  return;
                }
                var element = document.getElementById("leftMenuBar");
                if (isToggleOpen) {
                  isToggleOpen = false;
                  element.classList.remove("toggleMenu");
                } else {
                  isToggleOpen = true;
                  element.classList.add("toggleMenu");
                }
              }}
            >
              {path !== "/MessageDetails" ? (
                <div>
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                  <i className="fa fa-angle-left" aria-hidden="true" />
                )}
            </a>
            {props.children}
            <Loader />
          </div>
        </View>
      ) : null}
    </View>
  );
};
