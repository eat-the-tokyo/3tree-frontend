import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../../utils/style/Typography";
import { ContainedButton } from "../button";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { useTranslation } from "react-i18next";

const InnerContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const TextContainer = styled.div`
  ${Typography.Body};
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
`;

function ConfirmModal({
  className,
  onClose,
  maskClosable,
  visible,
  text,
  buttonText,
  subActionOnClick,
}) {
  const { t } = useTranslation();

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const realConfirmOnClick = () => {
    subActionOnClick();
    onClose();
  };

  const cancelOnClick = () => {
    onClose();
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
          <InnerContainer>
            <TextContainer>{text}</TextContainer>
            <ButtonContainer>
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label={buttonText ? buttonText : t("manageProfilePageAlertDeleteLink3")}
                style={{ backgroundColor: palette.blue_1 }}
                onClick={realConfirmOnClick}
              />
              <ContainedButton
                type="secondary"
                styles="outlined"
                states="default"
                size="large"
                label={t("manageProfilePageAlertDeleteLink4")}
                onClick={cancelOnClick}
              />
            </ButtonContainer>
          </InnerContainer>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
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
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  width: 312px;
  max-height: 300px;
  padding: 16px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
`;

export default ConfirmModal;
