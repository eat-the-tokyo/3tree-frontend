import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { DropIcon } from "../../../assets/icons";
// import LoadCurrencyInputPanel from "./LoadCurrencyInputPanel";
// import { isName, getAllQueryParams } from "../utils";

const Container = styled.button`
  width: 100%;
  height: 51px;
  border-radius: 8px;
  background-color: ${palette.white};
  display: flex;
  justify-content: space-between;
  //   box-shadow: 0px 2px 10px #c4c4c440;
  padding: 8px 16px;
  margin: 10px auto;
  border: 1px solid ${palette.light_gray};
  position: relative;
`;

const SideBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: auto 0px;
`;

const OpenBox = styled.div`
  width: calc(100% - 40px);
  border-radius: 10px;
  border: 1px solid ${palette.light_gray};
  overflow-y: auto;
  margin: 0px auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -6px);
  z-index: 5;
  background-color: ${palette.white};
  padding: 10px;
  box-shadow: 0px 0px 12px 0px #0000001f;
`;

const OpenBoxItem = styled.button`
  width: 100%;
  height: 51px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${palette.white};
  border: hidden;
  text-align: left;
  padding: 8px 16px;
  gap: 10px;
  border-radius: 8px;
`;

const EmailIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const EmailName = styled.div`
  max-width: 200px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.light_black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const emailNameConverter = (emailName) => {
  let returnString = "";
  if (emailName?.length > 15) {
    returnString =
      emailName.substr(0, 6) +
      "..." +
      emailName.substr(emailName.length - 6, emailName.length);
  }
  return returnString;
};

const DropBox = (props) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [dropboxType, setDropboxType] = useState("");
  const [open, setOpen] = useState(false);
  const [denom, setDenom] = useState("");
  //   const params = getAllQueryParams();

  useEffect(() => {
    setItemList(props.itemList);
    console.log(props.itemList);
  }, [props.itemList]);

  useEffect(() => {
    (async () => {
      setDropboxType(props.dropboxType);
      if (props.dropboxType == "myEmail") {
        console.log(props.isInit);
        props.setIdx(selectIndex);
      }
    })();
  }, [props.itemList, props.dropboxType]);

  useEffect(() => {}, []);

  const dropBoxOnClick = () => {
    setOpen(!open);
  };

  const openItemOnClick = (idx) => {
    setSelectIndex(idx);
    setOpen(false);
  };

  return (
    <>
      {dropboxType == "myEmail" ? (
        <>
          <Container onClick={dropBoxOnClick}>
            <SideBox>
              <EmailIconBox src={itemList[selectIndex]?.emailIcon} />
              <EmailName>{itemList[selectIndex]?.emailName}</EmailName>
            </SideBox>
            <SideBox>
              <DropIconBox src={DropIcon} />
            </SideBox>
          </Container>
          {open ? (
            <OpenBox>
              {itemList?.map((val, idx) => (
                <OpenBoxItem
                  style={{
                    backgroundColor:
                      idx == selectIndex ? palette.sky_4 : palette.white,
                  }}
                  onClick={() => openItemOnClick(idx)}
                >
                  <EmailIconBox src={val.emailIcon} />
                  <EmailName>{val?.emailName}</EmailName>
                </OpenBoxItem>
              ))}
            </OpenBox>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DropBox;
