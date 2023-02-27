import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useState } from "react";

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
  cursor: pointer;
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
  // useState
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);
  const [postcodeValue, setpostcodeValue] = useState({
    zonecode: '',
    address: '' 
  });
  const [inputType, setInputType] = useState('password');
  
  useEffect(() => {
    // 비밀번호 재확인
    console.log(userPasswordCheck, '===',userPassword);
    if(userPasswordCheck === userPassword) {
      console.log(`비밀번호 재확인 완료!`);
    } else {
      console.log(`비밀번호를 다시 확인해 주세요!`);
    }
  }, [userPasswordCheck]);
  
  // 우편번호 검색
  const handleClickZipBtn = () => {
      setOpenPostcode(openPostcode => !openPostcode);
    };

  const handleSelectAddress = (data) => {
    setpostcodeValue({
      zonecode: data.zonecode,
      address: data.address
      });
    setOpenPostcode(!openPostcode);
  };

  // 아이디 정규식 검사
  const idCheck = /^[a-z0-9]{6,10}/;
  // 비밀번호 정규식 검사
  // const passwordCheck =  /[A-Za-z0-9!@#$%^&*]{12}/g;
  const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ; //최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
  // const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;  //입력은 대소문자특문 가능하고 반드시 조합해야되는건 영문숫자만 조합 

  // const inputIdCheck = document.getElementById('signUpId').onblur(idCheck.test(userId));
  // if(inputIdCheck) {
  //   console.log(`올바른 아이디를 입력했습니다.`);
  // } else {
  //   console.log(`영문 대소문자와 숫자를 이용하여 4~10자리의 아이디를 만들어 주세요.`);
  // }

  // 이름 정규식 검사
  const nameCheck = /^[가-힣]+$/;


  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign Up</h1>
        <h2>ID</h2>
        <label htmlFor="signUnId"/>
        <StyledInput type='text' id="signUpId" placeholder="영문 소문자 및 숫자 6~10자리를 입력해 주세요" value={userId} autoComplete="off" required
        onChange={(e) => {
          setUserId(e.target.value)
        }}
        onBlur={() => {
          console.log(idCheck.test(userId));
          if(idCheck.test(userId)) {
          console.log(`올바른 아이디를 입력했습니다.`);
        } else {
          console.log(`영문 대소문자와 숫자를 이용하여 6~10자리의 아이디를 만들어 주세요.`);
        }}}
        />
        <h2>PASSWORD</h2>
        <label htmlFor="signUpPw"/>
        <StyledInput type={inputType} id="signUpPw" placeholder="반드시 영문, 숫자, 특수문자 포함 8자 이상을 입력해 주세요."  value={userPassword} autoComplete="off"
        onChange={(e) => {
          setUserPassword(e.target.value)
        }}
        onBlur={() => {
          console.log(passwordCheck.test(userPassword));
          if(passwordCheck.test(userPassword)) {
          console.log(`올바른 비밀번호를 입력했습니다.`);
        } else {
          console.log(`반드시 영문, 숫자, 특수문자 포함 8자 이상을 입력해 주세요.`);
        }}}
        />
        <button
          type="button"
          onClick={() => {
            if(inputType !== 'text') {
              setInputType('text');
            } else {
              setInputType('password')
            }
          }}
        >toggle</button>
        <label htmlFor="signUpPwCheck"/>
        <StyledInput type='password' id="signUpPwCheck" placeholder="비밀번호를 다시 입력해 주세요" value={userPasswordCheck} autoComplete="off"
        onChange={(e) => {
          setUserPasswordCheck(e.target.value);
        }}
        />
        <h2>NAME</h2>
        <div className="user-name">
          <label htmlFor="userLastName"/>
          <StyledInput className="last-name" type='text' id="userLastName" placeholder="성을 입력해 주세요" value={userLastName} autoComplete="off"  
          onChange={(e) => {
            setUserLastName(e.target.value);
          }}
          onBlur={() => {
            if(!nameCheck.test(userFirstName)) {
              console.log(`한글을 정확히 입력해 주세요`);
            } else {
              console.log(userFirstName);
            }
          }}
          />
          <label htmlFor="userFirstName"/>
          <StyledInput className="first-name" type='text' id="userFirstName" placeholder="이름을 입력해 주세요" value={userFirstName} autoComplete="off"
          onChange={(e) => {
            setUserFirstName(e.target.value);
          }}
          onBlur={() => {
            if(!nameCheck.test(userFirstName)) {
              console.log(`한글을 정확히 입력해 주세요`);
            } else {
              console.log(userFirstName);
            }
          }}
          />  
        </div>
        <h2>ADDRESS</h2>
          <div className="zip-wrapper">
            <label htmlFor="searchAddress"/>
            <StyledInput className="zip-code" type='text' id="searchAddress" placeholder="우편번호" disabled={true} value={postcodeValue.zonecode}/>
            <StyledButton onClick={handleClickZipBtn}>우편번호 검색</StyledButton>
            <br />
            
            
          </div>
              {
                openPostcode&&
                  <DaumPostcode
                    onComplete={handleSelectAddress} 
                    autoClose={false}
                    defaultQuery='판교역로 235'
                  />
              }
          <label htmlFor="userAddress"/>
          <StyledInput id="userAddress" placeholder="도로명 주소" disabled={true} value={postcodeValue.address} />
          <label htmlFor="detailAddress"/>
          <StyledInput id="detailAddress" placeholder="상세 주소" autoComplete="off"/>
        
        <h2>NICKNAME</h2>
        <label htmlFor="userNickname"/>
        <StyledInput id="userNickname" placeholder="닉네임을 입력해 주세요"/>
        
        <h2>REFERRAL CODE<span>(선택)</span></h2>
        <StyledInput id="recomenderNickname" placeholder="추천인 아이디를 입력해 주세요 / 입력시, 추천인 가입인 모두 1000p증정"/>
        
        <StyledButton>가입하기</StyledButton>
      </Wrapper>
    </section>

  );
}

export default SignUp;