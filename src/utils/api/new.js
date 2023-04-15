import axios from "axios";

export const updatePoint = async (body) => {
  let returnValue;
  await axios
    .post(`https://api.eattokyo.xyz/points`, body)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const getHashByEmail = async (user_email) => {
  let returnValue;
  await axios
    .get(`https://api.eattokyo.xyz/txn/hash?user_email=${user_email}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const getLinkByEscrowIdAndHash = async (body) => {
  let returnValue;
  await axios
    .post(`https://api.eattokyo.xyz/txn/link`, body)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const checkUser = async (user_email, body) => {
  let returnValue;
  await axios
    .post(
      `https://api.eattokyo.xyz/txn/check-user?user_email=${user_email}`,
      body
    )
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const getEscrowIdByLink = async (link) => {
  let returnValue;
  await axios
    .get(`https://api.eattokyo.xyz/txn/escrow-id?link=${link}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const checkWrapped = async (escrowId) => {
  let returnValue;
  await axios
    .get(`https://api.eattokyo.xyz/txn/check/wrapped?escrowId=${escrowId}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};
