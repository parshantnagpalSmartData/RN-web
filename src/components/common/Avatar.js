/*
 * file :profileView.js
 * @ description : profile name with profile pic
 * @ date : 7 March 2018
 * @author : Abhishek
 */

import React from "react";
import { Image, View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types"; // ES6
import Constants from "../../constants";

const Avatar = props => {
	const { source, backgroundColor, style } = props;
	return (
		<View
			style={[
				styles.profileBackground,
				style,
				{ backgroundColor: backgroundColor }
			]}
		>
			<Image source={source} style={styles.profilePic} />
		</View>
	);
};

/**
 * default styles
 * */
const styles = StyleSheet.create({
	profilePic: {
		height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25,
		width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25,
		borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 200) * 25,
		...Platform.select({
			web: {
				height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 12,
				width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 12
			}
		})
	},
	profileBackground: {
		height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25,
		alignItems: "center",
		...Platform.select({
			web: {
				height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 12
			}
		})
	}
});
/**
 * declare prop's specific JS type.
 * */
Avatar.propTypes = {
	source: PropTypes.string,
	text: PropTypes.string,
	backgroundColor: PropTypes.string,
	showName: PropTypes.bool,
	showEditImg: PropTypes.bool,
	sourceEditImg: PropTypes.object,
	style: PropTypes.object,
	onPress: PropTypes.func
};
Avatar.defaultProps = {
	source: null,
	text: null,
	backgroundColor: null,
	showName: true,
	showEditImg: false,
	sourceEditImg: null,
	style: null,
	onPress: null
};

export default Avatar;
