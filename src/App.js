import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import "./App.css";
import { IntroPage, SendTokenPage } from "./pages";
import ScrollToTop from "./utils/functions/ScrollTop";
import { COLORS as palette } from "./utils/style/Color/colors";
import "./utils/style/Font/font.css";

const BodyInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: ${palette.background};
  // background-color: ${palette.white};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: ${palette.white};
  // position: absolute;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <BodyInner>
            <WebAppContainer>
              <ScrollToTop />
              <Routes>
                <Route exact path="/" element={<IntroPage />} />
                <Route path="/sendToken" element={<SendTokenPage />} />
              </Routes>
            </WebAppContainer>
          </BodyInner>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
