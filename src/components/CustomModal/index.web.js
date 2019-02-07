/**
 * Name : Parshant Nagpal
 * File Name : index.web.js
 * Description : Contains the custom Modal for Web
 * Date : 17 Jan 2019
 */

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import DivContainer from "../Common/DivContainer";

const CustomModal = props => {
  const { isVisible, onBackdropPress, customStyles, className, overlayClassName } = props;

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={() => onBackdropPress()}
      style={customStyles}
      className={className}
      overlayClassName={overlayClassName}
    >
      <DivContainer className={"modal"}>{props.children}</DivContainer>
    </Modal>
  );
};

/**
 * declare prop's specific JS type.
 * */
CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
};
CustomModal.defaultProps = {
  isOpen: false,
  onRequestClose: null,
  className: "",
  overlayClassName: ""
};

export default CustomModal;
