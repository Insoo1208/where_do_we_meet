import { MdClose } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(50, 50, 50, 0.5);
`;

const TooltipBox = styled.div`
  width: 450px;
  height: 350px;
  position: absolute;
  top: 80px;
  left: 490px;

  background-color: #fff;
  border: none;
  border-radius: .5rem;

`;

const CloseButton = styled.button`
  width: auto;
  height: auto;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  border: none;
  z-index: 101;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 2px #888;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const styeldFooter = styled.footer`
  height: 40px;
`;

function Tooltip (props) {
  const { setShowTooltips } = props;

  const tooltipContents = [
    <div>첫 번째 내용</div>,
    <div>두 번째 내용</div>,
    <div>세 번째 내용</div>,
    <div>네 번째 내용</div>,
    <div>다섯 번째 내용</div>,
    <div>여섯 번째 내용</div>
  ]
  
  return (
    <Wrapper>
      <TooltipBox>
        <StyledHeader>
          <h1>우리 어디서 만나? 사용방법</h1>
          <CloseButton type="button" onClick={() => setShowTooltips(false)}>
            <MdClose />
          </CloseButton>
        </StyledHeader>
        <section className="contents">
          {}
        </section>
        <styeldFooter></styeldFooter>
      </TooltipBox>
    </Wrapper>
  );
}

export default Tooltip;