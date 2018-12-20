/*
 * @file: Layouts.js
 * @description: Defined all Layouts for web application
 * @date: 19 Dec 2018
 * @author: Suraj Sanwal
 */

import React from "react";
import { View } from "react-native";
import SideMenu from "./SideMenu";
/************** Front Layout **************/

export const frontLayout = props => {
  return <View style={{ flex: 1 }}>{props.children}</View>;
};

/************** Dashboard Layout **************/

export const dashboardLayout = props => {
  let { isLogin } = props.children.props;
  return (
    <View style={{ flex: 1 }}>
      {isLogin ? (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.3 }}>
            <SideMenu />
          </View>
          <View style={{ flex: 0.7 }}>{props.children}</View>
        </View>
      ) : null}
    </View>
  );
};
