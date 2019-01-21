/**
 * Name: Parshant Nagpal
 * Description : Contains sideMenu
 * Date: 8 January 2019
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppAction from "../actions";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import SafeView from "../components/common/SafeView";
import { Dialog } from "../helpers/common";
import { confirmAlert } from "react-confirm-alert";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "MySchedule"
    };
    this.hideSideMenu = this.hideSideMenu.bind(this);
    this.setScrenStack = this.setScrenStack.bind(this);
  }

  hideSideMenu() {
    this.props.appAction.mergeOptions(this.props.componentId, false);
  }

  setScrenStack(screen, visible) {
    if (screen === "Logout" && Platform.OS !== "web") {
      Dialog(Constants.AppConstants.Alert.Logout, [
        { text: "Cancel", onPress: () => {} },
        { text: "Ok", onPress: () => this.props.appAction.logOut() }
      ]);
    } else if (screen === "Logout" && Platform.OS === "web") {
      confirmAlert({
        title: Constants.AppConstants.AppName,
        message: Constants.AppConstants.Alert.Logout,
        buttons: [
          {
            label: "Cancel",
            onClick: () => {}
          },
          {
            label: "Ok",
            onClick: () => this.props.appAction.logOut()
          }
        ]
      });
      this.props.appAction.logOut();
    } else {
      this.setState(
        {
          screen
        },
        () => {
          this.props.appAction.setScrenStack("MY_STACK", screen, visible);
        }
      );
    }

    if ((Platform.OS !== "web") & (screen !== "Logout")) {
      this.hideSideMenu();
    }
  }

  onMenuPress = menu => {
    let { screen } = this.state;
    if (screen === menu && Platform.OS !== "web") {
      this.hideSideMenu();
    } else {
      this.setScrenStack(menu, true);
    }
  };

  renderMenu = ({ item, index }) => {
    let { screen } = this.state;
    if (item.key === screen) {
      return (
        <LinearGradient
          key={index}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={Constants.Colors.SelectedMenu}
        >
          <TouchableOpacity
            style={styles.text}
            onPress={() => item.onPress(item.key)}
          >
            <Text style={styles.welcome}>{item.value}</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.text}
          onPress={() => item.onPress(item.key)}
        >
          <Text style={styles.welcome}>{item.value}</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    let { user } = this.props;
    let { FirstName, LastName, UserName } = user;
    let menuOptions = [
      { key: "MySchedule", value: "My Schedule", onPress: this.onMenuPress },
      { key: "OpenShift", value: "Open Shift", onPress: this.onMenuPress },
      {
        key: "PotientialCases",
        value: "Potiential Cases",
        onPress: this.onMenuPress
      },
      {
        key: "PrintableForms",
        value: "Printable Forms",
        onPress: this.onMenuPress
      },
      { key: "MyProfile", value: "My Profile", onPress: this.onMenuPress },
      {
        key: "MessageCenter",
        value: "Message Center",
        onPress: this.onMenuPress
      },
      { key: "Logout", value: "Logout", onPress: this.onMenuPress }
    ];
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={Constants.Colors.ButtonGradients}
        style={styles.gradientStyle}
      >
        <SafeView />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.containerUserProfile}>
            <View style={styles.subContainerUserProfile}>
              <Image
                source={Constants.Images.UserAvatar}
                style={styles.avatarImage}
                resizeMode={"cover"}
              />
            </View>
            <View style={{}}>
              <Text style={styles.firstName}>{`${FirstName} ${LastName}`}</Text>
              <Text style={styles.userName}>{UserName}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {menuOptions.map((item, index) => this.renderMenu({ item, index }))}
          </View>
        </ScrollView>
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
    color: Constants.Colors.White,
    ...Platform.select({
      web: {
        fontSize: moderateScale(13)
      }
    })
  },
  container: {
    minHeight: moderateScale(450),
    justifyContent: "space-between",
    overflow: "hidden"
  },
  text: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: moderateScale(11),
    marginHorizontal: moderateScale(20)
  },
  marginTop: {},
  userName: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(14),
    color: Constants.Colors.White,
    paddingVertical: moderateScale(3),
    ...Platform.select({
      web: {
        textAlign: "center",
        fontSize: moderateScale(11)
      }
    })
  },
  firstName: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(18),
    color: Constants.Colors.White,
    paddingVertical: moderateScale(3),
    ...Platform.select({
      web: {
        textAlign: "center",
        fontSize: moderateScale(13)
      }
    })
  },
  avatarImage: {
    height: moderateScale(80),
    width: moderateScale(80),
    ...Platform.select({
      web: {
        height: moderateScale(56),
        width: moderateScale(56)
      }
    })
  },
  subContainerUserProfile: {
    height: moderateScale(82),
    width: moderateScale(82),
    backgroundColor: Constants.Colors.White,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        height: moderateScale(57),
        width: moderateScale(57)
      }
    })
  },
  containerUserProfile: {
    borderBottomColor: Constants.Colors.White,
    borderBottomWidth: 0.2,
    marginVertical: moderateScale(20),
    // margin: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(10),
    ...Platform.select({
      web: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0,
        paddingLeft: moderateScale(0)
      }
    })
  }
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
