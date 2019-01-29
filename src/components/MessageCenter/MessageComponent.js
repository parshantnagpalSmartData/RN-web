/**
 * @author Suraj Sanwal
 * @name MessageComponent.js
 * @description Contains the Message component.
 * @date 24 Jan 2019
 */

import React from "React";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import Swipeout from "react-native-swipeout";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import ListEmptyComponent from "../Common/ListEmptyComponent";

const MessageComponent = ({ data, onDeletePress, refresh, onRefresh }) => {
  if (!refresh) {
    return (
      <FlatList
        key={item => item.MessageID}
        data={data}
        contentContainerStyle={Styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        refreshControl={
          <ActivityIndicator
            size={"large"}
            style={{ flex: 1, alignSelf: "center" }}
            color={Constants.Colors.Primary}
          />
        }
        onRefresh={onRefresh}
        ListEmptyComponent={
          <ListEmptyComponent message={"Message Not Found"} loader={refresh} />
        }
        renderItem={({ item, index }) => {
          return (
            <Swipeout
              close
              autoClose
              key={index}
              right={[
                {
                  component: (
                    <LinearGradient
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      colors={Constants.Colors.ButtonGradients}
                      style
                      ={{
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
                  ),
                  onPress: () => onDeletePress(item)
                }
              ]}
              sensitivity={100}
              // scroll={data => {
              //   enableScrollingFunction(data);
              // }}
              /*  eslint-disable-next-line */
              // onOpen={(sectionID, rowId, direction) => {
              //   onOpen(direction, item);
              // }}
            >
              <View style={Styles.Swipeout}>
                <            View style={Styles.userImgView}>
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
                  <Text style={Styles.MessageSubject}>
                    {item.MessageSubject}
                  </Text>
                </View>
              </View>
            </Swipeout>
          );
        }}
      />
    );
  } else {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, alignSelf: "center" }}
        color={Constants.Colors.Primary}
      />
    );
  }
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
  enableScrollingFunction: null,
  onDeletePress: null
};

MessageComponent.propTypes = {
  data: PropTypes.array,
  enableScrollingFunction: PropTypes.func,
  onDeletePress: PropTypes.func
};
