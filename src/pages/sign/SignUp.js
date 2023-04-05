import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "../../firebase"

import { selectColor } from "../../features/color/colorSlice";
import Loading from "../../components/Loading";

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

  label {
    padding: .7rem;
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
  background-color: ${props => props.myColorHex.mainLight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: -1px;

  :hover {
    background-color: ${props => props.myColorHex.mainColor};
  }
`;

const PasswordWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    position: absolute;
    top: 53px;
    right: 1rem;
    cursor: pointer;
  }
`;

const SignUp = () => {
  const [inputValue, setInputValue] = useState({ id: '', pw: '', pwCheck: '' });
  const [togglePw, setTogglePw] = useState('password');
  const [apiLoading, setApiLoading] = useState(false);

  const myColor = useSelector(selectColor);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (inputValue.pw !== inputValue.pwCheck) throw new Error('비밀번호가 일치하지 않습니다.');
      setApiLoading(true);
      const signInUser = await createUserWithEmailAndPassword(
        auth, inputValue.id, inputValue.pw
      );
      setApiLoading(false);
      sendEmailVerification(auth.currentUser);
      alert(`회원가입 성공!\n${inputValue.id}주소로 인증 확인 메일을 보내드렸습니다.\n이메일 인증이 되어야 우리 어디서 만나?의 기능을 사용할 수 있습니다.`);
      navigate('/signin');
    } catch (error) {
      setApiLoading(false);
      switch (error.code) {
        case 'auth/weak-password':
          alert('비밀번호는 6자리 이상이어야 합니다');
          break;
        case 'auth/invalid-email':
          alert('잘못된 이메일 주소입니다');
          break;
        case 'auth/email-already-in-use':
          alert('이미 가입되어 있는 계정입니다');
          break;
        
        default:
          alert(error);
          break;
      };
    }
  };

  const handleBack = () => navigate(-1);
  const handleToggle = () => {
    togglePw === 'password'
      ? setTogglePw('text')
      : setTogglePw('password');
  };

  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>회원가입</h1>
        <label htmlFor="signup-email">아이디</label>
        <StyledInput id="signup-email" type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder="example@gmail.com"
          myColorHex={myColor}
          value={inputValue.id} onChange={e => setInputValue({...inputValue, id: e.target.value})}
        />
        <PasswordWrapper>
          {togglePw === 'text' ? <IoEye onClick={handleToggle} /> : <IoEyeOff onClick={handleToggle} />}
          <label htmlFor="signup-password">비밀번호</label>
          <StyledInput id="signup-password" type={togglePw}
            autoComplete="off"
            spellCheck="false"
            placeholder="비밀번호는 6자 이상입니다."
            myColorHex={myColor}
            value={inputValue.pw} onChange={e => setInputValue({ ...inputValue, pw: e.target.value })}
          />
          <label htmlFor="signup-password-check">비밀번호 확인</label>
          <StyledInput id="signup-password-check" type={togglePw}
            autoComplete="off"
            spellCheck="false"
            placeholder="비밀번호 재확인"
            myColorHex={myColor}
            value={inputValue.pwCheck} onChange={e => setInputValue({ ...inputValue, pwCheck: e.target.value })}
          />
        </PasswordWrapper>

        <StyledButton
          myColorHex={myColor}
          className="sign-up--submit"
          onClick={handleSubmit}
        >가입하기</StyledButton>
        <p className="cursor-pointer" onClick={handleBack}>돌아가기</p>
      </Wrapper>
      {apiLoading && <Loading />}
    </section>
  );
};

export default SignUp;