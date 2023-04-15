function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const kaikasSend = (onConnected, settings) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hexString = "0x" + Number(settings.value * 10 ** 18).toString(16);
      console.log(hexString);
      const convertToNumber = parseInt(Number(hexString));
      console.log(convertToNumber);

      if (typeof window.klaytn !== "undefined") {
        const provider = window["klaytn"];
        const accounts = await provider.enable();
        console.log(accounts);
        console.log(provider.selectedAddress);
        console.log(provider.networkVersion);
        console.log(settings.chainId);
        if ("0x" + provider.networkVersion == settings.chainId) {
          // console.log(settings.fromAddr)
          // console.log(provider.selectedAddress)
          // console.log(provider)
          // if (settings.fromAddr == provider.selectedAddress) {
          const transactionParameters = {
            gas: "0x6710", // customizable by user during MetaMask confirmation.
            to: settings.toAddr, // Required except during contract publications.
            from: settings.fromAddr, // must match user's active address.
            value: hexString, // Only required to send ether to the recipient from the initiating external account.
            // chainId: settings.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          };

          const txHash = await provider.sendAsync(
            {
              method: "klay_sendTransaction",
              params: [transactionParameters],
              from: settings.fromAddr,
            },
            (err, result) => {
              console.log(err, result);
              console.log(result.result); // txhash value
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
                walletType: "Kaikas",
                txHash: result.result,
              };

              onConnected(returnValue);
            }
          );

          // } else {
          //   alert(
          //     "Address is different with current wallet address. Please set again."
          //   );
          // }
        } else {
          alert(
            "Network is different with current wallet network. Please set again."
          );
        }
      }
    } catch (error) {
      if (isMobileDevice()) {
        // try {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_requestAccounts",
        //   });
        //   onConnected(accounts[0]);
        // } catch (error) {
        //   alert(error.message);
        //   console.error(error.message);
        // }
        alert("Mobile not supported.");
      } else {
        alert(error.message);
        console.error(error.message);
      }
    }
  });
};

export default kaikasSend;
