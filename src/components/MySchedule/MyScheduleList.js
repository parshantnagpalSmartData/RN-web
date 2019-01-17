import React from "react";
import { FlatList } from "react-native";

import ListEmptyComponent from "../Common/ListEmptyComponent";

const MyScheduleList = ({
  patitents,
  renderItem,
  loader,
  onRefresh,
  onEndReached,
  appLoader
}) => {
  return (
    <FlatList
      data={patitents}
      keyExtractor={item => item.SchedID.toString()}
      key={item => item.SchedID.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={loader}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      ListEmptyComponent={
        <ListEmptyComponent
          message={"Schedule Not Found"}
          loader={loader || appLoader}
        />
      }
    />
  );
};

export default MyScheduleList;
