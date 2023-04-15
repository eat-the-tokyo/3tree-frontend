import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect } from "react";

//  Create Web3 instance

function SelectWalletModal(networkId) {
  const { activate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  useEffect(() => {
    activate(walletconnect);
    setProvider("walletConnect");

    if (networkId > 0) {
      const handleSwitchNetwork = async (networkId) => {
        alert("hi")
        if (window.ethereum) {
          alert("hi2")
          await window.ethereum.send("eth_chainId", [networkId]);
        }
        handleSwitchNetwork(1);
      };
    }
  }, [networkId]);

  return <></>;
}

function WalletConnectOnClick(setFunction, networkId) {
  return new Promise(async (resolve, reject) => {
    function callWalletConnect() {
      // const WalletConnectChain = window.ethereum;
      // try {
      //   if (!WalletConnectChain) {
      //     alert("Please install WalletConnect");
      //   } else {
      //     SelectWalletModal();
      //   }
      //   // }
      // } catch (error) {
      //   alert("hi")
      //   alert(error.message);
      //   console.error(error.message);
      // }
      SelectWalletModal(networkId);

      return <SelectWalletModal />;
    }

    callWalletConnect();
  });
}

export default WalletConnectOnClick;
