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
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import SafeView from "../../components/Common/SafeView";
import { Dropdown } from "react-native-material-dropdown";

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
  onComposePress
}) => (
  <View style={Styles.container}>
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
          <Image source={Constants.Images.Close} />
        </TouchableOpacity>
        <Text numberOfLines={2} style={[Styles.headerText]}>
          {tabLable ? tabLable : "Compose Message"}
        </Text>
        <TouchableOpacity onPress={onComposePress}>
          <Image source={Constants.Images.SentActive} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
    <View style={Styles.messageBody}>
      <Dropdown
        value={to && to.toString()}
        label="To"
        data={recipients}
        overlayStyle={Styles.overlayStyle}
        containerStyle={Styles.containerStyle}
        onChangeText={value => onChangeRecipient(value)}
        fontSize={11}
      />
      <View style={Styles.options}>
        <Text style={Styles.commonText}>From</Text>
        <Text style={[Styles.commonText, Styles.textPadding]}>
          {user.UserName}
        </Text>
      </View>
      <View style={Styles.options}>
        <Text style={Styles.commonText}>Subject</Text>
        <TextInput
          value={subject}
          onChangeText={value => onChangeSubject(value)}
          numberOfLines={2}
          style={[Styles.TextInput, Styles.textPadding]}
        />
      </View>
      <View style={Styles.msgBody}>
        <TextInput
          onChangeText={value => onChangeMessage(value)}
          multiline={true}
          numberOfLines={50}
          style={Styles.TextInput}
          placeholder={"Compose"}
          placeholderTextColor={Constants.Colors.Gray}
        />
      </View>
    </View>
  </View>
);

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  gradientStyle: {
    flex: 0.1,
    paddingHorizontal: moderateScale(15)
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
    backgroundColor: "#fff"
  },
  messageBody: { flex: 0.9 },
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
    paddingHorizontal: moderateScale(10)
  },
  msgBody: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: Constants.Colors.Gray,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10)
  },
  TextInput: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(12),
    color: Constants.Colors.Black
  },
  commonText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(11),
    color: Constants.Colors.Gray
  },
  textPadding: { paddingHorizontal: moderateScale(10) }
});

export default Compose;
