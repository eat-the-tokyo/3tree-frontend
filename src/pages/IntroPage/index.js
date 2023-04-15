import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import { LoginHeader } from "../../components/header";
import { LoginModal, SingleModal } from "../../components/modal";
import { loginState, signupState } from "../../utils/atoms/login";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 88px;
  padding: 16px 20px;
  position: fixed;
  bottom: 0px;
  display: flex;
  gap: 10px;
  z-index: 100;
  backdrop-filter: blur(15px);
`;

const IntroPage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginAlertModalVisible, setLoginAlertModalVisible] = useState(false);
  const [isSignup, setIsSignup] = useRecoilState(signupState);
  const isLoggedIn = useRecoilValue(loginState);
  const { t } = useTranslation();

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const closeLoginAlertModal = () => {
    setLoginAlertModalVisible(false);
  };

  const profileSettingOnClick = () => {
    if (isLoggedIn) {
      window.location.href = "/editProfile";
    } else {
      setLoginAlertModalVisible(true);
    }
  };
  const sendOnClick = () => {
    if (isLoggedIn) {
      window.location.href = "/sendToken";
    } else {
      setLoginAlertModalVisible(true);
    }
  };

  return (
    <>
      {!isSignup && (
        <FullContainer>
          <LoginHeader onVisible={setLoginModalVisible} />
          {loginModalVisible ? (
            <LoginModal
              visible={loginModalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeLoginModal}
              setStatus={setIsSignup}
            />
          ) : (
            <>
              {loginAlertModalVisible ? (
                <SingleModal
                  visible={setLoginAlertModalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={closeLoginAlertModal}
                  text={<>{t("introPageAlert1")}</>}
                  setStatus={setLoginModalVisible}
                  buttonText={t("introPageAlert2")}
                />
              ) : (
                <></>
              )}
            </>
          )}
          <ButtonContainer>
            <ContainedButton
              type="secondary"
              styles="filled"
              states="default"
              size="large"
              label={
                <div
                  style={{
                    whiteSpace: "nowrap",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                  }}
                >
                  {t("introPage3")}
                </div>
              }
              onClick={sendOnClick}
              style={{
                width: "auto",
                whiteSpace: "nowrap",
              }}
            />
            <ContainedButton
              type="primary"
              styles="filled"
              states="default"
              size="large"
              label={t("introPage4")}
              onClick={profileSettingOnClick}
            />
          </ButtonContainer>
        </FullContainer>
      )}
    </>
  );
};

export default IntroPage;
