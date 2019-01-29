/**
 * Author:Parshant Nagpal
 * File Name :  MessageComponent
 * Description : Contains the message component
 */

import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";
import CheckBox from "../../components/Common/CheckBox";
import Common from "../../helpers/common";

const MessageComponent = ({
  isChecked,
  SenderLastName,
  SenderFirstName,
  MessageDate,
  MessageSubject,
  onPressIsChecked
}) => {
  return (
    <View style={Styles.Swipeout}>
      {Platform.OS == "web" && (
        <CheckBox isChecked={isChecked} onPress={onPressIsChecked} />
      )}
      <View style={Styles.userImgView}>
        <Image
          style={Styles.userImg}
          source={Constants.Images.UserAvatar}
          resizeMode={"contain"}
        />
      </View>
      <View style={Styles.messageView}>
        <View style={Styles.nameTimeView}>
          <Text style={Styles.nameText}>
            {`${SenderLastName} ${SenderFirstName}`}
          </Text>
          <Text style={Styles.timeText}>{Common.timeSince(MessageDate)}</Text>
        </View>
        <Text style={Styles.MessageSubject}>{MessageSubject}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  Swipeout: {
    height: moderateScale(60),
    width: Constants.BaseStyle.DEVICE_WIDTH,
    flexDirection: "row",
    marginVertical: moderateScale(1),
    padding: moderateScale(5),
    backgroundColor: Constants.Colors.White,
    justifyContent: "flex-start",
    alignItems: "center",
    ...Platform.select({
      web: {
        backgroundColor: "yellow"
      }
    })
  },
  userImgView: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: moderateScale(10)
  },
  userImg: {
    height: moderateScale(40),
    width: moderateScale(40)
  },
  messageView: {
    flexDirection: "column",
    padding: moderateScale(5),
    ...Platform.select({
      web: {
        backgroundColor: "red",
        height: moderateScale(50),
        width: moderateScale(200)
      },
      ios: {
        flex: 1
      },
      android: {
        flex: 1
      }
    })
  },
  nameTimeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  timeText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(11),
    color: Constants.Colors.Black
  },
  nameText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Primary,
    ...Platform.select({
      web: {
        fontSize: moderateScale(11)
      }
    })
  },
  MessageSubject: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(12),
    color: Constants.Colors.Black,
    ...Platform.select({
      web: {
        fontSize: moderateScale(16)
      }
    })
  }
});

export default MessageComponent;
