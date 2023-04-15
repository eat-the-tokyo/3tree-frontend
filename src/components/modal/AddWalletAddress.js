import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BottomModalX } from "../../assets/icons";
import WalletButtonGroup from "../WalletGroup/WalletButtonGroup";
import WalletList from "../../data/WalletListData";
import WalletListMobile from "../../data/WalletListDataMobile";
// import { createWallet } from "../../utils/api/wallets";
import Typography from "../../utils/style/Typography";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { useTranslation } from "react-i18next";

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

function AddWalletAddress({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  mode,
  setAddedWallet = () => {},
  setBalance = () => {},
  setRealBalance = () => {},
  setNetworkId = () => {},
  setNetwork = () => {},
  setCurrency = () => {},
  setWalletType = () => {},
  setStepStatus = () => {},
  stepStatus = 1,
}) {
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newWalletId, setNewWalletId] = useState(-1);
  const { t } = useTranslation();

  useEffect(() => {
    let constWalletList = WalletList;
    if (isMobileDevice()) {
      constWalletList = WalletListMobile;
      if (newWalletAddress) {
        setAddedWallet(newWalletAddress);
        setWalletType("Metamask");
        setStepStatus(stepStatus + 1);
        onClose();
      }
    } else {
      if (newWalletAddress) {
        setAddedWallet(newWalletAddress);
        onClose();
      }
    }
  }, [newWalletId]);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const closeOnClick = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <CloseButton onClick={closeOnClick} />
          <ContentContainer>
            <PopupTitle>{t("addWalletModalTitle")}</PopupTitle>
            <WalletButtonGroup
              columnNum={1}
              setPageStack={setNewWalletAddress}
              setWalletId={setNewWalletId}
              setBalance={setBalance}
              setRealBalance={setRealBalance}
              setNetworkId={setNetworkId}
              setNetwork={setNetwork}
              setCurrency={setCurrency}
            />
          </ContentContainer>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

AddWalletAddress.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  margin-top: 50px;
  color: white;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  min-height: 200px;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
`;

const PopupTitle = styled.div`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  padding-top: 50px;
  color: ${palette.black};
  ${Typography.Heading2}
  text-align: center;
  margin-bottom: 36px;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  margin: 0 auto;
  position: absolute;
  top: 37px;
  right: 20px;
  z-index: 904;
  background-image: url(${BottomModalX});
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: center;
`;

export default AddWalletAddress;
