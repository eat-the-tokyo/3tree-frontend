function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskSend = (onConnected, settings) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hexString = "0x" + Number(settings.value * 10 ** 18).toString(16);
      console.log(hexString);
      const convertToNumber = parseInt(Number(hexString));
      console.log(convertToNumber);

      const networkVersion = await window.ethereum.request({
        method: "net_version",
      });
      console.log(networkVersion);

      var tmpChainId = "0x" + networkVersion;

      if ("0x" + networkVersion != settings.chainId) {
        console.log("switch network");
        console.log(settings.chainId);
        // try {
        const switchChain = await window.ethereum.request({
          // id: 1,
          // jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: settings.chainId,
              // fallbackRpc: {
              //   chainId: "0x5",
              //   chainName: "Goerli",
              //   rpcUrl: "https://goerli.infura.io/v3/INSERT_API_KEY_HERE",
              //   nativeCurrency: {
              //     name: "Goerli ETH",
              //     symbol: "gorETH",
              //     decimals: 18,
              //   },
              //   blockExplorerUrl: "https://goerli.etherscan.io",
              // },
            },
          ], // chainId must be in hexadecimal numbers
        });
        console.log(switchChain);
        // } catch (error) {
        //   console.log(error.code);
        // }

        console.log(tmpChainId);
        console.log(settings.chainId);
        tmpChainId = settings.chainId;
      }

      if (tmpChainId == settings.chainId) {
        console.log(settings.chainId);
        console.log(settings.asset);
        const transactionParameters = {
          nonce: "0x00", // ignored by MetaMask
          gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
          gas: "0x2710", // customizable by user during MetaMask confirmation.
          to: settings.toAddr, // Required except during contract publications.
          from: settings.fromAddr, // must match user's active address.
          value: hexString, // Only required to send ether to the recipient from the initiating external account.
          // data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
          chainId: settings.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          asset: settings.asset,
        };

        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log(txHash);
        // onConnected(txHash);
        const returnValue = {
          toWalletAddress: settings.toAddr,
          fromWalletAddress: settings.fromAddr,
          toUser: settings.toUser,
          fromUser: settings.fromUser,
          gasPrice: transactionParameters.gasPrice,
          gas: transactionParameters.gas,
          value: settings.value,
          chainID: settings.chainId,
          memo: settings.memo,
          udenom: settings.udenom,
          walletType: "Metamask",
          txHash: txHash,
        };

        onConnected(returnValue);
      } else {
        alert(
          "Network is different with current wallet network. Please set again."
        );
      }
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
};

export default metamaskSend;
