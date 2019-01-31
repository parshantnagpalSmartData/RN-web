/**
 * @author Suraj Sanwal
 * @name MessageComponent.js
 * @description Contains the Message component.
 * @date 24 Jan 2019
 */

import React from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import Constants from "../../constants";
import ListEmptyComponent from "../Common/ListEmptyComponent";
import MessageItem from "./MessageItem";

const SwiperContainer = ({
  data,
  onDeletePress,
  refresh,
  onRefresh,
  onPressIsChecked,
  onPress,
  onMessagePress
}) => {
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
            <MessageItem
              onPress={() => onPress(item)}
              onPressIsChecked={() => onPressIsChecked(index)}
              item={item}
              index={index}
              onDeletePress={() => onDeletePress(item)}
              MessageSubject={item.MessageSubject}
              SenderFirstName={item.Sender_FirstName}
              SenderLastName={item.Sender_LastName}
              onMessagePress={onMessagePress}
            />
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
  }
});

export default SwiperContainer;

SwiperContainer.defaultProps = {
  data: null,
  enableScrollingFunction: null,
  onDeletePress: null
};

SwiperContainer.propTypes = {
  data: PropTypes.array,
  enableScrollingFunction: PropTypes.func,
  onDeletePress: PropTypes.func
};