/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========     Page for service hit loader      ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Constants from "../../constants";

const Loader = props => {
  let { loading } = props;
  if (loading) {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.innerView}>
          <ActivityIndicator size="large" color={Constants.Colors.Primary} />
        </View>
      </View>
    );
  } else return null;
};

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Constants.Colors.Transparent,
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: Constants.BaseStyle.DEVICE_WIDTH
  },
  innerView: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default Loader;
