import axios from 'axios';
import styled from "styled-components";
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { MdCheckBoxOutlineBlank as CheckBoxBlank, MdCheckBox as CheckedBox } from "react-icons/md";
import { IoIosAddCircle as ProfilePlus } from "react-icons/io";
import { IoMdEye as Eye, IoMdEyeOff as EyeOff } from "react-icons/io";
import { BsFillPersonFill as ProfileImg } from "react-icons/bs";
import DaumPostcode from "react-daum-postcode";
import  CenterModal  from "../../components/CenterModal";
import { changeColor, chooseColor } from '../../features/color/colorSlice';

import userData from "../../data.json";
import { useSelector } from "react-redux";
import { selectColor } from "../../features/color/colorSlice";

const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width : 400px;
  }
  width: 500px;
  margin: 0 auto;
  align-items: center;

  div.profile-wrap {
    position: relative;

    div.profile {
      display: flex;
      width: 150px;
      height: 146px;
      margin: 0px auto;
      border-radius: 50%;
      overflow: hidden;
    }
    label.profile-button{
      flex: 1;
      width: 150px;
      height: 146px;
      color: white;
      cursor: pointer;
      background-color: ${ props => props.myColorHex.mainLight };

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
        color: white;
      }
    }
    svg {
      position: absolute;
      bottom: 0px;
      right: 35%;
      font-size: 3rem;
      color: ${props => props.myColorHex.mainColor};
    }
  }

  div.input-check {
    position: relative;
    svg { 
      position: absolute;
      right:.625rem;
      top: 0;
      bottom: 0;
      margin: auto;
      font-size: 30px;
      color: ${props => props.myColorHex.mainColor};
    }
  }
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    cursor: default;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 100;
    padding-bottom: .625rem;
    margin-top: .875rem;
    position: relative;

    span {
      font-size: 1rem;
      line-height: 1rem;
    }

    button {
      position: absolute;
      right: .625rem;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 1.875rem;
      height: 1.875rem;
      background: inherit ; 
      border:none; 
      box-shadow:none; 
      padding: 0; 
      overflow:visible; 
      &:focus {
        border: none;
      }
      cursor:pointer;
      svg {
        font-size: 1.25rem;
        color: ${props => props.theme.gray800};
      }
    }
  }

  h2.essential::after {
    content: "(필수)";
    font-size: 1rem;
    padding-left: .1125rem;
    color: #e75d5d;
  }

  .user-name {  
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    input {
      margin: 0;
    }
    input.last-name {
      margin-right: 1rem;
      width: 70%;
    }
    
  }
  
  .zip-wrapper {
    display: flex;
  }

  .zip-code{
    margin-right: 1rem;
    width: 70%;
  }

  div.line-array {
    display: flex;
    column-gap: 1rem;

    div.input-check {
      flex: 2;
    }
    button.btn-zip {
      flex: 1;
    }
  }

`;

const StyledInput = styled.input`
@media ${({ theme }) => theme.device.tablet} {
  font-size: 12px;
  ::placeholder {
    letter-spacing: -0.055rem;
  }
}
  
  display: block;
  padding-left: .7rem;
  width: 100%;
  height: 55px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  outline: none;
  &:focus {
    border: 2px solid ${props => props.myColorHex.mainColor};
  }
  &:disabled {
    border: 1px solid ${props => props.theme.gray800};
    background-color: ${props => props.theme.gray200};
  }
`;

const StyledInputReadOnly = styled.input`
@media ${({ theme }) => theme.device.tablet} {
  font-size: 12px;
  ::placeholder {
    letter-spacing: -0.055rem;
  }
}
  
  display: block;
  padding-left: .7rem;
  width: 100%;
  height: 55px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  outline: none;
  background-color: ${props => props.theme.gray200};
  &:focus {
    border: 1px solid #333;
  }
  &:disabled {
    border: 1px solid ${props => props.theme.gray800};
    background-color: ${props => props.theme.gray200};
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 55px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  
  &.btn-zip {
    color: #fff;
    background-color: #4a4c4e;
    font-weight: bold;
    :hover {
      background-color: ${ props => props.myColorHex.mainLight };
    }
  }
  &.btn-submit {
    color: #fff;
    background-color: ${ props => props.myColorHex.mainColor };
    font-weight:bold;
    :hover {
      background-color: ${ props => props.myColorHex.mainLight };
    }
  }
`;

const Error = styled.div`
  color: red;
  font-size: .6875rem;
  margin-bottom: 1rem;
`;

function PasswordChange(props) {
  const { handleClickChangeBtn, signUpCheck } = props;

  const [inputType, setInputType] = useState('password');
  const [passwordCheckResult, setPasswordCheckResult] = useState(false);

  // useState 객체 묶기
  const [signUpInputValues, setSignUpInputValues] = useState({
    userPassword: '',
    userPasswordCheck: '',
  });

  useEffect(() => {
    // 비밀번호 재확인
    if (!signUpInputValues.userPasswordCheck) {
      return;
    }

    if((signUpInputValues.userPasswordCheck === signUpInputValues.userPassword) && signUpInputValues.userPasswordCheck) {
      setPasswordCheckResult(true)
    } else {
      setPasswordCheckResult(false)
    }
  }, [signUpInputValues.userPasswordCheck, signUpInputValues.userPassword]);

  // 비밀번호 정규식 검사
  const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ; //최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식

  // input onChange 함수 하나로 묶기
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValue = value;
    setSignUpInputValues(signUpInputValues => ({
      ...signUpInputValues,
      [name]: inputValue
    }));
  };

  const handlePasswordSuccess = (e) => {
    console.log('성공');
  };

  const handlePp = () => {
    console.log('ㅇㅇㅇㅇ');
  };

  // 유저데이터
  const { userInfo } = userData;

  const myColor = useSelector(selectColor);

  return (
    <>
      <h2>비밀번호 재설정
        <button type="button" onClick={() => {}}>
          { inputType !== 'text' ? <EyeOff /> : <Eye /> }
        </button>
      </h2>
      <div className="input-check">
        <label htmlFor="signUpPw"/>
        <StyledInput name="userPassword" myColorHex={myColor} type={inputType} id="signUpPw" placeholder="반드시 영문, 숫자, 특수문자(@$!%*#?&) 포함 8자 이상을 입력해 주세요."  value={signUpInputValues.userPassword} autoComplete="off"
          onChange={handleInputChange}
          onBlur={() => {
            if(passwordCheck.test(signUpInputValues.userPassword)) {
            signUpCheck.current.find(data => data.title === 'password').check = true;
          }}}
          />
      </div>
      {
        !passwordCheck.test(signUpInputValues.userPassword) && signUpInputValues.userPassword &&
        <Error>반드시 영문, 숫자, 특수문자(@$!%*#?&) 포함 8자 이상을 입력해 주세요.</Error>
      }    
      <div className="input-check">
        <label htmlFor="signUpPwCheck"/>
        <StyledInput name="userPasswordCheck" myColorHex={myColor} type={inputType} id="signUpPwCheck" placeholder="비밀번호를 다시 입력해 주세요" value={signUpInputValues.userPasswordCheck} autoComplete="off"
          onChange = {handleInputChange}

          onBlur= {() => {
            if(passwordCheckResult && passwordCheck.test(signUpInputValues.userPassword)) {
              signUpCheck.current.find(data => data.title === 'password2').check = true;
            }
          }}
        />
      </div>
      {
        !passwordCheckResult && signUpInputValues.userPasswordCheck && 
          <Error>비밀번호를 다시 확인해 주세요!</Error> 
      }
      <div className="line-array">
        <StyledButton myColorHex={myColor} className="btn-zip" onClick={handleClickChangeBtn}>취소</StyledButton>
        <StyledButton myColorHex={myColor} className="btn-zip" onClick={() => console.log('eee')}>비밀번호 변경하기</StyledButton>
      </div>
    </>
  );
}

export default PasswordChange;