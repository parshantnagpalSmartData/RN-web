/**
 * @author Suraj Sanwal
 * @name MessageComponent.js
 * @description Contains the Message component.
 * @date 24 Jan 2019
 */

import React from "React";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Swipeout from "react-native-swipeout";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const rightButtons = [
  {
    component: (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={Constants.Colors.ButtonGradients}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: moderateScale(60)
        }}
      >
        <Image
          source={Constants.Images.Delete}
          style={{
            height: moderateScale(27),
            width: moderateScale(17)
          }}
        />
      </LinearGradient>
    )
  }
];
const MessageComponent = ({ data, enableScrollingFunction, onOpen }) => {
  return (
    <FlatList
      key={item => item.MessageID}
      data={data}
      contentContainerStyle={Styles.contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <Swipeout
            close
            autoClose
            key={index}
            right={rightButtons}
            sensitivity={1000}
            scroll={data => {
              enableScrollingFunction(data);
            }}
            /*  eslint-disable-next-line */
            onOpen={(sectionID, rowId, direction) => {
              onOpen(direction, item);
            }}
          >
            <View style={Styles.Swipeout}>
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
                    {`${item.Sender_LastName} ${item.Sender_FirstName}`}
                  </Text>
                  <Text style={Styles.timeText}>4 Mins</Text>
                </View>
                <Text style={Styles.MessageSubject}>{item.MessageSubject}</Text>
              </View>
            </View>
          </Swipeout>
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  contentContainerStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT * 0.75,
    justifyContent: "flex-start"
  },
  Swipeout: {
    height: moderateScale(60),
    width: Constants.BaseStyle.DEVICE_WIDTH,
    flexDirection: "row",
    marginVertical: moderateScale(1),
    padding: moderateScale(5),
    backgroundColor: Constants.Colors.White,
    justifyContent: "flex-start",
    alignItems: "center"
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
    flex: 1,
    padding: moderateScale(5)
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
    color: Constants.Colors.Primary
  },
  MessageSubject: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(12),
    color: Constants.Colors.Black
  }
});

export default MessageComponent;

MessageComponent.defaultProps = {
  data: null,
  enableScrollingFunction: null
};

MessageComponent.propTypes = {
  data: PropTypes.array,
  enableScrollingFunction: PropTypes.func
};
