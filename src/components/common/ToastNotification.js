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
  Platform,
  Easing
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const MyToastNotification = props => {
  let { type, message, closeToast } = props; // type 1 for error, 2=for Notification
  let primaryColor =
    type == Constants.AppConstants.Notificaitons.Error
      ? Constants.Colors.Error
      : Constants.Colors.Sucess;
  let image =
    type == Constants.AppConstants.Notificaitons.Error
      ? Constants.Images.Error
      : Constants.Images.Success;
  let heading =
    type == Constants.AppConstants.Notificaitons.Success ? "Sucess" : "Error";
  return (
    <View style={Styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: moderateScale(40)
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
                justifyContent: "flex-start",
                ...Platform.select({
                  web: {
                    width: moderateScale(170)
                  }
                })
              }}
            >
              <Text style={Styles.heading}>{heading}</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={Styles.message}
              >
                {message}
              </Text>
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
    this.animatedValue = new Animated.Value(-100);
  }

  callToast() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 100
    }).start(this.closeToast());
  }

  closeToast() {
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear
      }).start();
      this.hideToast();
    }, 3000);
  }

  hideToast = () => {
    this.props.appAction.hideToast();
  };

  render() {
    let { notification } = this.props;
    let { isVisible, type, message } = notification;
    if (isVisible) {
      this.callToast();
      return (
        <Animated.View
          style={[
            {
              transform: [{ translateY: this.animatedValue }],
              height: 0,
              position: "relative",
              left: 0,
              top: 0,
              right: 0,
              justifyContent: "center",
              backgroundColor: Constants.Colors.Transparent,
              alignItems: "center",
              zIndex: 999,
              ...Platform.select({
                android: {
                  height: 200,
                  opacity: 1
                },
                web: {
                  position: "absolute"
                }
              })
            }
          ]}
        >
          <MyToastNotification
            type={type}
            message={message}
            closeToast={this.hideToast}
          />
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.Transparent,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 99,
    ...Platform.select({
      web: {
        top: moderateScale(50),
        right: moderateScale(0)
      },
      ios: {
        bottom: moderateScale(50)
      },
      android: { bottom: moderateScale(50) }
    })
    // flex: 1
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
    flexWrap: "wrap",
    fontSize: moderateScale(11),
    color: Constants.Colors.White,
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(5)
  }
});

const mapStateToProps = state => ({
  notification: state.app.notification
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastNotification);
