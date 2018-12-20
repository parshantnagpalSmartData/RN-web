import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { pathname } = this.props.location;
    return (
      <View style={styles.container}>
        <Image
          source={Constants.Images.Logo}
          style={{ height: moderateScale(100), width: moderateScale(100) }}
        />
        <View>
          <Text>404</Text>
          <Text>That’s an error.</Text>
        </View>
        <View>
          <Text>
            The requested URL {pathname} was not found on this server. That’s
            all we know.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default NotFound;
