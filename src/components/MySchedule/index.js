/**
 * File: MySchedule
 * Author Name : Parshant Nagpal
 * Description : component for mySchedule
 */

import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

const MySchedule = ({ item, index }) => {
  return (
    <View style={Styles.containner}>
      <View style={Styles.leftDateContainer}>
        <Text style={[Styles.commonFontColor, Styles.dateText]}>
          {item.date}
        </Text>
        <Text style={[Styles.commonFontColor, Styles.dayText]}>{item.day}</Text>
      </View>
      <View style={Styles.rightContainer}>
        <View
          key={index}
          style={[Styles.DetailsView, { borderTopWidth: index !== 0 ? 1 : 0 }]}
        >
          <View>
            <View>
              <Text style={[Styles.commonFontColor, Styles.itemName]}>
                {item.name}
              </Text>
            </View>
            <View>
              <Text style={[Styles.commonFontColor, Styles.itemToFrom]}>
                {item.from} - {item.to}
              </Text>
            </View>
            <View>
              <Text style={[Styles.commonFontColor, Styles.itemType]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  containner: {
    ...Platform.select({
      web: {
        height: moderateScale(75),
        flexDirection: "row"
        //width: Constants.BaseStyle.DEVICE_WIDTH
      },
      ios: {
        flex: 1,
        flexDirection: "row"
      },
      android: {
        flex: 1,
        flexDirection: "row"
      }
    })
  },
  dateText: {
    fontSize: moderateScale(28)
  },
  dayText: {
    fontSize: moderateScale(15)
  },
  leftDateContainer: {
    ...Platform.select({
      web: {
        width: moderateScale(75),
        justifyContent: "center",
        alignItems: "center"
        //width: Constants.BaseStyle.DEVICE_WIDTH
      },
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    })
  },
  DetailsView: {
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: Constants.Colors.LightGrey,
    borderBottomWidth: 0.2,
    borderLeftWidth: 1,
    paddingVertical: moderateScale(10),
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH / 2
        : Constants.BaseStyle.DEVICE_WIDTH * 0.75
  },
  itemName: { fontSize: moderateScale(17), paddingBottom: moderateScale(2) },
  itemToFrom: { fontSize: moderateScale(12), paddingBottom: moderateScale(2) },
  itemType: { fontSize: moderateScale(15), paddingBottom: moderateScale(2) },
  rightContainer: {
    ...Platform.select({
      web: {
        width: moderateScale(300)
        //width: Constants.BaseStyle.DEVICE_WIDTH
      },
      ios: {
        flex: 3
      },
      android: {
        flex: 3
      }
    })
  },
  commonFontColor: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular
  }
});

export default MySchedule;
