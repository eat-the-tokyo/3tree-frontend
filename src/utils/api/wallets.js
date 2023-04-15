import axios from "axios";
import { privateHeaders, handleTokenExpired } from "./base";

export const getWallet = async (userId) => {
  let resultValue = 0;
  await axios.get(`/public/wallets/all?userId=${userId}`).then((data) => {
    resultValue = data.data.resultData;
  });

  return resultValue;
};

export const addWallet = async (walletType, walletAddress) => {
  let returnValue = 0;
  await axios
    .post(
      "/wallets/new",
      {
        walletType: walletType,
        walletAddress: walletAddress,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

export const deleteWallet = async (userWalletIndex) => {
  let returnValue = 0;
  await axios
    .delete(`/wallets?user_wallet_index=${userWalletIndex}`, {
      headers: privateHeaders,
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
