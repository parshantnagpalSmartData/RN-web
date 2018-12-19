import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppAction from "../actions";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import SafeView from "../components/common/SafeView";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.hideSideMenu = this.hideSideMenu.bind(this);
    this.setScrenStack = this.setScrenStack.bind(this);
  }
  hideSideMenu() {
    this.props.appAction.mergeOptions(this.props.componentId, false);
  }

  setScrenStack(screen, visible) {
    this.props.appAction.setScrenStack("MY_STACK", screen, visible);
    this.hideSideMenu();
  }

  onMenuPress = menu => {
    this.setScrenStack(menu, true);
  };

  renderMenu = ({ item, index }) => {
    return (
      <View style={styles.text} key={index}>
        <TouchableOpacity onPress={() => item.onPress(item.key)}>
          <Text style={styles.welcome}>{item.value}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let { FirstName, LastName, UserName } = this.props.user;
    let menuOptions = [
      { key: "Home", value: "My Schedule", onPress: this.onMenuPress },
      { key: "Home", value: "Open Shift", onPress: this.onMenuPress },
      { key: "Home", value: "Potiential Cases", onPress: this.onMenuPress },
      { key: "Home", value: "Printable Forms", onPress: this.onMenuPress },
      { key: "Home", value: "Message Center", onPress: this.onMenuPress },
      { key: "Home", value: "Logout", onPress: this.onMenuPress }
    ];
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={Constants.Colors.ButtonGradients}
        style={styles.gradientStyle}
      >
        <SafeView />
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: Constants.Colors.White,
              borderBottomWidth: 0.2,
              // padding: moderateScale(20),
              paddingBottom: moderateScale(10)
            }}
          >
            <View
              style={{
                height: moderateScale(80),
                width: moderateScale(80),
                backgroundColor: Constants.Colors.White,
                borderRadius: moderateScale(100),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={Constants.Images.UserAvatar}
                style={{
                  height: moderateScale(80),
                  width: moderateScale(80)
                }}
                resizeMode={"cover"}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(18),
                  color: Constants.Colors.White,
                  paddingVertical: moderateScale(5)
                }}
              >{`${FirstName} ${LastName}`}</Text>
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(14),
                  color: Constants.Colors.White,
                  paddingVertical: moderateScale(5)
                }}
              >
                {UserName}
              </Text>
            </View>
          </View>

          <View />
          <FlatList
            data={menuOptions}
            renderItem={this.renderMenu}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradientStyle: {
    flex: 1,
    justifyContent: "center"
  },
  welcome: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.White
  },
  container: {
    flex: 1,
    margin: moderateScale(20)
  },
  text: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: moderateScale(11)
  },
  marginTop: {}
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
