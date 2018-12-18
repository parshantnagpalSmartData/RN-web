import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, Platform } from "react-native";

import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import Header from "../components/common/Header";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderPatients = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: moderateScale(25),
          flexDirection: "row",
          justifyContent: "flex-start",
          borderColor: Constants.Colors.gray,
          borderWidth: 0,
          borderTopWidth: index !== 0 ? 1 : 0,
          borderBottomWidth: 1,
          padding: moderateScale(20),
          width:
            Platform.OS === "web"
              ? Constants.BaseStyle.DEVICE_WIDTH / 2
              : Constants.BaseStyle.DEVICE_WIDTH
        }}
      >
        <View
          style={{
            padding: moderateScale(10)
          }}
        >
          <Text>{item.date}</Text>
        </View>
        <View>
          <View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text>
              {item.from} - {item.to}
            </Text>
          </View>
          <View>
            <Text>{item.type}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let patitents = [
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      }
    ];
    return (
      <View style={Styles.containner}>
        <Header title={"My Schedule"} />
        <FlatList
          data={patitents}
          renderItem={this.renderPatients}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            ...Platform.select({
              web: {
                overflow: "hidden"
              }
            })
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: "center"
    // /alignItems: "center"
  }
});

export default Home;
