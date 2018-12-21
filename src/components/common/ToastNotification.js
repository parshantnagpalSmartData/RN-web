/**
 * Name :Suraj Sanwal
 * File Name : ToastNotification.js
 * Description : Contains the toast Notificaitons of the app
 * Date : 25 Sept 2018
 */
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform
} from "react-native";

import SafeView from "./SafeView";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const MyToastNotification = props => {
  let { type, message, closeToast } = props; // type 1 for error, 2=for Notification
  let primaryColor =
    type == Constants.AppCosntants.Notificaitons.Error
      ? Constants.Colors.Error
      : Constants.Colors.Sucess;
  let image =
    type == Constants.AppCosntants.Notificaitons.Error
      ? Constants.Images.Error
      : Constants.Images.Success;
  let heading =
    type == Constants.AppCosntants.Notificaitons.Success ? "Sucess" : "Error";
  return (
    <View style={Styles.container}>
      <SafeView />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={[Styles.notificationView, { backgroundColor: primaryColor }]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.imageView}>
              <Image
                style={Styles.image}
                source={image}
                resizeMode={"contain"}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start"
              }}
            >
              <Text style={Styles.heading}>{heading}</Text>
              <Text style={Styles.message}>{message}</Text>
            </View>
          </View>

          <TouchableOpacity style={Styles.imageView} onPress={closeToast}>
            <Image
              style={Styles.image}
              source={Constants.Images.Cancel}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

class ToastNotification extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(-70);
  }

  callToast() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500
    }).start(this.closeToast());
  }

  closeToast() {
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: -70,
        duration: 500
      }).start();
    }, 2000);
  }

  componentDidMount() {
    this.callToast();
  }

  render() {
    let { type, message } = this.props;
    return (
      <View>
        {/* <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this.callToast()}
              underlayColor="#ddd"
              style={{
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ededed",
                borderWidth: 1,
                borderColor: "#ddd"
              }}
            >
              <Text>Open Success Toast</Text>
            </TouchableHighlight>
          </View>
        </View> */}
        <Animated.View
          style={{
            transform: [{ translateY: this.animatedValue }],
            height: 40,
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            justifyContent: "center"
          }}
        >
          <MyToastNotification
            type={type}
            message={message}
            closeToast={this.closeToast}
          />
          {/* <Text
            style={{
              marginLeft: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            Hello from Toast!
          </Text> */}
        </Animated.View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.red,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  notificationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        width: Constants.BaseStyle.DEVICE_WIDTH * 0.8
      },
      android: { width: Constants.BaseStyle.DEVICE_WIDTH * 0.8 },
      web: {
        width: Constants.BaseStyle.DEVICE_WIDTH / 4
      }
    }),

    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10)
  },
  imageView: {
    height: moderateScale(30),
    width: moderateScale(30),
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },
  image: {
    height: moderateScale(30),
    width: moderateScale(30),
    ...Platform.select({
      web: {
        height: moderateScale(20),
        width: moderateScale(20)
      }
    })
  },
  heading: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(16),
    color: Constants.Colors.White,
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(5)
  },
  message: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(11),
    color: Constants.Colors.White,
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(5)
  }
});

export default ToastNotification;
