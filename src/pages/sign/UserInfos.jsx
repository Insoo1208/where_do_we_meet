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
import PasswordChange from './PasswordChange';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

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
    /* label.profile-button::before {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      transform: translate(-50%);
      width: 68px;
      height: 4px;
      border-radius: 4px;
      background-color: #fff;
    }
    label.profile-button::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 68px;
      border-radius: 4px;
      background-color: #fff;
    } */
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

function UserInfos() {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [passwordCheckResult, setPasswordCheckResult] = useState(false);

  const [showModal, setShowModal] = useState(false); // 모달
  const [profile, setProfile] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const [curUser, setCurUser] = useState({
    email: '',
    uid: '',
  });

  const navigate = useNavigate();
  const imgRef = useRef(null);

  // useState 객체 묶기
  const [signUpInputValues, setSignUpInputValues] = useState({
    userEmail: '',
    userId: '',
    userPassword: '',
    userPasswordCheck: '',
    userLastName: '',
    userFirstName: '',
    zonecode: '',
    address: '',
    detailAddress: '',
    userNickname: '',
    recomenderId: '',
  });

  // 회원가입 충족 조건
  const signUpCheck = useRef([
    { title: "email", check: true },
    { title: "id", check: true },
    { title: "password", check: true },
    { title: "password2", check: true },
    { title: "postcode", check: false },
    { title: "detailaddress", check: true},
    { title: "lastname", check: false },
    { title: "firstname", check: false },
    { title: "nickname", check: false },
    { title: "recomender", check: true}
  ]);

  // firebase에서 user정보 불러오기
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user);
        setCurUser(user);
      } else {
        console.log(user);
        setCurUser(null);
      };
    });
  }, []);

  // 회원정보를 처음 들어온 회원
  // 회원정보를 이전에 저장하고 다시 들어온 회원

  // useEffect (() => {
  //   const userDB = async () => {
  //     // Initialize Firebase
  //     const app = initializeApp(firebaseConfig);
  //     const db = getAuth(app);
  //     console.log(db);
  //     // const querySelectSnapshot = await getDoc(doc(db, "RecipeDB", docId)); 
  //     // // console.log(querySelectSnapshot.exists());
  //     // // console.log(querySelectSnapshot.data());
  //     // const recipeItemCall = querySelectSnapshot.data();
  //     // // console.log(recipeSelectItem.title);
  //     // setRecipeItem(recipeItemCall);
  //   }
  //   userDB();
  //   // const foundRecipe = data.find((item) => {
  //   //   return item.id == docId;
  //   // })
  // }, []);

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
  

  // 우편번호 검색 후 유효성 검사
  useEffect(() => {
    if(signUpInputValues.zonecode && signUpInputValues.address) {
      signUpCheck.current.find( data => data.title === 'postcode').check = true;
    }
  },[signUpInputValues.zonecode, signUpInputValues.address]);

  // 비밀번호 재설정하기
  const handleClickChangeBtn = () => {
    setOpenPasswordChange(openPasswordChange => !openPasswordChange);
  };

  // 우편번호 검색
  const handleClickZipBtn = () => {
      setOpenPostcode(openPostcode => !openPostcode);
    };

  const handleSelectAddress = (data) => {
    setSignUpInputValues({
      ...signUpInputValues,
      zonecode: data.zonecode,
      address: data.address
    });
    setOpenPostcode(!openPostcode);
  };

  // input onChange 함수 하나로 묶기
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValue = value;
    setSignUpInputValues(signUpInputValues => ({
      ...signUpInputValues,
      [name]: inputValue
    }));
  };

  // 프로필 이미지 등록
  const handleChangeFile = (event) => {
    console.log(event.target.files.length)
    setProfile(event.target.files);
    
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    }
  }

  // 링크 복사 기능
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  // 이메일 정규식 검사
  const emailCheck = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  // 아이디 정규식 검사
  const idCheck = /^[a-z0-9]{6,10}/; // 영어 소문자와 숫자 6~10자리

  // 비밀번호 정규식 검사
  const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ; //최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식

  // 이름 정규식 검사
  const nameCheck = /^[가-힣]+$/;

  // 상세주소 정규식 검사
  const detailAddressCheck = /.*[ㄱ-ㅎ|ㅏ-ㅣ]+.*/ ; // 온전하지 않은 한글만 아니면 다 가능 (ex. ㅋㅋ, ㅎ하 금지)

  // 닉네임 정규식 검사
  const nicknameCheck = /^([a-zA-Z0-9가-힣]){2,10}$/ ; // 최소 2자~10자이하의 영문 대소문자 숫자 한글 가능
  

  // 유저데이터
  const { userInfo } = userData;

  // email 중복검사
  const emailDuplicationCheck = userInfo.find((user) => {
    return user.email === signUpInputValues.userEmail ; 
  });

  // id 중복검사
  const idDuplicationCheck = userInfo.find((user) => {
    return user.id === signUpInputValues.userId ;
  });
  
  // 추천회원 검사
  const recoenderIdCheck = userInfo.find((user) => {
    return user.id === signUpInputValues.recomenderId;
  });

  const myColor = useSelector(selectColor);
  
  return (
    <>
      <section style={{ padding: '150px 0', flex: 1 }}>
        <Wrapper myColorHex={myColor}>
          <h1>개인정보 수정하기</h1>
          <div className="profile-wrap">
            <div className="profile">
              {imgFile
                ? <img src={imgFile} alt="프로필 이미지"/>
                : <label className="profile-button" htmlFor="file"><ProfileImg /></label>
              }
              <input
                type="file" 
                id="file"
                ref={imgRef}
                required
                accept='image/*'
                onChange={handleChangeFile}
                style={{display:"none"}} 
              />
            </div>
            {imgFile
              ? <div style={{ display: "none" }}></div>
              : <ProfilePlus />
            }
          </div>
          
          <h2 className="essential">닉네임</h2>
          <div className="input-check">
            <label htmlFor="userNickname"/>
            <StyledInput name="userNickname" myColorHex={myColor} id="userNickname" placeholder="2-10자리, 한글, 영문, 숫자만 입력해 주세요" autoComplete="off" spellCheck="false" value={signUpInputValues.userNickname}
              onChange={handleInputChange}
              onBlur={() => {
                if(nicknameCheck.test(signUpInputValues.userNickname) && signUpInputValues.userNickname) {
                  signUpCheck.current.find(data => data.title === 'nickname').check = true
                } 
              }}
            />
          </div>
          {
            !nicknameCheck.test(signUpInputValues.userNickname) && signUpInputValues.userNickname &&
            <Error>닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 입니다.</Error>
          }

          <h2>이메일</h2>
          {/* 
            이메일 유효성검사
            1. 이메일 양식에 유효한 input 데이터인지 확인 [O]
            2. 이미 가입한 이메일인지 확인 [O]
            ----------------------
            3. 유효한 이메일인지 확인 [추후확인]
          */}
          <div className='line-array'>
            <div className="input-check">
              <label htmlFor="signUpEmail"/>
              <StyledInputReadOnly name="userEmail" myColorHex={myColor} type="email" id="signUpEmail" value={curUser.email} autoComplete="off" spellCheck="false"
              readOnly
              />
            </div>
          </div>

          <h2>내 추천코드</h2>
          <div className='line-array'>
            <div className="input-check">
              <label htmlFor="signUnId"/>
              <StyledInputReadOnly name="userId" myColorHex={myColor} type='text' id="signUpId" value={curUser.uid} autoComplete="off" spellCheck="false"
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <StyledButton myColorHex={myColor} className="btn-zip" onClick={() => {handleCopyClipBoard('sisisisisi')}}>코드 복사하기</StyledButton>
          </div>

          <h2>비밀번호</h2>
          <StyledButton myColorHex={myColor} className="btn-zip" onClick={handleClickChangeBtn}>비밀번호 재설정하기</StyledButton>
          {
            openPasswordChange&&
              <PasswordChange 
                handleClickChangeBtn={handleClickChangeBtn}
                signUpCheck={signUpCheck}
              />
          }

          <h2 className="essential">이름</h2>
          <div className="input-check" style={{ marginBottom: '1rem' }}>
            <div className="user-name" >
              <label htmlFor="userLastName" style={{display:'none'}} />
              <StyledInput name="userLastName" myColorHex={myColor} className="last-name" type='text' id="userLastName" placeholder="성을 입력해 주세요" value={signUpInputValues.userLastName} autoComplete="off"  
                onChange={handleInputChange}
                onBlur={() => {
                if( nameCheck.test(signUpInputValues.userLastName) ) {
                    signUpCheck.current.find(data => data.title === 'lastname').check = true;
                  }
                }}
              />
              <label htmlFor="userFirstName" style={{display:'none'}}/>
              <StyledInput name="userFirstName" myColorHex={myColor} className="first-name" type='text' id="userFirstName" placeholder="이름을 입력해 주세요" value={signUpInputValues.userFirstName} autoComplete="off"
                onChange={handleInputChange}
                onBlur={() => {
                if (nameCheck.test(signUpInputValues.userFirstName)) {
                    signUpCheck.current.find(data => data.title === 'firstname').check = true;
                  }
                }}
              />
            </div>
          </div>
          {
            !nameCheck.test(signUpInputValues.userLastName) && signUpInputValues.userLastName &&
            <Error>성을 한글로 정확히 입력해 주세요</Error> 
          }
          {
            !nameCheck.test(signUpInputValues.userFirstName) && signUpInputValues.userFirstName &&
            <Error>이름을 한글로 정확히 입력해 주세요</Error> 
          }
          <h2 className="essential">주소</h2>
          <div className="zip-wrapper">
            <label htmlFor="searchAddress"/>
            <StyledInput myColorHex={myColor} className="zip-code" type='text' id="searchAddress" placeholder="우편번호" disabled={true} value={signUpInputValues.zonecode}
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
          <StyledInput myColorHex={myColor} id="userAddress" placeholder="도로명 주소" disabled={true} value={signUpInputValues.address} 
          />
          <label htmlFor="detailAddress"/>
          <StyledInput name="detailAddress" myColorHex={myColor} id="detailAddress" placeholder="상세 주소" autoComplete="off" value={signUpInputValues.detailAddress}
            onChange={handleInputChange}
            onBlur={() =>
              { if(detailAddressCheck.test(signUpInputValues.detailAddress) && signUpInputValues.detailAddress) { 
                signUpCheck.current.find(data => data.title === 'detailaddress').check = false;
              } else if(!detailAddressCheck.test(signUpInputValues.detailAddress) && signUpInputValues.detailAddress) {
                signUpCheck.current.find(data => data.title === 'detailaddress').check = true;
              } else {
                signUpCheck.current.find(data => data.title === 'detailaddress').check = true;
              }}
            } 
          />
          
          <h2>추천인 코드</h2>
          <label htmlFor="recomenderId"></label>
          <StyledInput name="recomenderId" myColorHex={myColor} id="recomenderId" placeholder="추천인 아이디를 입력해 주세요 / 입력시, 추천인 가입인 모두 1000p증정" autoComplete="off" spellCheck="false" value={signUpInputValues.recomenderId}
            onChange={handleInputChange}
            onBlur={() => {
              if(!recoenderIdCheck && signUpInputValues.recomenderId){
                signUpCheck.current.find(data => data.title ==='recomender').check = false;
                console.log('추천인 아이디를 확인해 주세요');
              } else if (recoenderIdCheck && signUpInputValues.recomenderId ) {
                signUpCheck.current.find(data => data.title ==='recomender').check = true;
                console.log(signUpInputValues.userId+'님'+signUpInputValues.recomenderId+'님'+'각각 1000점 추가 예정');
              } else {
                signUpCheck.current.find(data => data.title ==='recomender').check = true;
                console.log('추천인 id 추가 안하고 회원가입');
              }
              console.log(signUpCheck.current.find(data => data.title ==='recomender'));
            }}
          />
          {
            !recoenderIdCheck && signUpInputValues.recomenderId &&
            <Error>없는 ID 입니다</Error>
          }
          
          <StyledButton
            myColorHex={myColor}
            className="btn-submit"
            onClick={()=>{

              if (signUpCheck.current.find(data => data.check === false)) {
                alert(`필수 입력값을 확인해 주세요`);
                console.log(signUpCheck);
              } else {
                console.log('성공');
                setShowModal(true);
                console.log(signUpCheck);
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
          {signUpInputValues.userLastName + signUpInputValues.userFirstName}님의 정보가 저장되었습니다.
        </CenterModal>
        </Wrapper>
      </section>

    </>
    
    
  );
}

export default UserInfos;


