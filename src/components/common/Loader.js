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

import React, { Component } from "react";
import { View } from "react-native";
// import { ScaleLoader } from "halogenium";

class Loader extends Component {
  render() {
    var options = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.0,
      corners: 1,
      color: "#000",
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      top: "50%",
      left: "50%",
      shadow: false,
      hwaccel: false,
      position: "absolute"
    };
    return (
      <View style={{ position: "absolute", zIndex: 20, top: 100, left: 100 }}>
        {this.props.isShowingLoader && (
          <Loader loaded={false} options={options} className="spinner" />
        )}
      </View>
    );
  }
}

export default Loader;
