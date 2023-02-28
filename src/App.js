import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from "styled-reset";

import Header from "./pages/Header";
import Main from "./pages/main/Main";
import Board from "./pages/board/Board";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import FindId from "./pages/sign/FindId";
import FindPw from "./pages/sign/FindPw";
import PostWrite from "./pages/board/PostWrite";
import Notice from "./pages/board/Notice";
import Review from "./pages/board/Review";
import Free from "./pages/board/Free";

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

  a {
    color: inherit;
    text-decoration: none;
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
        <Route path="/" element={<Header />} >
          <Route index element={<Main />} />
          <Route path="/board" element={<Board />} >
            <Route index element={<Review />} /> 
            <Route path="/board/notice" element={<Notice />} />
            <Route path="/board/free" element={<Free />} />
            <Route path="/board/post-write" element={<PostWrite />} />
          </Route>          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
