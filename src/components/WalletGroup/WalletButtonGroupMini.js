import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/styles/colors";
import useWindowDimensions from "../../../utils/functions/useWindowDimensions";
import WalletList from "../../../datas/WalletListData";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const BoxContainer = styled.div`
  width: 100%;
  max-width: 856px;
  min-height: 288px;
  justify-content: center;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // gap: 12px;
  // grid-auto-rows: ?;
  margin: 0px auto;
  margin-top: 20px;
`;

const WalletButton = styled.button`
  max-width: 88px;
  height: 88px;
  background-color: ${palette.white};
  border: 0;
  border-radius: 10px;
  padding: 14px 0px;
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0px auto;
  width: 100%;
  margin: 13px 6px;
  filter: drop-shadow(0px 1.7px 8.86px #c4c4c444);
  &:hover {
    // border: 1px solid ${palette.blue};
    box-shadow: 0 0 0 1px ${palette.blue} inset;
  }
`;

const WalletIcon = styled.img`
  width: 39px;
  height: 39px;
  margin-bottom: 7px;
`;

const WalletName = styled.div`
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;
  margin: auto 0px;
`;

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

const metamaskOnClick = (onConnected) => {
  // if (!window.ethereum) {
  //   alert("Get MetaMask!");
  //   return;
  // }
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      console.log(accounts[0]);
      onConnected(accounts[0]);
    } catch (error) {
      if (isMobileDevice()) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          onConnected(accounts[0]);
        } catch (error) {
          alert(error.message);
          console.error(error.message);
        }
      } else {
        alert(error.message);
        console.error(error.message);
      }
    }
  });
  // const accounts = await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });
};

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    console.log("nnn");
    // const accounts = await window.ethereum.request({
    //   method: "eth_accounts",
    // });

    // if (accounts.length > 0) {
    //   const account = accounts[0];
    //   onConnected(account);
    //   return;
    // }

    if (isMobileDevice()) {
      await metamaskOnClick(onConnected); // metamask
    }
  }
}

const WalletButtonGroupMini = (props) => {
  const { height, width } = useWindowDimensions();
  const [walletAddress, setWalletAddress] = useState("");
  const [alreadySignup, setAlreadySignup] = useState(0);
  const [walletIdNum, setWalletIdNum] = useState(-1);
  const [buttonWidth, setButtonWidth] = useState();
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  // useEffect(() => {}, [ref.current]);

  useEffect(() => {
    checkIfWalletIsConnected(setWalletAddress);
  }, []);

  useEffect(() => {
    console.log(account);
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  useEffect(() => {
    console.log(props);
    if (props.setPageStack) {
      props.setPageStack(walletAddress);
      props.setWalletId(walletIdNum);
      console.log(walletAddress);
      console.log(walletIdNum);
      localStorage.setItem("currentWallet", walletAddress);
      localStorage.setItem("currentWalletType", walletIdNum);
    }
  }, [walletAddress]);

  const connectOnClick = async (walletID) => {
    setWalletIdNum(walletID);
    console.log(walletID);
    if (WalletList[walletID].walletName == "WalletConnect") {
      // console.log(process.env.REACT_APP_INFURA_KEY)
      activate(walletconnect, (error) => {
        if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
          window.open("https://metamask.io/download.html");
        }
      }).then((result) => {
        console.log(result);
        console.log(chainId);
        console.log(account);
      });
      setProvider("walletConnect");
    } else {
      const connectWalletResult = await WalletList[walletID]
        .action(setWalletAddress)
        .then((data) => {
          console.log("hello");
          console.log(data);
        })
        .catch((err) => console.log("???"));
    }
  };

  return (
    <React.Fragment>
      <BoxContainer
        style={
          width > 600 && props.columnNum != 1
            ? {}
            : { gridTemplateColumns: "repeat(1, 1fr)" }
        }
      >
        {isMobileDevice() ? (
          <React.Fragment>
            {WalletList.map((val, idx) => (
              <React.Fragment>
                {val.deepLink ? (
                  <a href={val.deepLink}>
                    <WalletButton
                    // onClick={() => connectOnClick(idx)}
                    >
                      <WalletIcon src={val.walletIcon} />
                      <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                    </WalletButton>
                  </a>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {WalletList.map((val, idx) => (
              <React.Fragment>
                {WalletList[idx].action ? (
                  <WalletButton onClick={() => connectOnClick(idx)}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                  </WalletButton>
                ) : (
                  <WalletButton style={{ backgroundColor: palette.gray }}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                  </WalletButton>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </BoxContainer>
    </React.Fragment>
  );
};

export default WalletButtonGroupMini;
