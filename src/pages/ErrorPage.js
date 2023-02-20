import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  height: 500px;
  margin: 0 auto;
  text-align: center;
`;

const StyledP = styled.p`
  display: block;
  margin: 6rem 0;
  font-size: 25px;
`;

function ErrorPage () {
  return (
    <Wrapper>
      <StyledP>404 Not Found</StyledP>
      <StyledP>올바른 주소를 입력해주세요.</StyledP>
    </Wrapper>
  );
}

export default ErrorPage;