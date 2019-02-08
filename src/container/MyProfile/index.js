/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Platform, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
// import UnderDevelopment from "../../components/Common/UnderDevelopment";
import AuthButton from "../../components/Common/AuthButton";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import RightComponent from "../../components/Common/RightComponent";
import DivContainer from "../../components/Common/DivContainer";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  onRightPress = () => {
    let { appAction, componentId } = this.props;
    appAction.pushToParticularScreen(componentId, "EditProfile");
  };
  resetPassword = () => {
    let { appAction, componentId } = this.props;
    appAction.pushToParticularScreen(componentId, "ResetPassword");
  };

  render() {
    let { user } = this.props;
    return (
      <View style={Styles.containner}>
        <Header
          title={"My Profile"}
          rightComponent={<RightComponent icon={Constants.Images.Compose} />}
          onDrawerPress={this.onDrawerPress}
          onRightPress={this.onRightPress}
        />
        {/* <UnderDevelopment /> */}
        <View style={Styles.userContainer}>
          <View style={Styles.userDetailsContainer}>
            <View style={Styles.userImgContainer}>
              <View style={Styles.userImgView}>
                <Image
                  source={Constants.Images.UserAvatar}
                  resizeMethod={"center"}
                  style={Styles.userImg}
                />
              </View>
            </View>
            <View style={Styles.userInfoView}>
              <DivContainer
                className={"userInfo"}
                styleApp={Styles.userRow}
                styleWeb={Styles.userRow}
              >
                <Text style={Styles.infoRow}>Name :</Text>
                <Text style={Styles.dataRow}>
                  {`${user.LastName}, ${user.FirstName}`}
                </Text>
              </DivContainer>
              <DivContainer
                className={"userInfo"}
                styleApp={Styles.userRow}
                styleWeb={Styles.userRow}
              >
                <Text style={Styles.infoRow}>Email :</Text>
                <Text style={Styles.dataRow}>{user.UserName}</Text>
              </DivContainer>
              <DivContainer
                className={"userInfo"}
                styleApp={Styles.userRow}
                styleWeb={Styles.userRow}
              >
                <Text style={Styles.infoRow}>Contact :</Text>
                <Text style={Styles.dataRow}>{user && user.contact}</Text>
              </DivContainer>
              <DivContainer
                className={"userInfo"}
                styleApp={Styles.userRow}
                styleWeb={Styles.userRow}
              >
                <Text style={Styles.infoRow}>Role :</Text>
                <Text style={Styles.dataRow}>{user.Rights}</Text>
              </DivContainer>
              <View style={[Styles.userRow, { flexDirection: "column" }]}>
                <Text style={Styles.infoRow}>About:</Text>
                <Text
                  numberOfLines={11}
                  style={[Styles.dataRow, Styles.infoRow]}
                >
                  {
                    "In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a coherent set of signs that transmits some kind of informative message."
                  }
                </Text>
              </View>
            </View>
          </View>
          <AuthButton
            buttonName={"Reset Password"}
            gradientColors={Constants.Colors.ButtonGradients}
            onPress={this.resetPassword}
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
        </View>
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
  userInfoView: {
    padding: moderateScale(20)
  },
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
    paddingHorizontal: moderateScale(10),
    textAlign: "justify"
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
)(MyProfile);
