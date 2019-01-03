/*
 * file :profileView.js
 * @ description : profile name with profile pic
 * @ date : 7 March 2018
 * @author : Abhishek
 */

import React from "react";
import Modal from "react-native-modal";

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
CustomModal.propTypes = {};
CustomModal.defaultProps = {};

export default CustomModal;
