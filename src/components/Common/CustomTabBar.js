/**
 * @author Suraj Sanwal
 * @name CustomTabBar.js
 * @description Contains the custom tab bar.
 * @date 24 Jan 2019
 */

import React from "React";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const CustomTabBar = props => {
  let { tabs, goToPage, activeTab } = props;
  return (
    <FlatList
      key={activeTab}
      data={tabs}
      horizontal
      contentContainerStyle={[Styles.contentContainerStyle]}
      renderItem={({ item, index }) => {
        var inbox =
          activeTab == 0
            ? Constants.Images.InboxActive
            : Constants.Images.InboxInactive;
        var sent =
          activeTab == 1
            ? Constants.Images.SentActive
            : Constants.Images.SentInactive;
        var trash =
          activeTab == 2
            ? Constants.Images.TrashActive
            : Constants.Images.TrashInactive;
        var img = item === "Inbox" ? inbox : item === "Sent" ? sent : trash;
        return (
          <TouchableOpacity
            onPress={() => goToPage(index)}
            style={[
              {
                borderBottomWidth: activeTab === index ? 3 : 0
              },
              Styles.itemContainer
            ]}
          >
            <View style={Styles.imageView}>
              <Image
                source={img}
                style={Styles.imgStyle}
                resizeMode={"contain"}
              />
            </View>
            <Text
              style={[
                {
                  color:
                    activeTab === index
                      ? Constants.Colors.Primary
                      : Constants.Colors.Gray
                },
                Styles.textStyle
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: "space-around",
    height: moderateScale(40),
    width: Constants.BaseStyle.DEVICE_WIDTH
  },
  itemContainer: {
    margin: moderateScale(20),
    borderBottomColor: Constants.Colors.Primary,
    width: Constants.BaseStyle.DEVICE_WIDTH / 4,
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: moderateScale(10)
  },
  imageView: {
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: "center",
    alignItems: "center"
  },
  imgStyle: { height: moderateScale(25), width: moderateScale(25) },
  textStyle: { ...Constants.Fonts.Medium, fontSize: moderateScale(12) }
});
export default CustomTabBar;

CustomTabBar.defaultProps = {
  tabs: null,
  goToPage: null,
  activeTab: 0
};

CustomTabBar.propTypes = {
  tabs: PropTypes.array,
  goToPage: PropTypes.func,
  activeTab: PropTypes.number
};
