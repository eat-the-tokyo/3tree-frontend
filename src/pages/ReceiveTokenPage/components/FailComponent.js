import React from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { CrossImage } from "../../../assets/images";
import { ContainedButton } from "../../../components/button";
import { useTranslation } from "react-i18next";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 200px;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 2px;
`;

const CrossImageBox = styled.img`
  width: 200px;
  height: 200px;
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
  margin-bottom: 30px;
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const FailComponent = ({ buttonOnClick, setFailed, setResend }) => {
  const { t } = useTranslation();

  console.log(buttonOnClick);
  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <CrossImageBox src={CrossImage} />
        </LottieContainer>
        <TextLine>{t("sendPage03Fail1")}</TextLine>
        <CheckTxTitle>{t("sendPage03Fail2")}</CheckTxTitle>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label={t("sendPage03Fail3")}
          onClick={() => {
            setFailed(false);
            setResend(true);
          }}
          style={{ marginBottom: "22px" }}
        />
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

export default FailComponent;
