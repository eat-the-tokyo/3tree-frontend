import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { ContainedButton } from "../button";
import { ProfileDefault } from "../../assets/icons";
import { ProfileDropbox } from "./components";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../utils/api/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, signupState } from "../../utils/atoms/login";
import axios from "axios";
import { handleTokenExpired } from "../../utils/api/base";
import i18next from "i18next";

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 75px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 22px 20px 12px 20px;
  background-color: ${palette.white};
  position: fixed;
  top: 0px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  ${Typograpy.Headline1}
  color: #000000;
  font-family: Montserrat;
  margin: auto 0px;
`;

const ProfileButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid ${palette.grey_7};
  background-image: url(${({ img }) => (img ? img : ProfileDefault)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const LoginHeader = ({ onVisible }) => {
  const [dropBoxOn, setDropBoxOn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const isSignup = useRecoilValue(signupState);
  const { t } = useTranslation();

  const loginOnClick = () => {
    onVisible(true);
  };

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  const getUserData = async () => {
    let returnValue;
    await axios
      .get(`/users/my/info`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((data) => {
        returnValue = data.data.resultData;
        setUserInfo(returnValue);
        const userLanguage = returnValue?.language.toLowerCase().slice(0, 2);
        if (userLanguage === "en") {
          i18next.changeLanguage("en");
        } else {
          i18next.changeLanguage("ko");
        }
        localStorage.setItem("language", userLanguage);
      })
      .catch((error) => {
        console.log(error);
        handleTokenExpired(error);
      });
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("accessToken")) {
      getUserData();
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <HeaderContainer>
      {dropBoxOn ? (
        <ProfileDropbox
          visible={dropBoxOn}
          closable={true}
          maskClosable={true}
          onClose={profileImgOnClose}
        />
      ) : (
        <></>
      )}
      <InnerContainer>
        <LogoContainer>3TREE</LogoContainer>
        {isLoggedIn ? (
          <ProfileButton
            img={userInfo?.profileImg}
            onClick={profileImgOnClick}
          />
        ) : (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="medium"
            label={t("introPageHeader1")}
            onClick={loginOnClick}
          />
        )}
      </InnerContainer>
    </HeaderContainer>
  );
};

export default LoginHeader;
