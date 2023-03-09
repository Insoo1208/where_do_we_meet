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

function FindId () {
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const myColor = useSelector(selectColor);

  const handleFind = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/insoo1208/where_do_we_meet_data/userInfo');
      if (response.status === 200) {
        const target = response.data.find(user => user.email === value);
        if (target) {
          alert(`고객님의 아이디는 ${target.id}입니다.`);
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
        <h1>FIND ID</h1>
        <hr style={{ width: '100%' }}/>
        <InfoWrapper>
          <h2>아이디를 잊으셨나요?</h2>
          <h2>가입 할 때 사용한 이메일을 입력해주세요.</h2>
        </InfoWrapper>
        <label htmlFor="findID" />
        <StyledInput myColorHex={myColor} type='text' id="findID" value={value} onChange={e => setValue(e.target.value)}
          onKeyUp={e => { if(e.key === 'Enter' && value) handleFind(); }}
          autoComplete="off"
        ></StyledInput>
        <StyledButton myColorHex={myColor} onClick={handleFind}>찾기</StyledButton>
        <p className="cursor-pointer" onClick={() => { navigate('/signin'); }}>돌아가기</p>
      </Wrapper>
    </section>
  );
}

export default FindId;