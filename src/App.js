import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from "styled-reset";

import Header from "./pages/Header";
import Main from "./pages/main/Main";
import Board from "./pages/board/Board";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  ${reset}

  /* Global Style */
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  * {
    box-sizing: inherit;
  }

  .cursor-pointer {
    cursor: pointer;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
