/*
 * file :index.js
 * @ description : Contains model for app
 * @ date : 9 Jan 2019
 * @author : Parshant Nagpal
 */

import React from "react";
import Modal from "react-native-modal";
import PropTypes from "prop-types";

const CustomModal = props => {
  const { isVisible, onBackdropPress } = props;
  return (
    <Modal isVisible={isVisible} onBackdropPress={() => onBackdropPress()}>
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
