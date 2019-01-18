/**
 * Name : Parshant Nagpal
 * File Name : index.web.js
 * Description : Contains the custom Modal for Web
 * Date : 17 Jan 2019
 */

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const CustomModal = props => {
  const { isVisible, onBackdropPress } = props;
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