/**
 * Name :Suraj Sanwal
 * File Name : SideMenu.js
 * Description : Contains the side menu of the app
 * Date : 7 Sept 2018
 */
import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import Styles from "../../styles/component/sideMenu";
import * as appActions from "../../actions";
import Constants from "../../constants";
import SafeView from "../../components/common/SafeView";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import ShuttleStatus from "./ShuttleStatus";

class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  /*
    closes the toggle
    */
  closeToggle() {
    this.props.navigator.toggleDrawer({
      side: "left"
    });
  }

  setDriverStatus = _.debounce(() => {
    let { _id, isAvailable } = this.props.user;
    this.socket.updateDriverAvailable({
      _id,
      isAvailable: !isAvailable
    });
  });

  moveToScreen = _.debounce(screen => {
    let { navigator } = this.props;
    this.closeToggle();
    navigator.handleDeepLink({ link: screen });
  });

  shuttleScreen = () => {
    this.moveToScreen("ShuttleListing");
  };

  driverScreen = () => {
    this.moveToScreen("DriverListing");
  };

  ridersScreen = () => {
    this.moveToScreen("RiderListing");
  };

  onHomePress = _.debounce(() => {
    this.closeToggle();
    let { user, navigator, trip } = this.props;
    if (user.userType == Constants.AppCosntants.UserTypes.Rider) {
      navigator.handleDeepLink({ link: "RiderProviderListing" });
      return;
    }
    if (user.userType == Constants.AppCosntants.UserTypes.Driver) {
      trip.response && trip.response.activeStatus
        ? navigator.handleDeepLink({ link: "Maps" })
        : navigator.handleDeepLink({ link: "SelectShuttle" });
      return;
    }
    if (user.userType == Constants.AppCosntants.UserTypes.Admin) {
      navigator.handleDeepLink({ link: "AdminDashBoard" });
      return;
    }
  });
  onMyHistoryPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({ link: "DriverRideHistory" });
  });

  onRewardPress = _.debounce(() => {
    this.closeToggle();
    alert("Under Development");
  });

  onMyTripPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({ link: "RiderRideHistory" });
  });

  onFAQPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({
      link: "CMSPage",
      payload: { passProps: { hideDrawer: false, uri: "faq", type: "FAQ", PageName: "FAQs" } }
    });
  });

  onFeedbackPress = _.debounce(() => {
    this.closeToggle();
    alert("Under Development");
  });

  onProfilePress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({ link: "Profile" });
  });

  onRateUsPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({ link: "RateUs" });
  });

  onSupportPress = _.debounce(() => {
    this.closeToggle();
    alert("Under Development");
  });

  onTermPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.handleDeepLink({
      link: "CMSPage",
      payload: {
        passProps: {
          hideDrawer: false,
          uri: "privacy",
          type: "privacy",
          PageName: "Privacy Policy"
        }
      }
    });
  });

  inactiveShuttle = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.showModal({
      screen: "ActiveInactiveShuttle",
      animationType: "slide-up",
      navigatorStyle: {
        statusBarColor: "transparent",
        navBarHidden: true,
        screenBackgroundColor: "transparent",
        modalPresentationStyle: "overFullScreen"
      }
    });
  });

  onLogoutPress = _.debounce(() => {
    this.closeToggle();
    this.props.navigator.showModal({
      screen: "Logout",
      animationType: "slide-up",
      navigatorStyle: {
        statusBarColor: "transparent",
        navBarHidden: true,
        screenBackgroundColor: "transparent",
        modalPresentationStyle: "overFullScreen"
      }
    });
  });

  render() {
    let { user, trip } = this.props;
    let riderMenu = [
      {
        title: "Home",
        onPress: this.onHomePress,
        icon: Constants.Images.Drawer.Home
      },
      {
        title: "My Trips",
        onPress: this.onMyTripPress,
        icon: Constants.Images.Drawer.History
      },
      {
        title: "My Profile",
        onPress: this.onProfilePress,
        icon: Constants.Images.Drawer.Myprofile
      },
      {
        title: "Rate Us",
        onPress: this.onRateUsPress,
        icon: Constants.Images.Drawer.Feedback
      },
      {
        title: "FAQs",
        onPress: this.onFAQPress,
        icon: Constants.Images.Drawer.Faq
      },
      // {
      //   title: "Support",
      //   onPress: this.onSupportPress,
      //   icon: Constants.Images.Drawer.Support
      // },
      {
        title: "Terms and Policy",
        onPress: this.onTermPress,
        icon: Constants.Images.Drawer.Termspolicy
      }
    ];
    let driverMenu = [
      {
        title: "Home",
        onPress: this.onHomePress,
        icon: Constants.Images.Drawer.Home
      },
      {
        title: "My History",
        onPress: this.onMyHistoryPress,
        icon: Constants.Images.Drawer.History
      },
      {
        title: "My Profile",
        onPress: this.onProfilePress,
        icon: Constants.Images.Drawer.Myprofile
      },
      {
        title: "FAQs",
        onPress: this.onFAQPress,
        icon: Constants.Images.Drawer.Faq
      },
      {
        title: "Terms and Policy",
        onPress: this.onTermPress,
        icon: Constants.Images.Drawer.Termspolicy
      }
      //{ title: "Terms and Policy", onPress: this.onMyTripPress, icon: Constants.Images.drawer.termspolicy }
    ];
    let adminMenu = [
      {
        title: "Home",
        onPress: this.onHomePress,
        icon: Constants.Images.Drawer.Home
      },
      {
        title: "Shuttles",
        onPress: this.shuttleScreen,
        icon: Constants.Images.Drawer.History
      },
      {
        title: "Passengers",
        onPress: this.ridersScreen,
        icon: Constants.Images.Drawer.Myprofile
      },
      {
        title: "Drivers",
        onPress: this.driverScreen,
        icon: Constants.Images.Drawer.Feedback
      },
      {
        title: "Messages",
        onPress: this.onFeedbackPress,
        icon: Constants.Images.Drawer.Faq
      },
      {
        title: "My Profile",
        onPress: this.onProfilePress,
        icon: Constants.Images.Drawer.Myprofile
      },
      {
        title: "FAQ's",
        onPress: this.onFAQPress,
        icon: Constants.Images.Drawer.Faq
      },
      // {
      //   title: "Support",
      //   onPress: this.onMyTripPress,
      //   icon: Constants.Images.Drawer.Support
      // },
      {
        title: "Terms and Policy",
        onPress: this.onTermPress,
        icon: Constants.Images.Drawer.Termspolicy
      }
    ];
    let menu =
      user.userType == Constants.AppCosntants.UserTypes.Rider
        ? riderMenu
        : user.userType == Constants.AppCosntants.UserTypes.Driver
          ? driverMenu
          : adminMenu;
    return (
      <ScrollView
        style={Styles.sideMenuContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SafeView />
        <View style={Styles.sideMenuImageContainer}>
          <View style={Styles.profileImg}>
            <Image source={{ uri: user.profileUrl }} style={Styles.imgAvatar} resizeMode={"contain"} />
          </View>
          <View style={Styles.userInfo}>
            <Text style={Styles.userName}>{user.name || ""}</Text>
            <Text style={Styles.userEmail}>{user.email || ""}</Text>
          </View>
        </View>
        {user.userType == Constants.AppCosntants.UserTypes.Driver && (trip.response && trip.response._id) ? (
          <View style={Styles.activeStatus}>
            <View>
              <Text style={Styles.shuttleName}>{trip.myShuttle && trip.myShuttle.carModel}</Text>
              <Text style={Styles.shuttleProvider}>{trip.myShuttle && trip.myShuttle.name}</Text>
            </View>
            <View style={Styles.suttleStatusBtn}>
              <ShuttleStatus active onPress={this.inactiveShuttle} />
              <View
                style={{
                  height: moderateScale(60),
                  width: moderateScale(60),
                  borderRadius: moderateScale(100),
                  borderColor: Constants.Colors.gray,
                  borderWidth: 0.4,
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={Constants.Images.RideInfo.InActiveShuttle}
                  style={{
                    height: moderateScale(40),
                    width: moderateScale(40)
                  }}
                  resizeMode={"contain"}
                />
              </View>
            </View>
          </View>
        ) : null}
        <Text style={Styles.menuText}>MENU</Text>
        <View style={Styles.sideMenuSubContainer}>
          {menu.map(item => {
            return (
              <TouchableOpacity
                style={[
                  Styles.menuBtn,
                  {
                    borderTopColor: Constants.Colors.fadeBorder,
                    borderTopWidth: item.title == "Logout" ? 1 : 0,
                    marginTop: item.title == "Logout" ? 20 : 0,
                    paddingVertical: 10
                  }
                ]}
                onPress={() => item.onPress()}
                key={item.title}
              >
                <Image source={item.icon} resizeMode={"center"} />
                <Text style={[Styles.menuText]}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={[
            Styles.menuBtn,
            {
              borderTopColor: Constants.Colors.fadeBorder,
              borderTopWidth: moderateScale(1),
              marginVertical: moderateScale(20),
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(30)
            }
          ]}
          onPress={() => this.onLogoutPress()}
        >
          <Image source={Constants.Images.Drawer.Logout} resizeMode={"center"} />
          <Text style={[Styles.menuText]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});
function mapStateToProps(state) {
  return {
    user: state.user,
    trip: state.trip,
    loader: state.loader,
    shuttle: state.shuttle
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
