import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import data from "../../data.json";

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
`;

const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  margin-bottom: 1rem;
`;

function FindId () {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleFind = () => {
    const target = data.userInfo.find(user => user.email === value);
    if (target) {
      alert(`고객님의 아이디는 ${target.id}입니다.`);
      navigate('/signin');
    } else {
      alert('일치하는 정보가 없습니다.');
      setValue('');
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
        <StyledInput type='text' id="findID" value={value} onChange={e => setValue(e.target.value)}
          onKeyUp={e => { if(e.key === 'Enter' && value) handleFind(); }}
          autoComplete="off"
        ></StyledInput>
        <StyledButton onClick={handleFind}>찾기</StyledButton>
        <p className="cursor-pointer" onClick={() => { navigate('/signin'); }}>돌아가기</p>
      </Wrapper>
    </section>
  );
}

export default FindId;