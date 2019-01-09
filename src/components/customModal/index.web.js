/**
 * Name :Suraj Sanwal
 * File Name : ToastNotification.js
 * Description : Contains the toast Notificaitons of the Web
 * Date : 25 Sept 2018
 */

import React from "react";
import Modal from "react-modal";
// import PropTypes from "prop-types"; // ES6

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
CustomModal.propTypes = {};
CustomModal.defaultProps = {};

export default CustomModal;
