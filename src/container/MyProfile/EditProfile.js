/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
// import UnderDevelopment from "../../components/Common/UnderDevelopment";
import AuthButton from "../../components/Common/AuthButton";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:
        (this.props && this.props.user && this.props.user.FirstName) || "",
      lastName:
        (this.props && this.props.user && this.props.user.LastName) || "",
      contact:
        (this.props && this.props.user && this.props.user.contact) || null,
      about: (this.props && this.props.user && this.props.user.about) || ""
    };
  }

  updateProfile = () => {
    alert("UnderDevelopment");
  };

  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  render() {
    let { user } = this.props;
    let { firstName, lastName, contact, about } = this.state;
    return (
      <View style={Styles.containner}>
        <Header
          title={"Edit Profile"}
          hideDrawer
          onBackPress={this.onBackPress}
        />
        <KeyboardAwareScrollView
          // scrollEnabled={false}
          enableAutomaticScroll={true}
          extraHeight={50}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ height: Constants.BaseStyle.DEVICE_HEIGHT }}
          contentContainerStyle={Styles.userContainer}
        >
          <View style={Styles.userDetailsContainer}>
            <View style={Styles.userImgContainer}>
              <TouchableOpacity style={Styles.userImgView}>
                <Image
                  source={Constants.Images.UserAvatar}
                  resizeMethod={"center"}
                  style={Styles.userImg}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.userInfoView}>
              <View style={Styles.userRow}>
                <Text style={Styles.infoRow}>Name :</Text>
                <TextInput
                  style={Styles.dataRow}
                  placeholder={"Last Name"}
                  value={lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                />
                <TextInput
                  style={Styles.dataRow}
                  placeholder={"First Name"}
                  value={firstName}
                  onChangeText={firstName => this.setState({ firstName })}
                />
              </View>
              <View style={Styles.userRow}>
                <Text style={Styles.infoRow}>Email :</Text>
                <Text style={Styles.dataRow}>{user.UserName}</Text>
              </View>
              <View style={Styles.userRow}>
                <Text style={Styles.infoRow}>Contact :</Text>
                <TextInput
                  placeholder={"Contact Number"}
                  style={Styles.dataRow}
                  value={contact}
                  onChangeText={contact => this.setState({ contact })}
                />
              </View>
              <View style={Styles.userRow}>
                <Text style={Styles.infoRow}>Role :</Text>
                <Text style={Styles.dataRow}>{user.Rights}</Text>
              </View>
              <View style={[Styles.userRow, { flexDirection: "column" }]}>
                <Text style={Styles.infoRow}>About:</Text>
                <TextInput
                  multiline
                  placeholder={"Say something about your self"}
                  style={[Styles.dataRow, Styles.infoRow]}
                  value={about}
                  onChangeText={about => this.setState({ about })}
                />
              </View>
            </View>
          </View>
          <AuthButton
            buttonName={"Update Profile"}
            gradientColors={Constants.Colors.ButtonGradients}
            onPress={this.updateProfile}
            gradientStyle={{ borderRadius: moderateScale(70) }}
            buttonStyle={{
              marginHorizontal: moderateScale(30),
              bottom: moderateScale(50),
              ...Platform.select({
                web: {
                  marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH * 0.2
                }
              })
            }}
          />
          <TouchableOpacity style={Styles.CameraView}>
            <Image
              source={Constants.Images.Camera}
              resizeMethod={"center"}
              style={Styles.camera}
            />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  },
  userContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  userDetailsContainer: {
    alignContent: "center",
    justifyContent: "center"
  },
  userImgContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  userImgView: {
    margin: moderateScale(10),
    borderRadius: moderateScale(100),
    borderWidth: 4,
    borderColor: Constants.Colors.Secondary
  },
  userImg: {
    height: moderateScale(92),
    width: moderateScale(92)
  },
  userInfoView: { padding: moderateScale(20) },
  userRow: { flexDirection: "row", marginVertical: moderateScale(10) },
  infoRow: {
    ...Constants.Fonts.Light,
    color: Constants.Colors.placehoder,
    fontSize: moderateScale(16)
  },
  dataRow: {
    ...Constants.Fonts.Light,
    color: Constants.Colors.Primary,
    fontSize: moderateScale(16),
    paddingHorizontal: moderateScale(5),
    textAlign: "justify",
    ...Platform.select({
      web: {
        outline: "none",
        paddingHorizontal: moderateScale(0)
      }
    })
  },
  CameraView: {
    height: moderateScale(30),
    width: moderateScale(30),
    position: "absolute",
    backgroundColor: Constants.Colors.Primary,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    top: moderateScale(70),
    right: moderateScale(150),
    ...Platform.select({
      web: {
        right: Constants.BaseStyle.DEVICE_WIDTH * 0.375
      }
    })
  },
  camera: { height: moderateScale(20), width: moderateScale(20) }
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
)(MyProfile);
