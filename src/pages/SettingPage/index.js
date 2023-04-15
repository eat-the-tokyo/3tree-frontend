import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingHeader } from "../../components/header";
import { ListButton } from "../../components/button";
import { useTranslation } from "react-i18next";
import i18next from "../../utils/lang/i18n";
import { ChangeID, EnrolledAccount, ChangeLanguage } from "./components";
import { changeUserLanguage } from "../../utils/api/auth";
import { useRecoilValue } from "recoil";
import { loginState } from "../../utils/atoms/login";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const SettingPage = () => {
  const [status, setStatus] = useState("");
  const isLoggedIn = useRecoilValue(loginState);
  const { t } = useTranslation();
  const StatusList = ["changeID", "checkID", "setLanguage"];
  const [currentLanguage, setCurrentLanguage] = useState(null);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language");
    const convertLang = () => {
      if (currentLanguage === "ko") {
        return "한국어";
      } else {
        return "ENG";
      }
    };
    setCurrentLanguage(convertLang());
  }, [localStorage.getItem("language")]);

  const SettingList = [
    {
      title: t("settingsPage1"),
      header: t("changeUserIdHeader"),
      icon: "",
      onClick: () => {
        setStatus("changeID");
      },
      select: "",
      component: <ChangeID />,
    },
    {
      title: t("settingsPage2"),
      header: t("socialAccountInfoHeader"),
      icon: "",
      onClick: () => {
        setStatus("checkID");
      },
      select: "",
      component: <EnrolledAccount />,
    },
    {
      title: t("settingsPage3"),
      header: t("languageSettingInfoHeader"),
      icon: "",
      onClick: () => {
        setStatus("setLanguage");
      },
      select: currentLanguage,
      component: <ChangeLanguage />,
    },
    {
      title: t("settingsPage4"),
      icon: "",
      onClick: () => {
        window.open(
          "https://www.notion.so/propwave/notice-10006b18d72f4d25a592223dcfb5c525"
        );
      },
      select: "",
    },
    {
      title: t("settingsPage5"),
      icon: "",
      onClick: () => {
        window.location.href = "https://3tree.io/termsOfService";
      },
      select: "",
    },
    {
      title: t("settingsPage6"),
      icon: "",
      onClick: () => {
        window.location.href = "https://3tree.io/privacyPolicy";
      },
      select: "",
    },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/";
    }
  }, []);

  return (
    <FullContainer>
      <SettingHeader
        title={t("settingsPageHeader")}
        leftOnClick={() => {
          window.location.href = "/";
        }}
      />
      {status == "" ? (
        <>
          {SettingList.map((item, idx) => (
            <ListButton
              key={item.title}
              label={item.title}
              select={item.select}
              onClick={item.onClick}
            />
          ))}
        </>
      ) : (
        <>
          <SettingHeader
            title={SettingList[StatusList.findIndex((v) => v == status)].header}
            leftOnClick={() => {
              setStatus("");
            }}
          />
          {SettingList[StatusList.findIndex((v) => v == status)].component}
        </>
      )}
    </FullContainer>
  );
};

export default SettingPage;
