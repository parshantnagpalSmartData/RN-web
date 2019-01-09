/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 9 January 2019
 * @author:Parshant Nagpal
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
          <View style={{ flex: 0.2 }}>
            <SideMenu />
          </View>
          <View
            style={{
              flex: 0.8,
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
