import { Link } from "react-router-dom";
import styled from "styled-components";

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

const StyledInput = styled.input`
  display: block;
  padding-left: .7rem;
  width: 90%;
  height: 45px;
  margin-bottom: 1rem;
  `;

const StyledButton = styled.button`
  width: 90%;
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
  text-decoration: none;
`;

function SignIn() {
  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign In</h1>
        <label htmlFor="signInId"/>
        <StyledInput type='text' id="signInId" placeholder="아이디를 입력하세요" />
        <label htmlFor="signInPw"/>
        <StyledInput type='password' id="signInPw" placeholder="영문/숫자/특수기호 포함 12자 이상" />
        <StyledButton>로그인</StyledButton>
        <StyledButton>회원가입</StyledButton>
        <SpanWrapper>
          <li><StyledLink to="/findid">아이디 찾기</StyledLink></li>
          <li><StyledLink to="/findpw">비밀번호 찾기</StyledLink></li>
        </SpanWrapper>
      </Wrapper>
    </section>
  );
}

export default SignIn;