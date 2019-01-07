/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 19 April 2018
 * @author: Monika Rani
 */

import React from "react";
import { View } from "react-native";
import SideMenu from "../../container/SideMenu";
// import Footer from './Footer';
/*************** Front Layout ***************/

export const frontLayout = props => {
  return <View style={{ flex: 1 }}>{props.children}</View>;
};

/*************** Dashboard Layout ***************/

export const dashboardLayout = props => {
  let { isLogin } = props.children.props;
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
          <View style={{ flex: 0.25 }}>
            <SideMenu />
          </View>
          <View
            style={{
              flex: 0.75,
              justifyContent: "center"
            }}
          >
            {props.children}
          </View>
        </View>
      ) : null}
    </View>
  );
};
