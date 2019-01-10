import React from "react";
import { FlatList, Platform } from "react-native";

const MyScheduleList = ({
  patitents,
  renderItem,
  loader,
  onRefresh,
  onEndReached
}) => {
  return (
    <FlatList
      data={patitents}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={loader}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      style={{
        ...Platform.select({
          web: {
            overflow: "hidden"
            //width: Constants.BaseStyle.DEVICE_WIDTH
          }
        })
      }}
      contentContainerStyle={{
        ...Platform.select({
          web: {
            // backgroundColor : 'red'
            //   justifyContent: "center",
          }
        })
      }}
    />
  );
};

export default MyScheduleList;
