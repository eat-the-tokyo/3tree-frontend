// import { store, useGlobalState } from "state-pool";
import React, { useState } from "react";
import TypographyEn from "./typographyEn";
import TypographyKo from "./typographyKo";

const Typography = () => {
  let language = localStorage.getItem("language");
  if (!language) {
    language = "en";
  }

  if (language === "en") {
    return TypographyEn;
  } else {
    return TypographyKo;
  }
};

export default Typography();
