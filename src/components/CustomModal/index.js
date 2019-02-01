/*
 * file :index.js
 * @ description : Contains model for app
 * @ date : 9 Jan 2019
 * @author : Parshant Nagpal
 */

import React from "react";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import Constants from "../../constants";

const CustomModal = props => {
  const { isVisible, onBackdropPress, style } = props;
  return (
    <Modal
      isVisible={isVisible}
      style={style}
      deviceWidth={Constants.BaseStyle.DEVICE_WIDTH}
      deviceHeight={Constants.BaseStyle.DEVICE_HEIGHT}
      onBackdropPress={() => onBackdropPress()}
    >
      {props.children}
    </Modal>
  );
};

/**
 * declare prop's specific JS type.
 * */
CustomModal.propTypes = {
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func
};
CustomModal.defaultProps = {
  isVisible: false,
  onBackdropPress: null
};

export default CustomModal;
