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
import _ from "lodash";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
// import UnderDevelopment from "../../components/Common/UnderDevelopment";
import AuthButton from "../../components/Common/AuthButton";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";

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

  picker = option => {
    //case for the camera
    if (option == 1) {
      this.openCamera();
      return;
    }
    //case of the gallery
    if (option == 2) {
      this.openGalary();
      return;
    }
  };
  openCamera = _.debounce(() => {
    let { navigator } = this.props;
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      maxFiles: 1,
      compressImageQuality: 0.5,
      includeBase64: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
      hideBottomControls: true,
      useFrontCamera: true,
      avoidEmptySpaceAroundImage: true
    })
      .then(image => {
        this.setState({ image }, () => {
          this.props.appActions.updateProfileImage(image, navigator);
          this.actionSheet.hide();
        });
      })
      .catch(() => {
        this.actionSheet.hide();
      });
  });

  openGalary = _.debounce(() => {
    let { navigator } = this.props;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      maxFiles: 1,
      compressImageQuality: 0.5,
      includeBase64: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
      hideBottomControls: true,
      useFrontCamera: true,
      avoidEmptySpaceAroundImage: true
    })
      .then(image => {
        this.setState({ image }, () => {
          this.props.appActions.updateProfileImage(image, navigator);
          this.actionSheet.hide();
        });
      })
      .catch(() => {
        this.actionSheet.hide();
      });
  });

  _handleImageChange = e => {
    // e.preventDefault();
    // let reader = new FileReader();
    let file = e.target.files[0];
    // let context = this;
    // let ext = file.name.split(".").pop();
    // let exts = ["jpg", "png", "bmp", "jpeg", "gif"];
    // console.log("file", file);
    if (file && !file.name) {
      return;
    }
    // let token = this.props.user.auth;
    if (e.target.files[0].size / 1000 > 3072) {
      // context.setState({
      // 	open: true,
      // 	msg: 'Image must not be greater than 5Mb!',
      // 	msgType: 'Error',
      // 	msgStatus: false
      // });

      return;
    }
  };
  render() {
    let { user, activeColor, baseColor, overlayColor } = this.props;
    let { firstName, lastName, contact, about, active, loaded } = this.state;
    let labelClass = `uploader ${loaded && "loaded"}`;
    let borderColor = active ? activeColor : baseColor;
    let iconColor = active ? activeColor : loaded ? overlayColor : baseColor;

    return (
      <View style={Styles.containner}>
        <Header
          title={"Edit Profile"}
          hideDrawer
          onBackPress={this.onBackPress}
        />
        <KeyboardAwareScrollView
          scrollEnabled={false}
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
              <TouchableOpacity
                style={Styles.userImgView}
                onPress={() => this.actionSheet.show()}
              >
                {Platform.OS === "web" ? (
                  <label
                    className={labelClass}
                    // onDragEnter={this.onDragEnter}
                    // onDragLeave={this.onDragLeave}
                    // onDragOver={this.onDragOver}
                    // onDrop={this.onDrop}
                    style={{ outlineColor: borderColor }}
                  >
                    {/* <input
                    type={"file"}
                    id="filePicker"
                    value={this.state.image}
                    accept="image/*"
                    onChange={this._handleImageChange}
                  /> */}
                    <img
                      src={Constants.Images.Camera}
                      className={loaded && "loaded"}
                    />
                    <i
                      className="icon icon-upload"
                      style={{ color: iconColor }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={this.onFileChange}
                      ref={ref => (this.input = ref)}
                    />
                  </label>
                ) : (
                  <Image
                    source={Constants.Images.UserAvatar}
                    resizeMethod={"resize"}
                    style={Styles.userImg}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={Styles.userInfoView}>
              <View style={Styles.userRow}>
                <Text style={Styles.infoRow}>Name :</Text>
                <TextInput
                  underlineColorAndroid={Constants.Colors.Transparent}
                  style={Styles.dataRow}
                  placeholder={"Last Name"}
                  value={lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                />
                <TextInput
                  underlineColorAndroid={Constants.Colors.Transparent}
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
                  underlineColorAndroid={Constants.Colors.Transparent}
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
                  underlineColorAndroid={Constants.Colors.Transparent}
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
              bottom: moderateScale(15),
              ...Platform.select({
                web: {
                  marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH * 0.2
                }
              })
            }}
          />
          <TouchableOpacity
            style={Styles.CameraView}
            onPress={() => this.actionSheet.show()}
          >
            <Image
              source={Constants.Images.Camera}
              resizeMethod={"resize"}
              style={Styles.camera}
            />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        {Platform.OS !== "web" ? (
          <ActionSheet
            ref={ref => (this.actionSheet = ref)}
            title={"Choose Image From"}
            options={[
              "Cancel",
              {
                component: (
                  <TouchableOpacity
                    onPress={() => {
                      this.picker(1);
                    }}
                    style={Styles.actionWrapper}
                  >
                    <Text style={Styles.actionText}>{"Camera"}</Text>
                  </TouchableOpacity>
                ),
                height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 10
              },
              {
                component: (
                  <TouchableOpacity
                    onPress={() => {
                      this.picker(2);
                    }}
                    style={Styles.actionWrapper}
                  >
                    <Text style={Styles.actionText}>{"Gallary"}</Text>
                  </TouchableOpacity>
                ),
                height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 10
              }
            ]}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
          />
        ) : null}
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
    flex: 1,
    height: moderateScale(40),
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
    // position: "absolute",
    backgroundColor: Constants.Colors.Primary,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    top: moderateScale(70),
    right: moderateScale(150),
    zIndex: 999,
    ...Platform.select({
      web: {
        right: Constants.BaseStyle.DEVICE_WIDTH * 0.375
      }
    })
  },
  camera: { height: moderateScale(20), width: moderateScale(20) },
  actionWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Constants.BaseStyle.DEVICE_WIDTH,
    borderBottomColor: Constants.Colors.placehoder,
    borderBottomWidth: 1
  },
  actionText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16)
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
