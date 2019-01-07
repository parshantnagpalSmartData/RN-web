import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform
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
      screen: "Home"
    };
    this.hideSideMenu = this.hideSideMenu.bind(this);
    this.setScrenStack = this.setScrenStack.bind(this);
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.app && props.app.screen !== state.screen) {
  //     return { screen: props.app.screen };
  //   } else {
  //     return null;
  //   }
  // }
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
          //  style={styles.gradientStyle}
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
      { key: "Home", value: "My Schedule", onPress: this.onMenuPress },
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
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: Constants.Colors.White,
              borderBottomWidth: 0.2,
              margin: moderateScale(20),
              paddingBottom: moderateScale(10),
              ...Platform.select({
                web: {
                  justifyContent: "center",
                  alignItems: "center"
                }
              })
                          
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
                  paddingVertical: moderateScale(3),
                  ...Platform.select({
                    web: {
                     textAlign : "center"
                    }
                  })
                }}
              >{`${FirstName} ${LastName}`}</Text>
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(14),
                  color: Constants.Colors.White,
                  paddingVertical: moderateScale(3),
                  ...Platform.select({
                    web: {
                     textAlign : "center"
                    }
                  })
                }}
              >
                {UserName}
              </Text>
            </View>
          </View>
          <FlatList
            data={menuOptions}
            renderItem={this.renderMenu}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            extraData={this.state.screen}
            style={{
              overscrollBehaviorY: "auto",
              touchAction: "auto"
            }}
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
    justifyContent: "space-between",
    overflow: "hidden"
  },
  text: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: moderateScale(11),
    marginHorizontal: moderateScale(20)
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
