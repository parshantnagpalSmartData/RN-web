import React from "react";
import { FlatList, Platform } from "react-native";

const MyScheduleList = ({ patitents, renderItem }) => {
  return (
    <FlatList
      data={patitents}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
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
