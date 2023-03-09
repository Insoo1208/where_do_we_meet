import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectColor } from "../../features/color/colorSlice";

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 40px;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    cursor: default;
  }

  p {
    font-size: 14px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem 1.5rem;

  h2 {
    padding-bottom: .5rem;
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
const RadioWrapper = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  column-gap: .5rem;

  input {
    display: block;
    margin-left: 1rem;
  }
`;

function FindPw () {
  const [value, setValue] = useState('');
  const [idChecked, setIdChecked] = useState(true);
  const navigate = useNavigate();
  const myColor = useSelector(selectColor);

  const handleFind = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/insoo1208/where_do_we_meet_data/userInfo');
      if (response.status === 200) {
        let target;
        if (idChecked) target = response.data.find(user => user.id === value);
        else target = response.data.find(user => user.email === value);

        if (target) {
          alert(`회원님의 비밀번호는 ${target.password}입니다.`);
          navigate('/signin');
        } else {
          alert('일치하는 정보가 없습니다.');
          setValue('');
        }
      }
      else throw new Error(`api error: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>FIND PASSWORD</h1>
        <hr style={{ width: '100%' }}/>
        <InfoWrapper>
          <h2>비밀번호를 잊으셨나요?</h2>
          <h2>아래의 인증방법을 선택하시고 정보를 입력해주세요.</h2>
        </InfoWrapper>
        <RadioWrapper>
          <input type="radio" id="RadioId" checked={idChecked} onChange={() => { setIdChecked(true) }}/>
          <label htmlFor="RadioId">아이디</label>
          <input type="radio" id="RadioEmail" checked={!idChecked} onChange={() => { setIdChecked(false) }}/>
          <label htmlFor="RadioEmail">이메일</label>
        </RadioWrapper>
        <label htmlFor="findPW"/>
        <StyledInput myColorHex={myColor} type='text' id="findPW" value={value} onChange={e => setValue(e.target.value)}
          autoComplete="off"
          onKeyUp={e => { if(e.key === 'Enter' && value) handleFind(); }}
        ></StyledInput>
        <StyledButton myColorHex={myColor}  onClick={handleFind}>찾기</StyledButton>
        <p className="cursor-pointer" onClick={() => { navigate('/signin'); }}>돌아가기</p>
      </Wrapper>
    </section>
  );
}

export default FindPw;