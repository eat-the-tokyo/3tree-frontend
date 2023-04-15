import {
  dashboard1,
  dashboard2,
  dashboard3,
  dashboard4,
  dashboard5,
  dashboard6,
} from "assets/images";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { LoginHeader } from "../../components/header";
import { LoginModal, SingleModal } from "../../components/modal";
import { loginState, signupState } from "../../utils/atoms/login";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const Dashboard1 = styled.img`
  width: 100%;
  height: 98.9%;
`;

const Dashboard2 = styled.img`
  cursor: pointer;
  width: 89%;
  height: 16.7%;
`;

const Dashboard3 = styled.img`
  width: 100%;
  height: 40%;
`;

const Dashboard4 = styled.img`
  width: 100%;
  height: 157.9%;
`;

const Dashboard5 = styled.img`
  cursor: pointer;
  width: 100%;
  height: 156.4%;
`;

const Dashboard6 = styled.img`
  width: 100%;
  height: 27.1%;
  position: absolute;
  position: sticky;
  left: 0;
  bottom: 0;
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

  const sendOnClick = () => {
    if (isLoggedIn) {
      window.location.href = "/sendToken";
    } else {
      setLoginAlertModalVisible(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("language", "en");
  });

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
          <Dashboard1 src={dashboard1} />
          <Dashboard2 src={dashboard2} onClick={sendOnClick} />
          <Dashboard3 src={dashboard3} />
          <Dashboard4 src={dashboard4} />
          <Dashboard5 src={dashboard5} />
          <Dashboard6 src={dashboard6} />
        </FullContainer>
      )}
    </>
  );
};

export default IntroPage;
