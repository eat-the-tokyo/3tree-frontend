import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { BottomModal } from "../../../components/modal";
import { useTranslation } from "react-i18next";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //   margin-top: 109px;
  //   padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
`;

const FirstIntro = styled.div`
  font-family: Montserrat;
  font-size: 23px;
  font-weight: 600;
  text-align: left;
  color: ${palette.Black};
  line-height: 33.35px;
  padding-left: 16px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const TermsBox = styled.div`
  margin-top: 64px;
  ${Typography.Caption2}
  color: ${palette.grey_5};
`;

const NetworkListBox = styled.div`
  padding: 12px 8px;
  margin-top: 10px;
`;

const NetworkListItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
`;

const NetworkIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 4px;
`;

const NetworkTextInfo = styled.div`
  margin-left: 8px;
`;

const NetworkName = styled.div`
  margin-bottom: 4px;
  ${Typography.Heading2}
  ${palette.Black};
`;

const NetworkInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const NetworkSemi = styled.div`
  ${Typography.Caption2}
  ${palette.grey3};
`;

const ConnectStatus = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectStatusText = styled.div`
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 400;
  color: ${palette.green_1};
`;

const ConnectStatusCircle = styled.div`
  margin: 5px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${palette.green_1};
`;

const NetworkSwitchModalInner = (
  type,
  setStatus,
  onClose,
  networkList,
  networkId,
  switchChain,
  setNewNetworkId
) => {
  const [connectedIdx, setConnectedIdx] = useState(-1);

  const { t } = useTranslation();

  useEffect(() => {
    setConnectedIdx(networkList?.findIndex((v) => v.chainId == networkId));
  }, [networkId]);

  const NetworkItemOnClick = (idx) => {
    // switchChain(
    //   connector,
    //   account,
    //   provider,
    //   library,
    //   networkList[idx].chainId
    // );
    setNewNetworkId(networkList[idx].chainId)
    document.body.style.overflow = "auto";
    // onClose();
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("selectNetworkModalTitle")}</FirstIntro>
      </IntroTextBox>
      <NetworkListBox>
        {networkList.map((chain, idx) => (
          <NetworkListItem onClick={() => NetworkItemOnClick(idx)}>
            <NetworkInfoBox>
              <NetworkIcon src={chain.icon} />
              <NetworkTextInfo>
                <NetworkName>{chain.name}</NetworkName>
              </NetworkTextInfo>
            </NetworkInfoBox>
            {connectedIdx == idx ? (
              <ConnectStatus>
                <ConnectStatusText>{t("sendPage02_20")}</ConnectStatusText>
                <ConnectStatusCircle />
              </ConnectStatus>
            ) : (
              <></>
            )}
          </NetworkListItem>
        ))}
      </NetworkListBox>
    </FullContainer>
  );
};

const NetworkSwitchModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  type,
  setStatus,
  networkList,
  networkId,
  switchChain,
  setNewNetworkId
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() =>
        NetworkSwitchModalInner(
          type,
          setStatus,
          onClose,
          networkList,
          networkId,
          switchChain,
          setNewNetworkId
        )
      }
    />
  );
};

export default NetworkSwitchModal;
