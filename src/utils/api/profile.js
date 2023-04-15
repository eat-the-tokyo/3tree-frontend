import axios from "axios";
import { privateHeadersMultipart, handleTokenExpired } from "./base";

export const getProfileDeco = async (userId) => {
  let returnValue = 0;
  await axios.get(`/public/profile?user_id=${userId}`).then((data) => {
    returnValue = data.data.resultData;
  });

  return returnValue;
};

export const editProfileDeco = async (formData) => {
  let returnValue;
  await axios
    .put(`/profile/edit`, formData, {
      headers: privateHeadersMultipart,
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
