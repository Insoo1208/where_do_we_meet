import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoEyeOff, IoEye } from "react-icons/io5";
import data from "../../data.json";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../features/user/userSlice";

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 30px;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
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
  `;

const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  margin-bottom: 1rem;
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
  color: black;
`;


function SignIn() {
  const [loginInfo, setLoginInfo] = useState({id: '', pw: ''});
  const [eyeOpen, setEyeOpen] = useState(false);

  const pwInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEyeClose = () => {
    pwInput.current.type = 'password';
    setEyeOpen(false);
  };
  const handleEyeOpen = () => {
    pwInput.current.type = 'text';
    setEyeOpen(true);
  };

  const handleLogin = () => {
    const checkedUser = data.userInfo.find(user => user.id === loginInfo.id);
    if (checkedUser) {
      if (checkedUser.password === loginInfo.pw) {
        dispatch(userLogIn(checkedUser));
        navigate('/');
      } else {
        alert("아이디 혹은 패스워드가 올바르지 않습니다.");
        setLoginInfo({id: '', pw: ''});
      }
    } else {
      alert("아이디 혹은 패스워드가 올바르지 않습니다.");
      setLoginInfo({id: '', pw: ''});
    };
  };


  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign In</h1>
        <label htmlFor="signInId"/>
        <StyledInput type='text' id="signInId" placeholder="아이디를 입력하세요"
          value={loginInfo.id} onChange={e => setLoginInfo({...loginInfo, id: e.target.value})}
          autoComplete="off"
          />
        <label htmlFor="signInPw"/>
        <PwWrapper>
          <StyledInput type='password' id="signInPw" placeholder="영문/숫자/특수기호 포함 12자 이상"
            value={loginInfo.pw} onChange={e => setLoginInfo({...loginInfo, pw: e.target.value})}
            autoComplete="off"
            onKeyUp={e => { if(e.key === 'Enter' && loginInfo.id && loginInfo.pw) handleLogin(); }}
            ref={pwInput}
          />
          {eyeOpen ? <IoEye onClick={handleEyeClose}/> : <IoEyeOff onClick={handleEyeOpen} /> }
        </PwWrapper>
        <StyledButton onClick={handleLogin}>로그인</StyledButton>
        <StyledButton onClick={() => { navigate('/signup'); }}>회원가입</StyledButton>
        <SpanWrapper>
          <li><StyledLink to="/findid">아이디 찾기</StyledLink></li>
          <li><StyledLink to="/findpw">비밀번호 찾기</StyledLink></li>
        </SpanWrapper>
      </Wrapper>
    </section>
  );
}

export default SignIn;