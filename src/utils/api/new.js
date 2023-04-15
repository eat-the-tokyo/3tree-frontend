import axios from "axios";

export const getPoints = async (user_email) => {
  let returnValue;
  await axios
    .get(`https://api.eattokyo.xyz/points?user_email=${user_email}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

export const getTotalPoints = async (user_email) => {
  let returnValue;
  await axios
    .get(`https://api.eattokyo.xyz/points/total?user_email=${user_email}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((e) => {
      console.log(e);
    });

  return returnValue;
};

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
