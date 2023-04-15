// import "./App.css";
// import {
//   ComponentTestPage,
//   IntroPage,
//   CreateLinkPage,
//   EditProfilePage,
//   ProfilePage,
//   SendTokenPage,
// } from "./pages";
// import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./utils/functions/ScrollTop";
// import { COLORS as palette } from "./utils/style/Color/colors";
// import { useGlobalState, createStore } from "state-pool";
// import "./utils/style/Font/font.css";

// const store = createStore();

// store.setState("language", { lang: "ko", id: 0 });

export default (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" />
        <Route path="/components" />
        <Route path="/sendToken" />
        <Route path="/@:id" />
      </Routes>
    </BrowserRouter>
  </div>
);
