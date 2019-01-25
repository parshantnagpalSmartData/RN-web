/**
 * Name : Parshant Nagpal
 * File Name : index.web.js
 * Description : Contains the custom Modal for Web
 * Date : 17 Jan 2019
 */

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const CustomModal = props => {
  const { isVisible, onBackdropPress, customStyles } = props;
  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={() => onBackdropPress()}
      style={customStyles}
    >
      {props.children}
    </Modal>
  );
};

/**
 * declare prop's specific JS type.
 * */
CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};
CustomModal.defaultProps = {
  isOpen: false,
  onRequestClose: null
};

export default CustomModal;
