import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Lottie from "react-lottie-player";
import animation from "../../assets/lottie/airplane-lottie.json";
import { useTranslation } from "react-i18next";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
  min-height: 100vh;
`;

const LottieContainer = styled.div`
  width: 380px;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 2px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 14px;
  font-family: Montserrat;
`;

const CheckTxTitle = styled.div`
  ${Typography.Subhead}
  color: ${palette.grey_1};
  text-align: center;
  margin-bottom: 80px;
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const LoadingComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <Lottie animationData={animation} loop={true} play />
        </LottieContainer>
        <TextLine>{t("sendPage03Pending1")}</TextLine>
        <CheckTxTitle>
        {t("sendPage03Pending2")}
          <br />
          {t("sendPage03Pending3")}
        </CheckTxTitle>
        <ComplainLink
          href="https://forms.gle/4CGoKQAWzJVG2dd69"
          target="_blank"
        >
          {t("sendPage03Fail4")}
        </ComplainLink>
      </ContentContainer>
    </>
  );
};

export default LoadingComponent;
