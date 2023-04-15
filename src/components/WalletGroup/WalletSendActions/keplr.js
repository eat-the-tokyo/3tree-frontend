const keplrSend = (setFunction, setting) => {
  return new Promise(async (resolve, reject) => {
    // var returnValue = 0;
    console.log("start");
    try {
      // window.onload = async () => {
      if (!window.keplr) {
        alert("Please install keplr extension");
      } else {
        const chainId = "cosmoshub-4";
        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);

        const offlineSigner = window.keplr.getOfflineSigner(chainId);

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();

        console.log(accounts[0].address);

        setFunction(accounts[0].address);

        // Initialize the gaia api with the offline signer that is injected by Keplr extension.

        // const cosmJS = new SigningCosmosClient(
        //     "https://lcd-cosmoshub.keplr.app",
        //     accounts[0].address,
        //     offlineSigner,
        // );
      }
      // }
    } catch (error) {
      //   alert("metamask 확장 프로그램을 설치해주세요.");
      alert(error.message);
      console.error(error.message);
    }
  });
};

export default keplrSend;
