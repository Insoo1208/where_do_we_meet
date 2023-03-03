import styled, { css } from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useCallback, useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank as CheckBoxBlank, MdCheckBox as CheckedBox  } from "react-icons/md";
import { IoMdEye as Eye, IoMdEyeOff as EyeOff } from "react-icons/io";
import  CenterModal  from "../../components/CenterModal";


import userData from "../../data.json";
// 서버에서 받아온 데이터 가정(import로 자동 파싱)
// console.log(userData);


const Wrapper = styled.div`
  width: 590px;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  padding: 16px;
  background-color: #ffccaa;

  div.input-check {
    background-color: skyblue;
    position: relative;
    svg { 
      position: absolute;
      right:.625rem;
      top: 0;
      bottom: 0;
      margin: auto;
      font-size: 30px;
      border: 1px;
      color: #acacac
    }
  }
  
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
      }
    }
  }

  .user-name {  
    /* width: 100%; */
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

const StyledLink = styled(Link)`
  padding: .5rem;
  color: black;
`;

const Error = styled.div`
  color: red;
  font-size: .6875rem;
  margin-bottom: 1rem;
`;

const Pass = styled.div`
  color: green;
  font-size: .6875rem;
`;

// 모달 CSS

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const MenuContainer = styled.div`
  width: 50%;
  height: 100vh;
  position: fixed;
  top: 0;
  /* right: -500px; */
  right: -100%;
  /* right: -100vw; */
  background-color: gray;

  transition: 0.5s;
  ${props => props.showMenu && 
    css`
      right: 0;
    `}
`;




function SignUp(props) {
  // useState
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);
  const [postcodeValue, setpostcodeValue] = useState({
    zonecode: '',
    address: '',
  });
  const [detailAddress, setDetailAddress] = useState('');
  const [postcodeCheck, setPostcodeCheck] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const [recomenderId, setRecomenderId] = useState('');
  const [inputType, setInputType] = useState('password');
  
  const [passwordCheckResult, setPasswordCheckResult] = useState(false);

  const [showModal, setShowModal] = useState(false); // 모달
  const handleClose = () => setShowModal(false); // 닫기
  const handleOpen = () => setShowModal(true); // 열기

  const navigate = useNavigate();

  const signUpCheck = [
    { title: "email", check: false },
    { title: "id", check: false },
    { title: "password", check: false },
    { title: "password2", check: false },
    { title: "address", check: false },
    { title: "detailaddress", check: true},
    { title: "lastname", check: false },
    { title: "firstname", check: false },
    { title: "nickname", check: false },
    { title: "recomender", check: true}
  ];

  useEffect(() => {
    // 비밀번호 재확인
    // console.log(userPasswordCheck, '===',userPassword);
    if (!userPasswordCheck) {
      return;
    }

    if((userPasswordCheck === userPassword) && userPasswordCheck) {
      console.log(`비밀번호 재확인 완료!`);
      setPasswordCheckResult(true)
    } else {
      console.log(`비밀번호를 다시 확인해 주세요!`);
      setPasswordCheckResult(false)
    }
  }, [userPasswordCheck, userPassword]);
  
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

  // 이메일 정규식 검사
  const emailCheck = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  // 아이디 정규식 검사
  const idCheck = /^[a-z0-9]{6,10}/; // 영어 소문자와 숫자 6~10자리
  // 비밀번호 정규식 검사
  // const passwordCheck =  /[A-Za-z0-9!@#$%^&*]{12}/g;
  const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ; //최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
  // const passwordCheck =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;  //입력은 대소문자특문 가능하고 반드시 조합해야되는건 영문숫자만 조합 

  // 이름 정규식 검사
  const nameCheck = /^[가-힣]+$/;

  // 상세주소 정규식 검사
  const detailAddressCheck = /([ㄱ-ㅎ|ㅏ-ㅣ]){1,}$/ ; // 온전하지않은 한글만 아니면 다 괜찮게

  // 닉네임 정규식 검사
  const nicknameCheck = /^([a-zA-Z0-9가-힣]){2,10}$/ ; // 최소 2자~10자이하의 영문 대소문자 숫자 한글 가능
  

  // 유저데이터
  const { userInfo } = userData;
  // console.log(userInfo);

  // email 중복검사
  const emailDuplicationCheck = userInfo.find((user) => {
    return user.email === userEmail ; 
  });

  // id 중복검사
  const idDuplicationCheck = userInfo.find((user) => {
    return user.id === userId ;
  });
  // console.log(idDuplicationCheck);
  
  // 추천회원 검사
  const recoenderIdCheck = userInfo.find((user) => {
    return user.id === recomenderId;
  });
  
  
  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Sign Up</h1>
        <h2>E-MAIL</h2>
        {/* 
          이메일 유효성검사
          1. 이메일 양식에 유효한 input 데이터인지 확인 [O]
          2. 이미 가입한 이메일인지 확인 [O]
          ----------------------
          3. 유효한 이메일인지 확인 [추후확인]
        */}
        
        <div className="input-check">
          <label htmlFor="signUpEmail"/>
          <StyledInput type="email" id="signUpEmail" placeholder="abc123@email.com" value={userEmail} autoComplete="off" spellCheck="false"
          onChange={(e) => {
            setUserEmail(e.target.value)
            console.log(emailCheck.test(userEmail));
          }}
          onBlur={() => {
            console.log(emailCheck.test(userEmail));
            if(emailCheck.test(userEmail) && !emailDuplicationCheck) {
            console.log(`올바른 이메일을 입력했습니다.`);
            signUpCheck.find( data => data.title === 'email').check = true;
          } else {
            console.log(`이메일 양식을 확인해 주세요.`);
          }}}
          />
          { 
            emailCheck.test(userEmail) && !emailDuplicationCheck
            ? <CheckedBox style={{color: 'green'}}/>
            : <CheckBoxBlank />
          }
        </div>
        {
          emailDuplicationCheck &&
          <Error>이미 가입한 이메일 입니다.</Error>
        }
        <h2>ID</h2>
        <div className="input-check">
          <label htmlFor="signUnId"/>
          <StyledInput type='text' id="signUpId" placeholder="영문 소문자 및 숫자 6~10자리를 입력해 주세요" value={userId} autoComplete="off" spellCheck="false"
            onChange={(e) => {
              setUserId(e.target.value)
            }}
            onBlur={() => {
              console.log(idCheck.test(userId));
              if(idCheck.test(userId) && !idDuplicationCheck) {
              signUpCheck.find(data => data.title === 'id').check = true;
            } else {
              console.log(`영문 대소문자와 숫자를 이용하여 6~10자리의 아이디를 만들어 주세요.`);
            }}}
          />
          { idCheck.test(userId) && !idDuplicationCheck
            ? <CheckedBox style={{color: 'green'}}/>
            : <CheckBoxBlank />
          }
        </div>
        { 
          idDuplicationCheck &&
            <Error>아이디가 중복되었습니다.</Error>
        }
        <h2>PASSWORD
          <button
                type="button"
                onClick={() => {
                  if(inputType !== 'text') {
                    setInputType('text');
                  } else {
                    setInputType('password')
                  }
                }}
              >
                {
                  inputType !== 'text' 
                    ? <EyeOff />
                    : <Eye />
                }
          </button>
        </h2>
        <div className="input-check">
          <label htmlFor="signUpPw"/>
          <StyledInput type={inputType} id="signUpPw" placeholder="반드시 영문, 숫자, 특수문자 포함 8자 이상을 입력해 주세요."  value={userPassword} autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value)
            }}
            onBlur={() => {
              console.log(passwordCheck.test(userPassword));
              if(passwordCheck.test(userPassword)) {
              console.log(`올바른 비밀번호를 입력했습니다.`);
              signUpCheck.find(data => data.title === 'password').check = true;
            } else {
              console.log(`반드시 영문, 숫자, 특수문자 포함 8자 이상을 입력해 주세요.`);
            }}}
            />
            { passwordCheck.test(userPassword) 
              ? <CheckedBox style={{color: 'green'}}/>
              : <CheckBoxBlank />
            }
        </div>
            
        <div className="input-check">
          <label htmlFor="signUpPwCheck"/>
          <StyledInput type={inputType} id="signUpPwCheck" placeholder="비밀번호를 다시 입력해 주세요" value={userPasswordCheck} autoComplete="off"
            onChange = {(e) => {
              setUserPasswordCheck(e.target.value);
            }}

            onBlur= {() => {
              if(passwordCheckResult && passwordCheck.test(userPassword)) {
                signUpCheck.find(data => data.title === 'password2').check = true;
              } else {
                console.log(`비밀번호를 다시 확인해 주세요!`);
              }
            }}
          />
          { passwordCheckResult && passwordCheck.test(userPassword)
              ? <CheckedBox style={{color: 'green'}}/>
              : <CheckBoxBlank />
          }
        </div>
        {
          !passwordCheckResult && userPasswordCheck && 
            <Error>비밀번호를 다시 확인해 주세요!</Error> 
        }
        <h2>NAME</h2>
        <div className="input-check" style={{ marginBottom: '1rem' }}>
          <div className="user-name" >
            <label htmlFor="userLastName" style={{display:'none'}} />
            <StyledInput className="last-name" type='text' id="userLastName" placeholder="성을 입력해 주세요" value={userLastName} autoComplete="off"  
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
              onBlur={() => {
                if(!nameCheck.test(userLastName)) {
                  console.log(`성을 정확히 입력해 주세요`);
                } else if( nameCheck.test(userLastName) ) {
                  signUpCheck.find(data => data.title === 'lastname').check = true;
                  console.log(userLastName);
                }
              }}
            />
            <label htmlFor="userFirstName" style={{display:'none'}}/>
            <StyledInput className="first-name" type='text' id="userFirstName" placeholder="이름을 입력해 주세요" value={userFirstName} autoComplete="off"
              onChange={(e) => {
                setUserFirstName(e.target.value);
              }}
              onBlur={() => {
                if(!nameCheck.test(userFirstName)) {
                  console.log(`이름을 정확히 입력해 주세요`);
                } else if (nameCheck.test(userFirstName)) {
                  signUpCheck.find(data => data.title === 'firstname').check = true;
                  console.log(userFirstName);
                }
              }}
            />
          { nameCheck.test(userLastName) && nameCheck.test(userFirstName)
                ? <CheckedBox style={{color: 'green'}}/>
                : <CheckBoxBlank />
          }
          </div>
        </div>
        {
          !nameCheck.test(userLastName) && userLastName &&
          <Error>성을 정확히 입력해 주세요</Error> 
        }
        {
          !nameCheck.test(userFirstName) && userFirstName &&
          <Error>이름을 정확히 입력해 주세요</Error> 
        }
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
        <StyledInput id="detailAddress" placeholder="상세 주소" autoComplete="off" value={detailAddress}
          onChange={(e) => 
            {return setDetailAddress(e.target.value)}
            
          }
          onBlur={() =>
            { if(detailAddressCheck.test(detailAddress) && detailAddress) { 
              signUpCheck.find(data => data.title === 'firstname').check = false;
              console.log(`상세주소를 확인해주세요`);
            } else {
              console.log(`상세주소 확인 완료`);
            }}
          } 
        />
        {/* {
          detailAddress? null 
          :  
          <Error>상세 주소를 입력해 주세요</Error>
        } */}

        <h2>NICKNAME</h2>
        <div className="input-check">
          <label htmlFor="userNickname"/>
          <StyledInput id="userNickname" placeholder="2-10자리, 한글, 영문, 숫자만 입력해 주세요" autoComplete="off" spellCheck="false" value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
          />
          { nicknameCheck.test(userNickname)
            ? <CheckedBox style={{color: 'green'}}/>
            : <CheckBoxBlank />
          }
        </div>
        {
          !nicknameCheck.test(userNickname) && userNickname &&
          <Error>닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 입니다.</Error>
        }
        
        <h2>REFERRAL CODE<span>(선택)</span></h2>
        <label htmlFor="recomenderId"></label>
        <StyledInput id="recomenderId" placeholder="추천인 아이디를 입력해 주세요 / 입력시, 추천인 가입인 모두 1000p증정" autoComplete="off" spellCheck="false" value={recomenderId}
          onChange={(e) => setRecomenderId(e.target.value)}
        />
        {
          !recoenderIdCheck && recomenderId &&
          <Error>없는 ID 입니다</Error>
        }
        
        <StyledButton
          onClick={()=>{

            if (signUpCheck.find(data => data.check === false)) {
              console.log('실패');
              alert(`필수 입력값을 확인해 주세요`);
            } else {
              console.log('성공');
              setShowModal(true);
            }

  
            // if(
            //   (userEmail && emailCheck.test(userEmail) && !emailDuplicationCheck) && 
            //   (idCheck.test(userId) && !idDuplicationCheck) && 
            //   (passwordCheckResult && passwordCheck.test(userPassword)) && (!passwordCheckResult && userPasswordCheck) && 
            //   (userLastName && userFirstName) && (nameCheck.test(userLastName) && nameCheck.test(userFirstName)) &&
            //   postcodeValue && 
            //   detailAddress &&
            //   nicknameCheck.test(userNickname)              
            //   ) {
            //   console.log(`회원가입 완료!`);
            //   console.log(recomenderId.point);
            //   // recomenderId.point += 1000; 
              
              
            // } else {
            //   // 확인이 안되어있는 필수값들이 전부 빨갛게 라인 표시되어야 함
            //   console.log(`필수입력값을 확인해 주세요!`);
            //   alert(`필수 입력값을 확인해 주세요`);
              
            // }
          }}
        >가입하기</StyledButton>

        <CenterModal
        title="회원가입 알림"
        size="small"
        cancelText="확인" // 메인페이지로 이동
        confirmText="로그인 화면" // 로그인페이지로 이동
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={undefined}
        visible={showModal}
      >
        회원가입을 축하드립니다!
      </CenterModal>
      </Wrapper>
    </section>

  );
}

export default SignUp;

// 회원가입 버튼 누르면

// 1. 필수항목 체크확인 
// yes : 
// 1)회원가입 성공알림창 모달로 띄우기, 
//   -환영의메시지와 로그인하러가기 버튼 눌러서 로그인화면으로 옮겨주기
//   -x 버튼 누르면 메인화면
//   -확인 누르면 메인화면
// 2)데이터 전송하기
// (회원가입데이터필수적으로 보내기(post방식으로), 선택적으로 포인트 증정)

// 데이터가 보내지는지 알 수 없으므로
// 일단 로컬데이터로 저장시켜보기



// no:  필수항목 확인 알림 필요한 조건 인풋창 레드라인으로 표시 
                