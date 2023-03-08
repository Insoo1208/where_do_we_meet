import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from 'styled-components';
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
import Free from "./pages/board/Free";
import BoardPage from "./pages/board/BoardPage";
import UserInfo from "./pages/sign/UserInfo";


import deviceTheme from "./features/mediaquery/deviceTheme";
console.log(deviceTheme.device.tablet);

const theme = {
  gray100: '#f1f1f1',
  gray200: '#eee',
  gray300: '#ccc',
  gray400: '#aaa',
  gray500: '#999',
  gray600: '#777',
  gray700: '#555',
  gray800: '#333',
  gray900: '#111',

  background: '#f9f9f9',
  main: '#1f44a0',
  mainLight: '#6885ce',
};  

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  ${reset}

  /* Global Style */
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #f9f9f9;
    color: #333;
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

  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  html {
    @media ${deviceTheme.device.desktop} {
      font-size: 16px;
    }
    @media ${deviceTheme.device.tablet} {
      font-size: 14px;
    }
    @media ${deviceTheme.device.mobileL} {
      font-size: 12px;
    }
    @media ${deviceTheme.device.mobileM} {
      font-size: 11px;
    }
  }
  
`;

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Main />} />
            <Route path="/board" element={<Board />} >
              {/* <Route index path="/board/review" element={<BoardPage />} /> */}
              <Route path="/board/:listName?" element={<BoardPage />} />
              <Route path="/board/post-write" element={<PostWrite />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/findid" element={<FindId />} />
            <Route path="/findpw" element={<FindPw />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/theme" element={<UserInfo />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
