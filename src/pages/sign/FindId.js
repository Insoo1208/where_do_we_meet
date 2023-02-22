import styled from "styled-components";

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
`;

function FindId () {
  
  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>아이디 찾기</h1>
      </Wrapper>
    </section>
  );
}

export default FindId;