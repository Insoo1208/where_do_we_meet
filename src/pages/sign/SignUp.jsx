import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 590px;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  padding: 16px;
  background-color: #ffccaa;
  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    cursor: default;
  }

  h2 {
    font-size: 28px;
    font-weight: 100;
    padding-bottom: .625rem;

    span {
      font-size: 1rem;
      line-height: 1rem;
    }
  }

  .user-name {  
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    input.last-name {
      margin-right: 1rem;
      width: 70%;
    }
    
    button {

    }
    
  }
  
  .zip-wrapper {
    display: flex;
  }

  .zip-code{
    margin-right: 1rem;
    width: 70%;
  }
`;

const StyledInput = styled.input`
  display: block;
  padding-left: .7rem;
  width: 100%;
  height: 58px;
  margin-bottom: 1rem;
  `;

const StyledButton = styled.button`
  width: 100%;
  height: 58px;
  margin-bottom: 1rem;
`;



// // 아이디로 사용가능한지 검사

// const id = 'abc123';

// // 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사한다.
// /^[A-Za-z0-9]{4,10}/.test(id);
const StyledLink = styled(Link)`
  padding: .5rem;
  color: black;
`;
function SignUp(props) {
  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign Up</h1>
        <h2>ID</h2>
        <label htmlFor="signUnId"/>
        <StyledInput type='text' id="signUpId" placeholder="영문 대소문자 및 숫자 6~10자리를 입력해 주세요" />
        <h2>PASSWORD</h2>
        <label htmlFor="signUpPw"/>
        <StyledInput type='password' id="signUpPw" placeholder="영문 숫자 특수기호 포함, 12자 이상을 입력해 주세요" />
        <label htmlFor="signUpPwCheck"/>
        <StyledInput type='password' id="signUpPwCheck" placeholder="비밀번호를 입력해 주세요" />
        <h2>NAME</h2>
        <div className="user-name">
          <label htmlFor="userLastName"/>
          <StyledInput className="last-name" type='text' id="userLastName" placeholder="성을 입력해 주세요" />
          <label htmlFor="userFirstName"/>
          <StyledInput className="first-name" type='text' id="userFirstName" placeholder="이름을 입력해 주세요" />  
        </div>
        <h2>ADDRESS</h2>
          <div className="zip-wrapper">
            <label htmlFor="userAddress"/>
            <StyledInput className="zip-code" type='text' id="userAddress" placeholder="우편번호" disabled={true} />
            <StyledButton >우편번호 검색</StyledButton>
          </div>
          <label htmlFor="autoAddress"/>
          <StyledInput id="autoAddress" placeholder="도로명 주소 입력" disabled={true}/>
          <label htmlFor="detailAddress"/>
          <StyledInput id="detailAddress" placeholder="상제 주소 입력" />
        <h2>NICKNAME<span>(선택)</span></h2>
        
        <label htmlFor="userNickname"/>
        <StyledInput id="userNickname" placeholder="상제 주소 입력"/>
        <StyledButton>가입하기</StyledButton>
      </Wrapper>
    </section>

  );
}

export default SignUp;