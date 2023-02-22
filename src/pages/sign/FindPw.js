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

  const handleFind = () => {
    let target;
    if (idChecked) target = data.userInfo.find(user => user.id === value);
    else target = data.userInfo.find(user => user.email === value);

    if (target) {
      alert(`고객님의 비밀번호는 ${target.password}입니다.`);
      navigate('/signin');
    } else {
      alert('일치하는 정보가 없습니다.');
      setValue('');
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
        <StyledInput type='text' id="findPW" value={value} onChange={e => setValue(e.target.value)}
          autoComplete="off"
          onKeyUp={e => { if(e.key === 'Enter' && value) handleFind(); }}
        ></StyledInput>
        <StyledButton onClick={handleFind}>찾기</StyledButton>
        <p className="cursor-pointer" onClick={() => { navigate('/signin'); }}>돌아가기</p>
      </Wrapper>
    </section>
  );
}

export default FindPw;