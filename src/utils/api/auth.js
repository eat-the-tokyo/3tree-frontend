import axios from "axios";
import {
  privateHeaders,
  privateHeadersMultipart,
  handleTokenExpired,
} from "./base";

export const requestLogin = async (code) => {
  let returnValue;
  await axios
    .get(`/public/users/login/google?code=${code}`)
    .then((data) => {
      localStorage.setItem(
        "accessToken",
        data.data.resultData.tokenDto.access_token
      );
      localStorage.setItem(
        "refreshToken",
        data.data.resultData.tokenDto.refresh_token
      );
      //회원가입 및 로그인 여부.
      returnValue = data.data.resultData.socialLoginResponse.status;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const requestRefreshToken = async () => {
  let returnValue;
  await axios
    .post(`/public/users/reissue`, {
      grant_type: "Bearer",
      access_token: localStorage.getItem("accessToken"),
      refresh_token: localStorage.getItem("refreshToken"),
    })
    //리프레쉬 토큰이 만료되었을 때.
    .then((data) => {
      returnValue = data;
      localStorage.setItem("accessToken", data.data.resultData.access_token);
      localStorage.setItem("refreshToken", data.data.resultData.refresh_token);
      window.location.reload();
    })
    .catch((error) => {
      console.log("requestRefreshToken" + error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("language");
      window.location.reload();
    });

  return returnValue;
};

export const checkUserId = async (userID) => {
  let returnValue;
  await axios.get(`/public/users/id/check?user_id=${userID}`).then((data) => {
    returnValue = data.data;
  });

  return returnValue;
};

export const createUserId = async (newId) => {
  let returnValue;
  await axios
    .put(
      `/users/edit/userid?new_id=${newId}`,
      {},
      {
        headers: privateHeaders,
      }
    )
    .then((response) => {
      returnValue = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const editProfile = async (formData) => {
  let returnValue = {};
  await axios
    .put(`/users/edit/profile`, formData, {
      headers: privateHeadersMultipart,
    })
    .then((result) => {
      returnValue = result.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

export const getUserInfo = async () => {
  let returnValue;
  await axios
    .get(`/users/my/info`, {
      headers: privateHeaders,
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      console.log(error);
      handleTokenExpired(error);
    });

  return returnValue;
};

export const getUserInfoAndProfileDeco = async (userId) => {
  let returnValue;
  await axios
    .get(`/public/users/info?user_id=${userId}`)
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const changeUserLanguage = async (newLanguage) => {
  let returnValue;
  await axios
    .put(
      `users/edit/language?language=${newLanguage}`,
      {},
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    });
  return returnValue;
};
