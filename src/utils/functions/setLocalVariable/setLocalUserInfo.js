const localUserInfoName = process.env.REACT_APP_LOCAL_USER_INFO_NAME;

const setLocalUserInfo = ({ type, data, editKey, editValue }) => {
  console.log(type);
  console.log(data);
  // type : "init" | "edit"
  if (type == "init") {
    localStorage.setItem(localUserInfoName, JSON.stringify(data));
  } else if (type == "edit") {
    var tmpData = JSON.parse(localStorage.getItem(localUserInfoName));
    if (Array.isArray(editKey)) {
      tmpData[editKey[0]][editKey[1]] = editValue;
    } else {
      tmpData[editKey] = editValue;
    }
    localStorage.setItem(localUserInfoName, JSON.stringify(tmpData));
  }
};

const dataForm = {
  links: [
    {
      index: 3,
      user_index: 10,
      linkTitle: "vvv",
      linkUrl: "newnewnew",
    },
  ],
  wallets: [
    {
      index: 3,
      user_index: 10,
      walletAddress: "address2",
    },
  ],
  user: {
    index: 10,
    profile_name: null,
    profile_img: null,
    profile_bio: null,
    user_id: "abc",
    social_id: "gkrry2723",
    social_platform: "GOOGLE",
    role: null,
  },
};

export default setLocalUserInfo;
