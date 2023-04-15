import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BottomModalX } from "../../assets/icons";

function BottomModal({
  className,
  onClose,
  maskClosable,
  visible,
  renderInput,
}) {
  useEffect(() => {
    console.log(visible);
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      document.body.style.overflow = "auto";
      onClose(e);
    }
  };

  const closeOnClick = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  const _renderInput = () => {
    if (typeof renderInput === "function") {
      return renderInput();
    }
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          {/* <ContentContainer> */}
          <CloseButton onClick={closeOnClick} />
          {/* </ContentContainer> */}
          {_renderInput()}
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

BottomModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  //   top: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 901;
  overflow: hidden;
  //   overflow: auto;
  //   outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 900;
  overflow: hidden;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  margin-top: 20vh;
  border: none;
  border-radius: 30px 30px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  margin: 0 auto;
  position: absolute;
  top: 37px;
  right: 20px;
  z-index: 904;
  background-image: url(${BottomModalX});
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: center;
`;

export default BottomModal;
