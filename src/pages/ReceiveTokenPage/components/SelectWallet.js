import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendTokenHeader } from "../../../components/header";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import WalletComponent from "./WalletComponent";
import ReceiveComplete from "./ReceiveComplete";
import { LoadingComponent } from "../../../components/card";
import FailComponent from "./FailComponent";
import { useTranslation } from "react-i18next";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const TextBox = styled.div`
  padding-top: 124px;
  margin-bottom: 30px;
`;

const HeaderBox = styled.div`
  margin-bottom: 14px;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const SubtextBox = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const SelectWallet = ({ linkInfo, walletData }) => {
  const [infoChange, setInfoChange] = useState(false);
  const [complete, setComplete] = useState(false);
  const [receiveInfo, setReceiveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sendOnClick, setSendOnClick] = useState(null);
  const [resend, setResend] = useState(false);
  const [select, setSelect] = useState(0);
  const { t } = useTranslation();

  const leftOnClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      {complete ? (
        <ReceiveComplete walletList={walletData} select={select} />
      ) : (
        <>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {failed ? (
                <FailComponent
                  buttonOnClick={sendOnClick}
                  setFailed={setFailed}
                  setResend={setResend}
                />
              ) : (
                <>
                  {!resend && (
                    <>
                      <SendTokenHeader
                        title={t("receiveTokenPage1")}
                        leftOnClick={leftOnClick}
                      />
                      <ContentContainer>
                        <TextBox>
                          <HeaderBox>{t("selectWalletPage1")}</HeaderBox>
                          <SubtextBox>{t("selectWalletPage2")}</SubtextBox>
                        </TextBox>
                      </ContentContainer>
                      <WalletComponent
                        walletList={walletData}
                        setInfoChange={setInfoChange}
                        infoChange={infoChange}
                        setComplete={setComplete}
                        setReceiveInfo={setReceiveInfo}
                        linkInfo={linkInfo}
                        setLoading={setLoading}
                        setFailed={setFailed}
                        setSendOnClick={setSendOnClick}
                        resend={resend}
                        select={select}
                        setSelect={setSelect}
                      />
                    </>
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

export default SelectWallet;
