import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { SmileySad } from "../../assets/icons";
import Typography from "../../utils/style/Typography";
import { useTranslation } from "react-i18next";

const ModalWrapper = styled.div`
  z-index: 101;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  max-width: 560px;
  margin-left: 20px;
`;

const ModalItems = styled.div`
  position: relative;
  bottom: -84px;
  animation: slideUp 0.5s ease-out forwards;

  @keyframes slideUp {
    to {
      bottom: 16px;
    }
  }
  display: flex;
  align-items: center;
  height: 84px;
  padding: 23px 16px;
  border-radius: 12px;
  background-color: ${palette.black};
`;

const SmileySadIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const ModalInfoText = styled.div`
  color: ${palette.sky_3};

  & > p {
    margin: 0;
    ${Typography.Headline3};
  }

  & > p:last-of-type {
    ${Typography.Caption1}
  }
`;

const UnvalidFormatModal = ({ visible, onClickEvent }) => {
  const { t } = useTranslation();

  return (
    <>
      {visible && (
        <ModalWrapper onClick={onClickEvent}>
          <ModalItems>
            <SmileySadIcon src={SmileySad} />
            <ModalInfoText>
              <p>{t("unvalidFormatModal1")}</p>
              <p>{t("unvalidFormatModal2")}</p>
            </ModalInfoText>
          </ModalItems>
        </ModalWrapper>
      )}
    </>
  );
};

export default UnvalidFormatModal;
