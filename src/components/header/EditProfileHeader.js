import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { IconButton, TextButton } from "../button";
import { ChevronLeft, ExternalLink } from "../../assets/icons";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { useTranslation } from "react-i18next";

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 74px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 22px 20px 12px 20px;
  background-color: ${palette.white};
  position: fixed;
  top: 0px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  ${Typograpy.Headline1}
  color: ${palette.Black};
  font-family: Montserrat;
  margin: auto 0px;
`;

const EditProfileHeader = ({
  onVisible,
  title,
  iconLeft = ChevronLeft,
  iconRight = ExternalLink,
  leftOnClick,
  rightOnClick,
}) => {
  const [userInfo, setUserInfo] = useState();
  const [dropBoxOn, setDropBoxOn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    }
  }, []);

  const loginOnClick = () => {
    console.log("jell");
    onVisible(true);
  };

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  const backOnClick = () => {
    window.history.back();
  };

  const leftIconOnClick = () => {
    leftOnClick(false);
  };

  const rightIconOnClick = () => {
    rightOnClick();
    // alert("준비중입니다.");
  };

  return (
    <HeaderContainer>
      <InnerContainer>
        <div style={{ width: "57px" }}>
          <IconButton
            type="secondary"
            styles="outlined"
            states="default"
            size="xs"
            icon={iconLeft}
            onClick={leftIconOnClick}
          />
        </div>
        <TitleContainer>{title}</TitleContainer>
        <TextButton
          styles="active"
          states="default"
          size="large"
          label={t("editProfilePage1")}
          onClick={rightIconOnClick}
        />
      </InnerContainer>
    </HeaderContainer>
  );
};

export default EditProfileHeader;
