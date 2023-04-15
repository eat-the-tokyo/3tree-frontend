import React from "react";
import styled from "styled-components";
import { useGlobalState, createStore } from "state-pool";

const store = createStore();

const Button = styled.button``;

store.setState("language", { lang: "ko", id: 0 });
const LanguageList = ["ko", "en"];

const LanguageHeader = () => {
  const [language, setLanguage] = useGlobalState("language");

  const languageSwitchOnClick = () => {
    var nextIdx = (language.id + 1) % LanguageList.length;
    setLanguage({ lang: LanguageList[nextIdx], id: nextIdx });
  };
  return <Button onClick={languageSwitchOnClick}>Switch Language</Button>;
};

export default LanguageHeader;