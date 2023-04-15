import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { MetamaskIcon, GoogleIcon } from "../../../assets/icons";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: 57px 25px;
  // padding-top: 75px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  margin-bottom: 40px;
`;

const HeaderButton = styled.button`
  height: 33px;
  width: 73px;
  border-radius: 24px;
  background-color: ${palette.white};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  border: 1px solid ${palette.blue_1};
  color: ${palette.blue_1};
`;

const MainTitleBox = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.Black};
  margin-bottom: 38px;
`;

const InfoSingleContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid ${palette.grey_4};
  margin-bottom: 12px;
`;

const InfoSingleTitle = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.Black};
  margin-left: 6px;
  margin-bottom: 20px;
`;

const ToContentBox = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
`;

const PlatformBox = styled.div`
  width: 40%;
  height: 42px;
  background-color: ${palette.white};
  border: 1px solid ${palette.grey_4};
  border-radius: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PlatformIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const PlatformText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.Black};
`;

const EmailBox = styled.div`
  width: 60%;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.dark_gray};
  display: flex;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  gap: 12px;
`;

const ContentText = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.Black};
`;

const ConnectedBox = styled.div`
  width: 100%;
`;

const NetworkBox = styled.div`
  width: 100%;
`;

const BoxHeader = styled.li`
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 4px;
`;

const WalletContainer = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${palette.background};
  display: flex;
  justify-content: left;
  align-items: center;
`;

const IconBox = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const AddressBox = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;

const NetworkText = styled.div`
  height: 37px;
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${palette.light_gray};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

const StepButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 15px;
  gap: 12px;
`;

const StepLeftButton = styled.button`
  height: 33px;
  border-radius: 24px;
  padding-left: 24px;
  padding-right: 24px;
  border: 1px solid ${palette.blue_1};
  background-color: ${palette.white};
  color: ${palette.blue_1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  box-shadow: 0px 10px 10px 0px #e6e6e640;
`;

const StepRightButton = styled.button`
  height: 33px;
  border-radius: 24px;
  padding-left: 24px;
  padding-right: 24px;
  border: 1px solid ${palette.blue_1};
  background-color: ${palette.blue_1};
  color: ${palette.white};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  box-shadow: 0px 10px 10px 0px #e6e6e640;
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

const FinalConfirmation = ({
  platform,
  email,
  amount,
  currency,
  networkId,
  userId,
  walletType,
  network,
  address,
  setVisible,
  setSendDone,
}) => {
  const { t } = useTranslation();

  const platformIconList = {
    google: GoogleIcon,
    twitter:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg",
  };

  const SendTransaction = async () => {
    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            nonce: "0x00", // ignored by MetaMask
            gasPrice: (Math.pow(10, 14) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
            gas: (Math.pow(10, 6) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
            to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
            from: address, // must match user's active address.
            value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
            data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
            chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          },
        ],
      })
      .then((txHash) => {
        console.log(txHash);
        setVisible(false);
        setSendDone(true);
      })
      .catch((error) => console.error);
  };

  const leftOnClick = () => {
    alert("Coming soon.");
  };

  const rightOnClick = () => {};

  const previousOnClick = () => {
    setVisible(false);
  };
  return (
    <FullContainer>
      <Header>
        <HeaderButton onClick={previousOnClick}>{t("")}</HeaderButton>
      </Header>
      <MainTitleBox>Final Confirmation</MainTitleBox>
      <InfoSingleContainer>
        <InfoSingleTitle>To</InfoSingleTitle>
        <ToContentBox>
          <PlatformBox>
            <PlatformIcon src={platformIconList[platform]} />
            <PlatformText>{platform}</PlatformText>
          </PlatformBox>
          <EmailBox>{email}</EmailBox>
        </ToContentBox>
      </InfoSingleContainer>
      <InfoSingleContainer>
        <InfoSingleTitle>내용</InfoSingleTitle>
        <ContentBox>
          <ContentText>{amount}</ContentText>
          <ContentText>{currency}</ContentText>
        </ContentBox>
      </InfoSingleContainer>
      <InfoSingleContainer>
        <InfoSingleTitle>보내는 사람 정보</InfoSingleTitle>
        <NetworkBox>
          <BoxHeader>User Id</BoxHeader>
          <NetworkText>@{userId}</NetworkText>
        </NetworkBox>
        <ConnectedBox style={{ marginTop: "11px" }}>
          <BoxHeader>Connected Wallet</BoxHeader>
          <WalletContainer>
            <IconBox src={MetamaskIcon} />
            <AddressBox>{walletConvert(address)}</AddressBox>
          </WalletContainer>
        </ConnectedBox>
        <NetworkBox style={{ marginTop: "11px" }}>
          <BoxHeader>Network</BoxHeader>
          <NetworkText>{network}</NetworkText>
        </NetworkBox>
      </InfoSingleContainer>
      <StepButtonContainer>
        <StepLeftButton onClick={leftOnClick}>미리보기</StepLeftButton>
        <StepRightButton onClick={SendTransaction}>전송하기</StepRightButton>
      </StepButtonContainer>
    </FullContainer>
  );
};

export default FinalConfirmation;
