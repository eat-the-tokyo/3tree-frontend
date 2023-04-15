import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { getUserInfo } from "../../../utils/api/auth";
import PlatformList from "../../SendTokenPage/components/PlatformList";

const Container = styled.div`
  width: 100%;
  padding: 41px 21px;
`;

const OpenBoxItem = styled.button`
  width: 100%;
  height: 51px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${palette.sky_4};
  border: 1px solid ${palette.sky_3};
  text-align: left;
  padding: 15px 16px;
  gap: 10px;
  border-radius: 10px;
`;

const EmailIconBox = styled.img`
  width: 20px;
  height: 20px;
`;

const EmailName = styled.div`
  max-width: 200px;
  font-family: Montserrat;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.grey_3};
`;

const Header = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
  margin-bottom: 4px;
`;

const EnrolledAccount = () => {
  const [userInfo, setUserInfo] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <Container>
      <Header>{t("socialAccountInfo1")}</Header>
      <OpenBoxItem>
        <EmailIconBox
          src={
            PlatformList[
              PlatformList.findIndex(
                (v) =>
                  v.emailName.toLowerCase ==
                  userInfo?.socialPlatform.toLowerCase
              )
            ]?.emailIcon
          }
        />
        <EmailName>{userInfo?.socialId}</EmailName>
      </OpenBoxItem>
    </Container>
  );
};

export default EnrolledAccount;
