function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskOnClick = (onConnected) => {
  return new Promise(async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      localStorage.setItem("currentAddress", accounts[0]);
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
        }
      } else {
        //현재 에러나는 부분.
        alert("메타 마스크 익스텐션을 설치해주세요!");
      }
    }
  });
};

// async function checkIfWalletIsConnected(onConnected) {
//   if (window.ethereum) {
//     const accounts = await window.ethereum.request({
//       method: "eth_accounts",
//     });

//     if (accounts.length > 0) {
//       const account = accounts[0];
//       onConnected(account);
//       return;
//     }

//     if (isMobileDevice()) {
//       await metamaskOnClick(onConnected);
//     }
//   }
// }

export default metamaskOnClick;
