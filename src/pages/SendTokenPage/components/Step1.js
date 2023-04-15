import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import PlatformList from "./PlatformList";
import { InputBox } from "../../../components/input";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
`;

const PlatformBox = styled.div`
  width: 100%;
`;

const EmailBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const BoxHeader = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
  margin-bottom: 4px;
`;

const Step1 = ({
  setPlatform,
  setPlatformIcon,
  email,
  setEmail,
  emailState,
  setEmailState,
}) => {
  const [platformIdx, setPlatformIdx] = useState(0);
  const [errorComment, setErrorComment] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    setPlatform(PlatformList[platformIdx].emailName);
    setPlatformIcon(PlatformList[platformIdx].emailIcon);
  }, [platformIdx]);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    let regex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{1,6}(?:\.[a-z])?)$/i;
    if (email && regex.test(email)) {
      setEmailState("filled");
      setErrorComment("");
    } else {
      setEmailState("error");
      setErrorComment(t("sendPage01_7"));
    }
  };

  return (
    <Container>
      <PlatformBox>
        <BoxHeader>{t("sendPage01_3")}</BoxHeader>
        <DropBox
          setIdx={setPlatformIdx}
          itemList={PlatformList}
          dropboxType="myEmail"
        />
      </PlatformBox>
      <EmailBox>
        <InputBox
          label={t("sendPage01_4")}
          state={emailState}
          isRequired={false}
          placeholder={t("sendPage01_5")}
          value={email}
          height={51}
          onChange={(e) => emailOnChange(e)}
          message={errorComment}
        />
      </EmailBox>
    </Container>
  );
};

export default Step1;
