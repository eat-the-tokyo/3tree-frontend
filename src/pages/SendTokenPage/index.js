import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import { LoadingComponent } from "../../components/card";
import { SendTokenHeader } from "../../components/header";
import { DeleteModal } from "../../components/modal";
import { getUserInfo } from "../../utils/api/auth";
import { loginState } from "../../utils/atoms/login";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typography from "../../utils/style/Typography/index";
import {
  FailedComponent,
  FinalConfirmation,
  SendSuccess,
  Step1,
  Step2,
  Step3,
} from "./components";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: auto 50px;
  // padding-top: 75px;
`;

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 80px;
`;

const StepStatusBox = styled.div`
  display: flex;
  position: relative;
  padding-top: 105px;
  align-items: center;
  justify-content: left;
`;

const StepingCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  ${Typography.Headline3}
  font-family: Montserrat;
  color: ${palette.blue_2};
  background-color: ${palette.white};
  box-shadow: 0px 0px 0px 2px ${palette.blue_2} inset;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  ${Typography.Headline3}
  font-family: Montserrat;
  color: ${palette.white};
  background-color: ${palette.blue_2};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepUnCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 0px 2px ${palette.grey_6} inset;
  ${Typography.Headline3}
  font-family: Montserrat;
  color: ${palette.grey_5};
  background-color: ${palette.grey_7};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepLine = styled.div`
  width: 30px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.blue_2};
  z-index: 2;
`;

const StepUnLine = styled.div`
  width: 30px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.grey_6};
  z-index: 2;
`;

const StepHeader = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.black};
  margin-top: 36px;
  margin-bottom: 40px;
`;

const StepButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StepComponentBox = styled.div`
  min-height: 40vh;
`;

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const SendTokenPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [stepStatus, setStepStatus] = useState(1);
  const [platform, setPlatform] = useState("google");
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState("unvalid");
  const [platformIcon, setPlatformIcon] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [currency, setCurrency] = useState("");
  const [network, setNetwork] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [walletType, setWalletType] = useState("");
  const [sendDone, setSendDone] = useState(false);
  const [expired, setExpired] = useState("");
  const [finalLink, setFinalLink] = useState("");
  const [balance, setBalance] = useState("0");
  const [realBalance, setRealBalance] = useState("0");

  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [resend, setResend] = useState(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [finalModalVisible, setFinalModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isLoggedIn = useRecoilValue(loginState);

  const { t } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfo().then((data) => {
        setUserInfo(data);
      });
    } else {
      alert(t("introPageAlert1"));
      window.location.href = "/";
    }
  }, []);

  const StepList = [
    {
      id: 1,
      text: (
        <>
          {t("sendPage01_1")}
          <br />
          {t("sendPage01_2")}
        </>
      ),
      component: Step1({
        setPlatform: setPlatform,
        setPlatformIcon: setPlatformIcon,
        setEmail: setEmail,
        email: email,
        setEmailState: setEmailState,
        emailState: emailState,
      }),
    },
    {
      id: 2,
      text: "",
      component: Step2({
        setWalletType: setWalletType,
        setAddress: setSenderAddress,
        setNetwork: setNetwork,
        setNetworkId: setNetworkId,
        setCurrency: setCurrency,
        setStepStatus: setStepStatus,
        walletType: walletType,
        address: senderAddress,
        network: network,
        networkId: networkId,
        currency: currency,
        email: email,
        platformIcon: platformIcon,
        userId: userInfo?.userId,
        stepStatus: stepStatus,
        setExpired: setExpired,
        setFinalLink: setFinalLink,
        setLoading: setLoading,
        setFailed: setFailed,
        resend: resend,
        setBalance: setBalance,
        balance: balance,
        setRealBalance: setRealBalance,
        realBalance: realBalance,
      }),
    },
    {
      id: 3,
      text: "",
      component: Step3({
        setAmount: setAmount,
        setCurrency: setCurrency,
        setToken: setToken,
        amount: amount,
        token: token,
        networkId: networkId,
        currency: currency,
        expired: expired,
        finalLink: finalLink,
      }),
    },
  ];

  const leftOnClick = () => {
    if (stepStatus == 1) {
      window.location.href = "/";
    } else {
      setStepStatus(stepStatus - 1);
    }
  };

  const rightOnClick = () => {
    if (isMobileDevice()) {
      if (stepStatus < StepList.length) {
        if (stepStatus == 1) {
          setModalVisible(true);
        } else {
          setStepStatus(stepStatus + 1);
        }
      } else {
        setFinalModalVisible(true);
      }
    } else {
      if (stepStatus < StepList.length) {
        setStepStatus(stepStatus + 1);
      } else {
        setFinalModalVisible(true);
      }
    }
  };

  const headerRightOnClick = () => {
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const setRealDelete = () => {
    window.location.href = "/";
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {failed ? (
            <FailedComponent setFailed={setFailed} setResend={setResend} />
          ) : (
            <>
              {cancelModalOpen && (
                <DeleteModal
                  visible={cancelModalOpen}
                  closable={true}
                  maskClosable={true}
                  onClose={closeCancelModal}
                  text={<>{t("sendPage01Alert1")}</>}
                  setRealDelete={setRealDelete}
                  buttonText={t("sendPage01Alert2")}
                />
              )}
              {finalModalVisible ? (
                <FinalConfirmation
                  platform={platform}
                  email={email}
                  amount={amount}
                  currency={currency}
                  networkId={networkId}
                  walletType={walletType}
                  address={senderAddress}
                  network={network}
                  userId={userInfo?.userId}
                  setVisible={setFinalModalVisible}
                  setSendDone={setSendDone}
                />
              ) : (
                <>
                  {sendDone ? (
                    <SendSuccess />
                  ) : (
                    <FullContainer>
                      <SendTokenHeader
                        title={t("sendpage02Header1")}
                        leftOnClick={leftOnClick}
                        rightOnClick={headerRightOnClick}
                        stepStatus={stepStatus}
                      />
                      <ContentContainer>
                        <StepStatusBox>
                          {StepList.map((step, idx) => (
                            <>
                              {idx == 0 ? (
                                <>
                                  {idx == stepStatus - 1 ? (
                                    <StepingCircle>{step.id}</StepingCircle>
                                  ) : (
                                    <StepCircle>{step.id}</StepCircle>
                                  )}
                                </>
                              ) : (
                                <>
                                  {idx < stepStatus - 1 ? (
                                    <>
                                      <StepLine />
                                      <StepCircle>{step.id}</StepCircle>
                                    </>
                                  ) : (
                                    <>
                                      {idx == stepStatus - 1 ? (
                                        <>
                                          <StepUnLine />
                                          <StepingCircle>
                                            {step.id}
                                          </StepingCircle>
                                        </>
                                      ) : (
                                        <>
                                          <StepUnLine />
                                          <StepUnCircle>{step.id}</StepUnCircle>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          ))}
                        </StepStatusBox>
                        <StepHeader>{StepList[stepStatus - 1].text}</StepHeader>
                        <StepComponentBox>
                          {StepList[stepStatus - 1].component}
                        </StepComponentBox>
                        <StepButtonContainer>
                          {stepStatus == 1 && (
                            <>
                              {emailState === "filled" ? (
                                <ContainedButton
                                  type="primary"
                                  styles="filled"
                                  states="default"
                                  size="large"
                                  label={t("sendPage01_6")}
                                  onClick={rightOnClick}
                                />
                              ) : (
                                <ContainedButton
                                  type="primary"
                                  styles="filled"
                                  states="disabled"
                                  size="large"
                                  label={t("sendPage01_6")}
                                />
                              )}
                            </>
                          )}
                        </StepButtonContainer>
                      </ContentContainer>
                    </FullContainer>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SendTokenPage;
