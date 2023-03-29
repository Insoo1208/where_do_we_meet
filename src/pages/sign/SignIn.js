import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { userLogIn } from "../../features/user/userSlice";
import { selectColor } from "../../features/color/colorSlice";
import axios from "axios";
import Loading from "../../components/Loading";

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"


const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width : 400px;
  }
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.gray700};

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    color: ${props => props.theme.gray800};
    cursor: default;
  }
`;

const PwWrapper = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    top: 15px;
    right: 1rem;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  display: block;
  padding-left: .7rem;
  width: 100%;
  height: 45px;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  outline: none;

  :focus {
    border: 2px solid ${props => props.myColorHex.mainColor};
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  margin-bottom: 1rem;
  color: #fff;
  background-color: ${props => props.myColorHex.mainColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight:bold;
  letter-spacing: -1px;

  &.signUp {
    background-color: ${props => props.myColorHex.mainLight};
  }
`;

const SpanWrapper = styled.ul`
  display: flex;
  
  li {
    font-size: 14px;

    &:last-child::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: .6rem;
      background-color: #2e2e2e;
    }
  }
`;

const StyledLink = styled(Link)`
  padding: .5rem;
`;


function SignIn() {
  const [loginInfo, setLoginInfo] = useState({ id: '', pw: '' });
  const [eyeOpen, setEyeOpen] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myColor = useSelector(selectColor);

  const handleLogin = async () => {
    try {
      setApiLoading(true);
      const loggedInUserInfo = await signInWithEmailAndPassword(auth, loginInfo.id, loginInfo.pw);
      setApiLoading(false);
      navigate(-1);
    } catch (error) {
      setApiLoading(false);
      alert('이메일 혹은 비밀번호가 올바르지 않습니다.');
      setLoginInfo({ id: '', pw: '' });
    };
  };

  const handleEyeChange = () => {
    setEyeOpen(eyeOpen => !eyeOpen);
  }

  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign In</h1>
        <label htmlFor="signInId" />
        <StyledInput myColorHex={myColor} type='text' id="signInId" placeholder="이메일을 입력하세요."
          value={loginInfo.id} onChange={e => setLoginInfo({...loginInfo, id: e.target.value})}
          autoComplete="off"
          />
        <label htmlFor="signInPw" />
          {eyeOpen
            ?
            <PwWrapper>
              <StyledInput myColorHex={myColor} type='text' id="signInPw" placeholder="비밀번호는 6자 이상입니다."
              value={loginInfo.pw} onChange={e => setLoginInfo({...loginInfo, pw: e.target.value})}
              autoComplete="off"
              onKeyUp={e => { if(e.key === 'Enter' && loginInfo.id && loginInfo.pw) handleLogin(); }}
              />
              <IoEye onClick={handleEyeChange}/>
            </PwWrapper>
            :
            <PwWrapper>
              <StyledInput myColorHex={myColor} type='password' id="signInPw" placeholder="비밀번호는 6자 이상입니다."
              value={loginInfo.pw} onChange={e => setLoginInfo({...loginInfo, pw: e.target.value})}
              autoComplete="off"
              onKeyUp={e => { if(e.key === 'Enter' && loginInfo.id && loginInfo.pw) handleLogin(); }}
              />
              <IoEyeOff onClick={handleEyeChange}/>
            </PwWrapper>
          }
        <StyledButton myColorHex={myColor} className="signIn" onClick={handleLogin}>로그인</StyledButton>
        <StyledButton myColorHex={myColor} className="signUp" onClick={() => { navigate('/signup'); }}>회원가입</StyledButton>
        <SpanWrapper>
          <li><StyledLink to="/findid">아이디 찾기</StyledLink></li>
          <li><StyledLink to="/findpw">비밀번호 찾기</StyledLink></li>
        </SpanWrapper>
      </Wrapper>
      {apiLoading && <Loading />}
    </section>
  );
}

export default SignIn;