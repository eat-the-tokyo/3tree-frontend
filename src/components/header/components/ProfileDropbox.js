import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import {
  DropboxBubbleTail,
  DropboxLogout,
  DropboxSettings,
  DropboxFeedback,
} from "../../../assets/icons";
import Typography from "../../../utils/style/Typography";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../utils/atoms/login";

const DropBoxContainer = styled.div`
  min-width: 92px;
  height: 128px;
  border-radius: 8px;
  background-color: ${palette.white};
  position: absolute;
  right: 19px;
  top: 70px;
  box-shadow: 0px 4px 30px 0px #a9adb533;
  z-index: 1010;
  //   box-shadow: 0px 4px 12px 0px #a9adb533;
`;

const DropBoxOuterBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0px auto;
  position: relative;
  z-index: 900;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const BubbleTailBox = styled.div`
  width: 10px;
  height: 6px;
  position: absolute;
  top: -6px;
  right: 16px;
  background-color: transparent;
  background-image: url(${DropboxBubbleTail});
  //   box-shadow: 0px 2px 10px #c4c4c440;
  filter: drop-shadow(0px 2px 10px #c4c4c444);
`;

const TapButton = styled.button`
  width: 100%;
  height: 42px;
  background-color: transparent;
  border: hidden;
  display: flex;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
  gap: 4px;
`;

const TapText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_1};
  margin: auto 0px;
`;

const TapIcon = styled.img`
  width: 16px;
  height: 16px;
  margin: auto 0px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.grey_7};
`;

const ProfileDropbox = ({ className, onClose, maskClosable, visible }) => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const { t } = useTranslation();

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const logoutOnClick = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.reload();
  };

  const settingOnClick = () => {
    window.location.href = "/settings";
  };

  const feedbackOnClick = () => {
    window.open("https://forms.gle/PvgL1PV8tKcNkzmy5");
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <DropBoxOuterBox
          className={className}
          onClick={maskClosable ? onMaskClick : null}
          tabIndex="-1"
          visible={visible}
        >
          <DropBoxContainer>
            <BubbleTailBox />
            <TapButton onClick={settingOnClick}>
              <TapText>{t("introPageHeader2")}</TapText>
              <TapIcon src={DropboxSettings} />
            </TapButton>
            <Divider />
            <TapButton onClick={feedbackOnClick}>
              <TapText>{t("introPageHeader3")}</TapText>
              <TapIcon src={DropboxFeedback} />
            </TapButton>
            <Divider />
            <TapButton onClick={logoutOnClick}>
              <TapText style={{ color: palette.red_2 }}>
                {t("introPageHeader4")}
              </TapText>
              <TapIcon src={DropboxLogout} />
            </TapButton>
          </DropBoxContainer>
        </DropBoxOuterBox>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  // width: 100%;
  //   max-width: 600px;
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
  background-color: transparent;
  z-index: 999;
`;

export default ProfileDropbox;
