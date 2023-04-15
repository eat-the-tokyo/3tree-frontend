import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";
import { setLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { CameraIcon, ProfileDefault } from "../../../assets/icons";
import { InputBox, TextAreaBox } from "../../../components/input";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: grid;
  gap: 25px;
`;

const ProfileImageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 50px;
`;

const ProfileImageButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid #777777;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 30px;
  margin: 0px auto;
  position: relative;
  text-align: center;
`;

const ProfileFilter = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  backdrop-filter: brightness(30%);
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.Caption1}
  position: absolute;
  top: 0px;
  right: 0px;
`;

const EditMyInfo = ({ userInfo, setEditMyInfo }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    file: userInfo.profile_img,
    imagePreviewUrl: userInfo.profile_img,
  });
  const [profileImageChange, setProfileImageChange] = useState(false);
  const [name, setName] = useState(userInfo.userId);
  const [introduction, setIntroduction] = useState(userInfo.introduction);
  const { t } = useTranslation();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
    console.log("??");
  };

  const handleChange = (event) => {
    console.log("hello");
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setProfileImage({ file: fileUploaded, imagePreviewUrl: fileUploaded });
    reader.onloadend = () => {
      setProfileImage({ file: fileUploaded, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(fileUploaded);
    setProfileImageChange(true);
  };

  const nameOnChange = (e) => {
    setName(e.target.value);
  };

  const introductionOnChange = (e) => {
    setIntroduction(e.target.value);
  };

  const saveEditUserInfo = () => {
    // const saveData = {
    //   userId: name,
    //   userToken: "",
    //   profileImg: profileImage.imagePreviewUrl,
    //   introduction: introduction,
    // };
    // setLocalUserInfo({ type: "init", data: saveData });
    setLocalUserInfo({
      type: "edit",
      editKey: ["user", "profile_name"],
      editValue: name,
    });
    setLocalUserInfo({
      type: "edit",
      editKey: ["user", "profile_img"],
      editValue: profileImage.imagePreviewUrl,
    });
    setLocalUserInfo({
      type: "edit",
      editKey: ["user", "profile_bio"],
      editValue: introduction,
    });

    setEditMyInfo();
  };

  const hiddenFileInput = useRef(null);

  return (
    <>
      <FullContainer>
        <EditProfileHeader
          title={t("editProfilePageHeader")}
          leftOnClick={setEditMyInfo}
          rightOnClick={saveEditUserInfo}
        />
        <ProfileImageButtonContainer>
          <ProfileImageButton
            onClick={handleClick}
            style={{
              backgroundImage: `url(${
                profileImage.imagePreviewUrl
                  ? profileImage.imagePreviewUrl
                  : ProfileDefault
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <ProfileFilter>
              {t("editProfilePage2")}
              <br />
              {t("editProfilePage3")}
            </ProfileFilter>
            <IconButton
              type="primary"
              styles="filled"
              states="default"
              size="small"
              icon={CameraIcon}
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                backgroundColor: palette.blue_2,
              }}
            />
          </ProfileImageButton>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ display: "none" }}
          />
        </ProfileImageButtonContainer>
        <InnerContainer>
          <InputBox
            label={t("editProfilePage4")}
            state="inactive"
            isRequired={true}
            placeholder={t("editProfilePage4")}
            value={name}
            onChange={(e) => nameOnChange(e)}
          />
          <TextAreaBox
            label={t("editProfilePage5")}
            placeholder={t("editProfilePage6")}
            value={introduction}
            onChange={(e) => introductionOnChange(e)}
            maxSize={100}
          />
        </InnerContainer>
      </FullContainer>
    </>
  );
};

export default EditMyInfo;
