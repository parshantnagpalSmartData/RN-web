import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../actions";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import { Toast } from "react-native-redux-toast";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

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
        _id: 1,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 2,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 3,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 4,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 5,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 6,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 7,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 8,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 9,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      },
      {
        _id: 10,
        name: "Suraj Sanwal",
        from: "9",
        to: "11",
        type: "scheduled",
        date: "Tue 9"
      }
    ];
    return (
      <View style={Styles.containner}>
        <Header title={"My Schedule"} onDrawerPress={this.onDrawerPress} />
        <FlatList
          data={patitents}
          keyExtractor={item => item._id.toString()}
          renderItem={this.renderPatients}
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
                justifyContent: "center"
              }
            })
          }}
        />
        <Loader />
        <Toast messageStyle={{ color: "red" }} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
