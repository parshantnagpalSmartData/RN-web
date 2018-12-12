/**
 * Name :Suraj Sanwal
 * File Name : locationInput.js
 * Description : Contains the location input view of the app
 * Date : 7 Sept 2018
 */

import React from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

export const LocationInput = props => {
  let {
    source,
    style,
    destination,
    terminal,
    onPressSource,
    onPressDestination,
    onSelectTerminal,
    loading,
    disabledDestination,
    disabledSource,
    sourcePlaceholder,
    destinationPlaceholder,
    renderInputBox,
    onChangeSource,
    onChangeDestination,
    clearBox,
    hideSource,
    hideDestination
  } = props;
  return (
    <View style={[Styles.shadow]}>
      <View style={[Styles.searchWrapper, style]}>
        <View style={Styles.searchIcon}>
          {hideDestination ? (
            <Image
              source={Constants.Images.Common.Source}
              resizeMode={"contain"}
            />
          ) : hideSource ? (
            <Image
              source={Constants.Images.Common.Destination}
              resizeMode={"contain"}
              style={{ height: moderateScale(20), width: moderateScale(20) }}
            />
          ) : (
            <Image
              source={Constants.Images.Dashboard.PicupLocation}
              resizeMode={"contain"}
            />
          )}
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.searchBox}>
            {renderInputBox && !hideSource ? (
              <View style={[Styles.inputBox, Styles.inputStyleBorder]}>
                <TextInput
                  {...props}
                  placeholder={sourcePlaceholder}
                  style={Styles.inputStyle}
                  value={source && source.trim()}
                  editable={disabledSource}
                  numberOfLines={1}
                  onChangeText={onChangeSource}
                />
              </View>
            ) : !hideSource ? (
              <TouchableOpacity
                disabled={disabledSource}
                style={[Styles.inputBox, Styles.inputStyleBorder]}
                onPress={() =>
                  onPressSource(Constants.AppCosntants.UserLocation.Source)
                }
              >
                <Text
                  {...props}
                  numberOfLines={1}
                  style={[
                    Styles.inputStyle,
                    {
                      color: source
                        ? Constants.Colors.Primary
                        : Constants.Colors.placehoder
                    }
                  ]}
                >
                  {(source && source.trim()) || sourcePlaceholder}
                </Text>
                {source ? (
                  <TouchableOpacity
                    onPress={() =>
                      clearBox(Constants.AppCosntants.UserLocation.Source)
                    }
                    style={Styles.crossImg}
                  >
                    <Image
                      source={Constants.Images.Common.Cross}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                ) : null}
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={Styles.searchBox}>
            {renderInputBox && !hideDestination ? (
              <View style={Styles.inputBox}>
                <TextInput
                  {...props}
                  numberOfLines={1}
                  placeholder={destinationPlaceholder}
                  style={[Styles.inputStyle]}
                  value={destination && destination.trim()}
                  editable={disabledDestination}
                  //numberOfLines={1}
                  onChangeText={onChangeDestination}
                  //autoFocus={focusSource}
                />
                {/* <Image source={Constants.Images.Common.Cancel} resizeMode={"contain"} style={{backgroundColor:'red'}} /> */}
              </View>
            ) : !hideDestination ? (
              <TouchableOpacity
                disabled={disabledDestination}
                style={Styles.inputBox}
                onPress={() =>
                  onPressDestination(
                    Constants.AppCosntants.UserLocation.Destination
                  )
                }
              >
                <Text
                  {...props}
                  numberOfLines={1}
                  style={[
                    Styles.inputStyle,
                    {
                      color: destination
                        ? Constants.Colors.Primary
                        : Constants.Colors.placehoder
                    }
                  ]}
                >
                  {(destination && destination.trim()) ||
                    destinationPlaceholder}
                </Text>
                {destination ? (
                  <TouchableOpacity
                    style={Styles.crossImg}
                    onPress={() =>
                      clearBox(Constants.AppCosntants.UserLocation.Destination)
                    }
                  >
                    <Image
                      source={Constants.Images.Common.Cross}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                ) : null}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {loading ? (
        <View style={Styles.indicatorStyle}>
          <ActivityIndicator color={Constants.Colors.Primary} size={"large"} />
        </View>
      ) : terminal && terminal.length ? (
        <View style={[Styles.searchWrapper, Styles.terminalListing]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={terminal}
            extraData={terminal}
            scrollEnabled={true}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelectTerminal(item)}
                  style={Styles.terminalView}
                >
                  <View style={Styles.searchIcon}>
                    <Image source={Constants.Images.Common.Admin} />
                  </View>
                  <View style={Styles.terminalName}>
                    <Text numberOfLines={1} style={Styles.terminalNameText}>
                      {item.name.trim()}
                    </Text>
                    <Text numberOfLines={2} style={Styles.terminalNameSubText}>
                      {item.address.trim()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}

      {!loading && terminal && terminal.length < 1 ? (
        <View style={Styles.notFound}>
          <Text style={Styles.titleText}>Terminals Not Found!</Text>
        </View>
      ) : null}
    </View>
  );
};

export default LocationInput;
const Styles = StyleSheet.create({
  shadow: {
    shadowColor: "#A9AFAF",
    shadowOffset: { width: moderateScale(1), height: moderateScale(1) },
    shadowOpacity: moderateScale(0.8),
    shadowRadius: moderateScale(2),
    elevation: moderateScale(1)
  },
  searchWrapper: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    borderWidth: 0,
    flexDirection: "row",
    borderColor: "#A9AFAF",
    marginHorizontal: moderateScale(25),
    overflow: "hidden"
  },
  searchIcon: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10)
  },
  inputContainer: {
    flex: 1
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputBox: {
    flex: 0.98,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: moderateScale(50)
    //borderWidth:2,
    // backgroundColor: "red"
  },
  inputStyleBorder: {
    borderBottomColor: "#A9AFAF",
    borderBottomWidth: 0.4
  },
  inputStyle: {
    ...Constants.Fonts.SemiBold,
    fontSize: moderateScale(17),
    flex: 1,
    color: Constants.Colors.Primary,
    //overflow: "hidden",
    alignItems: "flex-end",
    textAlignVertical: "center"
  },

  centerTextStyle: {
    ...Constants.Fonts.Bold,
    fontSize: moderateScale(24),
    textAlign: "center",
    color: Constants.Colors.Primary
  },
  crossImg: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10)
  },
  terminalListing: {
    flexDirection: "column",
    marginTop: moderateScale(5),
    borderRadius: 0,
    borderWidth: 0,
    marginHorizontal: moderateScale(0),
    //backgroundColor: "green",
    height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8,
    paddingBottom: moderateScale(20)
  },
  indicatorStyle: {
    //height: Constants.BaseStyle.DEVICE_HEIGHT-moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10)
  },
  terminalView: {
    // flex: 1,
    paddingVertical: moderateScale(10),
    borderBottomWidth: 0.4,
    borderBottomColor: Constants.Colors.placehoder,
    flexDirection: "row",
    paddingHorizontal: moderateScale(15)
  },
  terminalName: { flex: 0.9 },
  terminalNameText: {
    ...Constants.Fonts.SemiBold,
    fontSize: moderateScale(19),
    color: Constants.Colors.Primary
  },
  terminalNameSubText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(17),
    color: Constants.Colors.placehoder
  },
  notFound: { justifyContent: "center", alignItems: "center" },
  titleText: {
    paddingLeft: moderateScale(20),
    fontSize: moderateScale(19),
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.Primary
  }
});
