import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { changeUserLanguage } from "../../../utils/api/auth";
import Typography from "../../../utils/style/Typography";
import { GreenCheck } from "../../../assets/icons";

const Container = styled.div`
  width: 100%;
  padding: 58px 21px;
`;

const ListButton = styled.button`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background-color: transparent;
  border: hidden;

  & > p {
    ${Typography.Headline2}
  }
`;

const GreenCheckIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(null);

  useEffect(() => {
    setCurrentLanguage(localStorage.getItem("language"));
  }, [localStorage.getItem("language")]);

  const langChange = () => {
    if (currentLanguage === "en") {
      i18next.changeLanguage("ko");
      localStorage.setItem("language", "ko");
      changeUserLanguage("KOR");
    } else {
      i18next.changeLanguage("en");
      localStorage.setItem("language", "en");
      changeUserLanguage("ENG");
    }
  };

  return (
    <Container>
      <ListButton onClick={langChange}>
        <p>{t("languageSettingInfo1")}</p>
        {currentLanguage === "ko" && <GreenCheckIcon src={GreenCheck} />}
      </ListButton>
      <ListButton onClick={langChange}>
        <p>{t("languageSettingInfo2")}</p>
        {currentLanguage === "en" && <GreenCheckIcon src={GreenCheck} />}
      </ListButton>
    </Container>
  );
};

export default ChangeLanguage;
