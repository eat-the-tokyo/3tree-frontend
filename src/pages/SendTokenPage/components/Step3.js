import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CopyIconGray, InputHelp } from "../../../assets/icons";
import { TimerImage } from "../../../assets/images";
import { ContainedButton } from "../../../components/button";
import { Tooltip } from "../../../components/card";
import { ConfirmModal, CopyPivot } from "../../../components/modal";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Typography from "../../../utils/style/Typography/index";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const HelpText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
`;

const HelpTextContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${palette.gray};
  align-items: center;
`;

const Title = styled.div`
  ${Typography.Headline1}
  margin-bottom: 14px;
`;

const SemiTitle = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
`;

const NoticeIcon = styled.button`
  width: 16px;
  height: 16px;
  background-image: url(${InputHelp});
  background-size: 13px 13px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
  background-color: transparent;
  position: relative;
  margin-left: 4px;
`;

const ExpiredCard = styled.div`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 22px;
  margin-bottom: 22px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
`;

const TimerBox = styled.img`
  width: 48px;
`;

const ExpiredInfobox = styled.div``;

const ExpiredInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
  margin-bottom: 7px;
`;

const ExpiredDateBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ExpiredDate = styled.div`
  ${Typography.Headline2}
  color: ${palette.blue_1};
`;

const ExpiredDateText = styled.div`
  ${Typography.Subhead}
  color: ${palette.Black};
`;

const CopyBox = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  border-radius: 18px;
  background-color: ${palette.white};
  border: 1px solid ${palette.grey_6};
  align-items: center;
  padding: 18px 16px;
  margin-bottom: 100px;
`;

const LinkText = styled.div`
  font-family: Montserrat;
  font-size: 17px;
  font-weight: 600;
  color: ${palette.Black};
  max-width: calc(100vw - 100px);
  overflow-x: scroll;
  // overflow: hidden;
  overflow: auto;
  white-space: nowrap;
`;

const CopyButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${CopyIconGray});
  background-color: transparent;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
`;

function pad(n) {
  return n < 10 ? "0" + n : n;
}

const convertDateFormat = (date, a, b, c, d) => {
  let dateString = date.replaceAll("-", "").replaceAll("T", "");
  let monthNames = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  let convertedDate;
  if (localStorage.getItem("language") === "en") {
    convertedDate =
      a +
      " " +
      dateString.slice(8, 13) +
      " " +
      b +
      " " +
      monthNames[dateString.slice(4, 6)] +
      " " +
      dateString.slice(6, 8) +
      d +
      " " +
      dateString.slice(0, 4);
  } else {
    convertedDate =
      dateString.slice(0, 4) +
      b +
      " " +
      dateString.slice(4, 6) +
      c +
      " " +
      dateString.slice(6, 8) +
      d +
      " " +
      dateString.slice(8, 13);
  }

  return convertedDate;
};

const Step3 = ({ expired, finalLink }) => {
  const [iconClicked, setIconClicked] = useState(false);
  const [iconHovering, setIconHovering] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const myRef = useRef(null);
  const { t } = useTranslation();

  const TooltipText = (
    <TooltipStyle>
      {t("sendPage03_2")}
      <br />
      <br />
      {t("sendPage03_3")}
    </TooltipStyle>
  );

  const notiOnClose = () => {
    setIconClicked(false);
  };

  const copyOnClick = () => {
    const handleCopyClipBoard = async (text) => {
      var textarea = document.createElement("textarea");
      textarea.value = text; // 복사할 메시지
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999); // For IOS
      document.execCommand("copy");
      document.body.removeChild(textarea);

      if (myRef.current) {
        let tmpX = myRef.current.getBoundingClientRect().top;
        let tmpY = myRef.current.getBoundingClientRect().left;
        setClickX(tmpX);
        setClickY(tmpY);
      }
      setCopyPivotVisible(true);
    };

    handleCopyClipBoard(`3tree.io/receiveToken/${finalLink}`);
  };

  const closeConfirmModal = () => {
    setCompleteModalVisible(false);
  };

  const subActionOnClick = () => {
    copyOnClick();
    window.location.href = "/";
  };

  const copyOnClose = () => {
    setCopyPivotVisible(false);
  };

  const date = () => {
    let newDate = new Date();
    let strDate = String(newDate);
    let newDateArr = strDate.split(" ");
    const month = newDateArr[1];
    const day = Number(newDateArr[2]) + 3;
    const year = newDateArr[3];
    const time = newDateArr[4].slice(0, 5);
    return time + " on " + month + " " + day + ", " + year;
  };

  return (
    <Container>
      <Title>{t("sendPage03Success1")}</Title>
      <SemiTitle>{t("sendPage03Success2")}</SemiTitle>
      <HelpTextContainer>
        <HelpText>{t("sendPage03_1")}</HelpText>
        <NoticeIcon
          onClick={() => setIconClicked(!iconClicked)}
          onMouseEnter={() => {
            setIconHovering(true);
          }}
          onMouseLeave={() => {
            setIconHovering(false);
          }}
        >
          {(iconClicked || iconHovering) && (
            <Tooltip
              text={TooltipText}
              closable={true}
              maskClosable={true}
              onClose={notiOnClose}
            />
          )}
        </NoticeIcon>
      </HelpTextContainer>
      <ExpiredCard>
        <TimerBox src={TimerImage} />
        <ExpiredInfobox>
          <ExpiredInfoTitle>{t("sendPage03_4")}</ExpiredInfoTitle>
          <ExpiredDateBox>
            {/* <ExpiredDate>2022년 11월 24일 19:27</ExpiredDate> */}
            <ExpiredDate>{date()}</ExpiredDate>
            <ExpiredDateText>{t("receiveTokenPage9")}</ExpiredDateText>
          </ExpiredDateBox>
        </ExpiredInfobox>
      </ExpiredCard>
      <div ref={myRef}>
        <CopyBox onClick={copyOnClick}>
          <LinkText>3tree.io/receiveToken/{finalLink}</LinkText>
          <CopyButton />
        </CopyBox>
      </div>
      {copyPivotVisible ? (
        <CopyPivot
          visible={copyPivotVisible}
          closable={true}
          maskClosable={true}
          onClose={copyOnClose}
          label={t("createLinkDone5")}
          type={"up"}
          x={`calc(${clickX}px - 70px)`}
          y={"calc(50% - 90px)"}
        />
      ) : (
        <></>
      )}
      <ContainedButton
        type="primary"
        styles="filled"
        states="default"
        size="large"
        label={t("sendPage03_11")}
        onClick={() => setCompleteModalVisible(true)}
      />
      {completeModalVisible ? (
        <ConfirmModal
          visible={completeModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeConfirmModal}
          text={
            <>
              {t("sendPage03_12")}
              <br /> {t("sendPage03_13")}
            </>
          }
          buttonText={t("sendPage03_14")}
          subActionOnClick={subActionOnClick}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Step3;
