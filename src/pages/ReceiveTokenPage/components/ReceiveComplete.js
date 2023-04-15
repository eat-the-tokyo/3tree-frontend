import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EditableCard } from "../../../components/card";
import Lottie from "react-lottie-player";
import animation from "../../../assets/lottie/check-lottie.json";
import { MetamaskIcon, GreenCheck, ChevronRight } from "../../../assets/icons";
import { CompasImage } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import { getTrxsLinkInfo } from "../../../utils/api/trxs";
import { useRecoilValue } from "recoil";
import { receiveTrxHashState } from "../../../utils/atoms/trxs";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 100px;
  margin: 0px auto;
  padding-top: 140px;
  margin-bottom: 10px;
`;

const WalletBox = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 36px;
  font-family: Montserrat;
`;

const CheckBox = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
`;

const CheckTxTitle = styled.div`
  ${Typography.Headline2}
  color: ${palette.grey_2};
`;

const TxHashCard = styled.button`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 57px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
  position: relative;
`;

const TimerBox = styled.img`
  width: 46px;
`;

const TxHashInfobox = styled.div``;

const TxHashInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
`;

const TxHashAddressBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TxHashAddress = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
  text-decoration: underline;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0%, -50%);
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const walletConvert = (walletAddress) => {
  var returnAddress = walletAddress;
  if (walletAddress?.length > 15) {
    returnAddress =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnAddress;
};

const ReceiveComplete = ({ walletList, select }) => {
  const { t } = useTranslation();
  const [receiveInfo, setReceiveInfo] = useState(null);
  const receiveTrxHash = useRecoilValue(receiveTrxHashState);

  const txHashExplorerOnClick = () => {
    if (Number(receiveInfo.networkId) == 5) {
      window.open(`https://goerli.etherscan.io/tx/${receiveTrxHash}`);
    } else if (Number(receiveInfo.networkId) == 137) {
      window.open(`https://polygonscan.com/tx/${receiveTrxHash}`);
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    const trxsLink = pathname[pathname.length - 1];
    getTrxsLinkInfo(trxsLink).then((data) => {
      setReceiveInfo(data);
    });
  }, []);

  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <Lottie animationData={animation} loop={false} play />
        </LottieContainer>
        <TextLine>
          {receiveInfo?.tokenAmount} {receiveInfo?.tokenUdenom}
          <br />
          {t("receiveTokenComplete2")}
        </TextLine>
        <WalletBox>
          <CheckBox src={GreenCheck} />
          <EditableCard
            label={walletConvert(walletList[select].walletAddress)}
            isEdit={false}
            isTrash={false}
            // icon={wallet.icon}
            icon={MetamaskIcon}
          />
        </WalletBox>
        <CheckTxTitle>{t("receiveTokenComplete3")}</CheckTxTitle>
        <TxHashCard onClick={txHashExplorerOnClick}>
          <RightArrow src={ChevronRight} />
          <TimerBox src={CompasImage} />
          <TxHashInfobox>
            <TxHashInfoTitle>{t("receiveTokenComplete4")}</TxHashInfoTitle>
            <TxHashAddressBox>
              <TxHashAddress>{walletConvert(receiveTrxHash)}</TxHashAddress>
            </TxHashAddressBox>
          </TxHashInfobox>
        </TxHashCard>
        <ComplainLink
          href="https://forms.gle/4CGoKQAWzJVG2dd69"
          target="_blank"
        >
          {t("receiveTokenComplete5")}
        </ComplainLink>
      </ContentContainer>
    </>
  );
};

export default ReceiveComplete;
