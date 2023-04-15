import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { InputBox } from "../../../components/input";
import { InfoCard } from "../../../components/card";
import { ContainedButton } from "../../../components/button";
import {
  createUserId,
  checkUserId,
  getUserInfo,
} from "../../../utils/api/auth";
import { ConfirmModal } from "../../../components/modal";

const Container = styled.div`
  width: 100%;
  padding: 58px 21px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 163px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 58px;
`;

const ChangeID = () => {
  const [linkId, setLinkId] = useState("");
  const [state, setState] = useState("inactive");
  const [errorComment, setErrorComment] = useState("");
  const [userId, setUserId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const infoHeader = t("changeUserId6");
  const infoDescription = t("changeUserId7");

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserId(data.userId);
    });
  }, []);

  useEffect(() => {
    if (linkId.length > 0) {
      setState("typing");
    } else {
      setState("inactive");
    }

    var regExp = /^[a-zA-Z0-9_]+[a-zA-Z0-9_]{4,18}$/g;
    var testResult = regExp.test(linkId);

    if ((linkId.length <= 4 || linkId.length >= 20) && linkId) {
      setState("error");
      setErrorComment(t("createLink6"));
    } else if (!testResult && linkId) {
      setState("error");
      setErrorComment(t("createLink5"));
    } else {
      setErrorComment("");
    }
  }, [linkId]);

  const linkIdOnChange = (e) => {
    setLinkId(e.target.value);
  };

  const clickSwitch = () => {
    setIsModalOpen(true);
  };

  const createOnClick = async () => {
    await checkUserId(linkId)
      .then(async () => {
        await createUserId(linkId).then(() => {
          window.location.href = "/";
        });
      })
      .catch(() => {
        setState("error");
        setErrorComment(
          `${t("createLink7")} "${linkId}" ${t("createLink7_2")}`
        );
      });
  };

  return (
    <Container>
      <InputContainer>
        <InputBox
          label={t("changeUserId1")}
          isRequired={false}
          state={state}
          placeholder={userId}
          message={errorComment}
          fixedMent={"3tree.io/@"}
          fixedMentSize={"93px"}
          onChange={(e) => {
            linkIdOnChange(e);
          }}
        />
      </InputContainer>
      <InfoCard header={infoHeader} info={infoDescription} />
      <ButtonContainer>
        {state == "inactive" || state == "error" ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label={t("changeUserId8")}
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("changeUserId8")}
            onClick={clickSwitch}
          />
        )}
      </ButtonContainer>
      {isModalOpen && (
        <ConfirmModal
          visible={isModalOpen}
          closable={true}
          maskClosable={true}
          onClose={() => setIsModalOpen(false)}
          text={<>{t("changeUserIdAlert1")}</>}
          buttonText={t("changeUserIdAlert2")}
          subActionOnClick={createOnClick}
        />
      )}
    </Container>
  );
};

export default ChangeID;
