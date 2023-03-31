import axios from 'axios';
import styled from "styled-components";
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
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

  div.place-wrap {
    padding: 20px;
    margin-bottom: 1rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
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

  div.input-check {
    flex: 2;
  }
  button.btn-zip {
    flex: 1;
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
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  &:focus {
    border: 2px solid ${props => props.myColorHex.mainColor};
  }
  &:disabled {
    border: none;
    border-bottom: 1px solid #ccc;
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
  border: none;
  border-bottom: 1px solid #ccc;
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

function PlaceBookmark () {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [passwordCheckResult, setPasswordCheckResult] = useState(false);

  const [showModal, setShowModal] = useState(false); // 모달

  const navigate = useNavigate();

  // useState 객체 묶기
  const [bookmarkInputValues, setBookmarkInputValues] = useState({
    userNickname: '',
    zonecode: '',
    address: '',
    detailAddress: '',
  });

  // 회원가입 충족 조건
  const signUpCheck = useRef([
    { title: "postcode", check: false },
    { title: "detailaddress", check: true},
  ]);

  // 우편번호 검색 후 유효성 검사
  useEffect(() => {
    if(bookmarkInputValues.zonecode && bookmarkInputValues.address) {
      signUpCheck.current.find( data => data.title === 'postcode').check = true;
    }
  },[bookmarkInputValues.zonecode, bookmarkInputValues.address]);


  // 우편번호 검색
  const handleClickZipBtn = () => {
      setOpenPostcode(openPostcode => !openPostcode);
    };

  const handleSelectAddress = (data) => {
    setBookmarkInputValues({
      ...bookmarkInputValues,
      zonecode: data.zonecode,
      address: data.address
    });
    setOpenPostcode(!openPostcode);
  };

  // input onChange 함수 하나로 묶기
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValue = value;
    setBookmarkInputValues(bookmarkInputValues => ({
      ...bookmarkInputValues,
      [name]: inputValue
    }));
  };
  // 닉네임 정규식 검사
  const nicknameCheck = /^([a-zA-Z0-9가-힣]){2,10}$/ ; // 최소 2자~10자이하의 영문 대소문자 숫자 한글 가능

  // 상세주소 정규식 검사
  const detailAddressCheck = /.*[ㄱ-ㅎ|ㅏ-ㅣ]+.*/ ; // 온전하지 않은 한글만 아니면 다 가능 (ex. ㅋㅋ, ㅎ하 금지)

  // 유저데이터
  const { userInfo } = userData;

  const myColor = useSelector(selectColor);

  return (
    <>
      <section style={{ padding: '150px 0', flex: 1 }}>
        <Wrapper myColorHex={myColor}>
          <h1>즐겨찾기 등록하기</h1>
          <div className='place-wrap'>
            <h2 className="essential">장소1</h2>
            <label htmlFor="userNickname"/>
            <StyledInput name="userNickname" myColorHex={myColor} id="userNickname" placeholder="2-10자리, 한글, 영문, 숫자만 입력해 주세요" autoComplete="off" spellCheck="false" value={bookmarkInputValues.userNickname}
              onChange={handleInputChange}
              onBlur={() => {
                if(nicknameCheck.test(bookmarkInputValues.userNickname) && bookmarkInputValues.userNickname) {
                  signUpCheck.current.find(data => data.title === 'nickname').check = true
                } 
              }}
            />
            {
              !nicknameCheck.test(bookmarkInputValues.userNickname) && bookmarkInputValues.userNickname &&
              <Error>닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 입니다.</Error>
            }

            <div className="zip-wrapper">
              <label htmlFor="searchAddress"/>
              <StyledInput myColorHex={myColor} className="zip-code" type='text' id="searchAddress" placeholder="우편번호" disabled={true} value={bookmarkInputValues.zonecode}
              />
              <StyledButton myColorHex={myColor} className="btn-zip" onClick={handleClickZipBtn}>우편번호 검색</StyledButton>
              <br />
            </div>
            {
              openPostcode&&
                <DaumPostcode
                  onComplete={handleSelectAddress} 
                  autoClose={false}
                  defaultQuery=''
                />
            }
            <label htmlFor="userAddress"/>
            <StyledInput myColorHex={myColor} id="userAddress" placeholder="도로명 주소" disabled={true} value={bookmarkInputValues.address} 
            />
            <label htmlFor="detailAddress"/>
            <StyledInput name="detailAddress" myColorHex={myColor} id="detailAddress" placeholder="상세 주소" autoComplete="off" value={bookmarkInputValues.detailAddress}
              onChange={handleInputChange}
              onBlur={() =>
                { if(detailAddressCheck.test(bookmarkInputValues.detailAddress) && bookmarkInputValues.detailAddress) { 
                  signUpCheck.current.find(data => data.title === 'detailaddress').check = false;
                } else if(!detailAddressCheck.test(bookmarkInputValues.detailAddress) && bookmarkInputValues.detailAddress) {
                  signUpCheck.current.find(data => data.title === 'detailaddress').check = true;
                } else {
                  signUpCheck.current.find(data => data.title === 'detailaddress').check = true;
                }}
              } 
            />
          </div>
          
          <StyledButton
            myColorHex={myColor}
            className="btn-submit"
            onClick={()=>{

              if (signUpCheck.current.find(data => data.check === false)) {
                alert(`필수 입력값을 확인해 주세요`);
              } else {
                console.log('성공');
                setShowModal(true);
              }
            }}
          >저장하기</StyledButton>

          <CenterModal
          title="회원가입 알림"
          size="small"
          cancelText="확인" // 메인페이지로 이동
          confirmText="로그인 하기" // 로그인페이지로 이동
          onCancel={() => {
            navigate('/');
          }}
          onConfirm={() => {
            navigate('/signin');
          }}
          visible={showModal}
        >
          {/* TODO: 회원정보에서 이름 불러오기 */}
          {bookmarkInputValues.userLastName + bookmarkInputValues.userFirstName}님의 정보가 저장되었습니다.
        </CenterModal>
        </Wrapper>
      </section>
    </>
  );
}

export default PlaceBookmark;