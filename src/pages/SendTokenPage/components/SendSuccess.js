import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { CopyIcon } from "../../../assets/icons";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: 57px 25px;
  padding-top: 200px;
  text-align: center;
`;

const Header = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.black};
  margin-bottom: 20px;
`;

const SemiText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.black};
  margin-bottom: 4px;
`;

const LinkText = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.gray};
  margin-bottom: 37px;
  word-wrap: break-word;
`;

const DueDateBox = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.black};
  margin-bottom: 33px;
`;

const CopyButton = styled.button`
  height: 44px;
  width: 44px;
  border-radius: 14px;
  border: hidden;
  background-color: ${palette.Black};
`;

const CopyImage = styled.img`
  width: 24px;
  height: 24px;
`;

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const SendSuccess = () => {
  const [link, setLink] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    var tmpLink = "https://3tree.io/receive/" + makeid(32);
    console.log(tmpLink);
    setLink(tmpLink);
  }, []);

  useEffect(() => {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    var currentDate = new Date();
    var endDate = currentDate.addDays(3).toLocaleString();
    console.log(endDate);
    setDueDate(endDate);
  }, []);

  const copyOnClick = () => {
    const handleCopyClipBoard = async (text) => {
      var textarea = document.createElement("textarea");
      textarea.value = text; // 복사할 메시지
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999); // For IOS
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("링크 복사 완료!");
    };

    handleCopyClipBoard(link);
  };

  return (
    <FullContainer>
      <Header>수령 링크 생성 완료!</Header>
      <SemiText>해당 계정에게 이 링크를 공유해주세요!</SemiText>
      <LinkText>{link}</LinkText>
      <DueDateBox>
        수령가능일
        <br />~{dueDate}
      </DueDateBox>
      <CopyButton onClick={copyOnClick}>
        <CopyImage src={CopyIcon} />
      </CopyButton>
    </FullContainer>
  );
};

export default SendSuccess;
