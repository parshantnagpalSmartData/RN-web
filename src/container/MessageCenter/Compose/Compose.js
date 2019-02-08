/**
* @FileName: index.js
Author :Suraj Sanwal
Description: Contains the message center component
Date : 13 december 2018
*/
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../../constants";
import { moderateScale, verticalScale } from "../../../helpers/ResponsiveFonts";
import SafeView from "../../../components/Common/SafeView";
import { Dropdown } from "react-native-material-dropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AuthButton from "../../../components/Common/AuthButton";
import DivContainer from "../../../components/Common/DivContainer";

const Compose = ({
  tabLable,
  to,
  subject,
  onClose,
  recipients,
  user,
  onChangeRecipient,
  onChangeSubject,
  onChangeMessage,
  onComposePress,
  getRecipientsLabel,
  recipientNameError,
  subjectError,
  messageError
}) => (
    <View style={{ flex: 1 }}>
      {Platform.OS !== "web" ? (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={
            Platform.OS === "web"
              ? Constants.Colors.ButtonGradientsWeb
              : Constants.Colors.ButtonGradients
          }
          style={[Styles.gradientStyle]}
        >
          <SafeView />
          <View style={Styles.header}>
            <TouchableOpacity onPress={onClose} style={Styles.closeBtn}>
              <Image source={Constants.Images.CloseModal} />
            </TouchableOpacity>
            <Text numberOfLines={2} style={[Styles.headerText]}>
              {tabLable ? tabLable : "Compose Message"}
            </Text>
            <TouchableOpacity onPress={onComposePress}>
              <Image source={Constants.Images.ComposeWhite} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : (
          <div className={"CloseButttonCompose"}>
            <TouchableOpacity onPress={onClose} style={Styles.closeBtnWeb}>
              <Image source={Constants.Images.Close} style={Styles.closeImg} />
            </TouchableOpacity>
          </div>
        )}
      <View style={Styles.messageBody}>
        {Platform.OS !== "web" ? (
          <Dropdown
            value={getRecipientsLabel(to)}
            label="To"
            data={recipients}
            overlayStyle={Styles.overlayStyle}
            containerStyle={Styles.containerStyle}
            onChangeText={value => onChangeRecipient(value)}
            fontSize={11}
          />
        ) : (
            <div className={"folderName"}>
              <Text style={Styles.commonText}>To</Text>
              <Select
                value={to}
                inputProps={{
                  name: "folder",
                  id: "folder-name"
                }}
                onChange={event => onChangeRecipient(event.target.value)}
              >
                {recipients.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          )}
        {recipientNameError ? (
          <Text
            style={{
              color: "rgb(213, 0, 0)",
              fontSize: 12,
              marginVertical: verticalScale(2)
            }}
          >
            {recipientNameError}
          </Text>
        ) : null}
        <DivContainer className={"fromOptions"}>
          <View style={Styles.options}>
            <Text style={Styles.commonText}>From</Text>
            <Text style={[Styles.commonText, Styles.textPadding]}>
              {user.UserName}
            </Text>
          </View>
        </DivContainer>
        <DivContainer className={"fromSubject"}>
          <View style={[Styles.options]}>
            <Text style={Styles.commonText}>Subject</Text>
            <TextInput
              value={subject}
              onChangeText={value => onChangeSubject(value)}
              numberOfLines={2}
              style={[Styles.TextInput, Styles.textPadding]}
              underlineColorAndroid={Constants.Colors.Transparent}
            />
          </View>
          {subjectError ? (
            <Text
              style={{
                color: "rgb(213, 0, 0)",
                fontSize: 12
              }}
            >
              {subjectError}
            </Text>
          ) : null}
        </DivContainer>
        <DivContainer
          className={"textInputDivContainer"}
          styleApp={Styles.composeMessageApp}
        >
          <View style={Styles.msgBody}>
            <TextInput
              onChangeText={value => onChangeMessage(value)}
              multiline={true}
              numberOfLines={2}
              style={[Styles.TextInput, Styles.messageBodyText]}
              placeholder={"Compose"}
              placeholderTextColor={Constants.Colors.Gray}
              underlineColorAndroid={Constants.Colors.Transparent}
            />
          </View>
          {messageError ? (
            <Text
              style={{
                color: "rgb(213, 0, 0)",
                fontSize: 12
              }}
            >
              {messageError}
            </Text>
          ) : null}
        </DivContainer>
        {Platform.OS === "web" ? (
          <div className={"AuthButton"}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AuthButton onPress={onComposePress} buttonName={"Send"} />
            </View>
          </div>
        ) : null}
      </View>
    </View>
  );

const Styles = StyleSheet.create({
  composeMessageApp: {
    flex: 1
  },
  gradientStyle: {
    flex: 0.1,
    paddingHorizontal: moderateScale(15),
    justifyContent: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10)
  },
  headerText: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.White,
    fontSize: moderateScale(16),
    textAlign: "center",
    textAlignVertical: "center",
    ...Platform.select({
      web: {
        fontSize: moderateScale(20),
        ...Constants.Fonts.Regular
      }
    })
  },
  closeBtn: {
    // backgroundColor: "#fff"
  },
  messageBody: {
    // flexDirection: "row",
    ...Platform.select({
      ios: {
        flex: 0.9
      },
      android: {
        flex: 0.9
      },
      web: {
        width: "100%"
      }
    })
  },
  overlayStyle: {
    top: moderateScale(70)
  },
  containerStyle: {
    paddingHorizontal: moderateScale(10)
  },
  options: {
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: Constants.Colors.Gray,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    alignItems: "center"
  },
  msgBody: {
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: Constants.Colors.Gray,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    ...Platform.select({
      web: {
        minHeight: moderateScale(180)
      }
    })
  },
  TextInput: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(12),
    color: Constants.Colors.Black,
    // textAlign: "center",
    // textAlignVertical: "center",
    ...Platform.select({
      web: {
        outline: "none",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
      },
      ios: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
      },

    })
  },
  messageBodyText: {
    minHeight: moderateScale(180),
    ...Platform.select({
      android: {
        width: Constants.BaseStyle.DEVICE_WIDTH,
        textAlign: "justify",
        textAlignVertical: "top"
      }
    })
  },
  commonText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(11),
    color: Constants.Colors.Gray
  },
  textPadding: {
    paddingHorizontal: moderateScale(10),
    ...Platform.select({
      android: {
        width: Constants.BaseStyle.DEVICE_WIDTH,
        // textAlign: "justify",
        // textAlignVertical: "top"
      }
    })
  },
  closeBtnWeb: {
    alignSelf: "flex-end"
  },
  closeImg: {
    height: moderateScale(15),
    width: moderateScale(15)
  }
});

export default Compose;
