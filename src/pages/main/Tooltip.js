import { useState } from "react";
import { MdArrowLeft, MdArrowRight, MdClose } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 75px;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(50, 50, 50, 0.5);
  color: ${props => props.theme.gray800};
  cursor: default;
`;

const TooltipBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 100px;
  width: 450px;
  height: auto;
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
  cursor: pointer;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 2px #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  h1 {
    cursor: default;
  }
`;

const ContentsSection = styled.section`
  width: 100%;
  height: auto;
  padding: 1rem;
  word-break: keep-all;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.2rem;
    font-weight: 700;
    padding: .5rem 0;
  }

  .image-section {
    width: 100%;
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  h2 {
    line-height: 1.3rem;
  }
`;

const StyeldFooter = styled.footer`
  height: 50px;
  display: flex;
  justify-content: right;
  align-items: center;
  column-gap: 1rem;
  padding: 15px;

  border-top: 1px solid #888;

  button {
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.gray300};
    border: none;
    border-radius: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 20px;
    font-size: 1.5rem;
    cursor: Pointer;

    :hover {
      background-color: ${props => props.theme.mainLight};
      color: ${props => props.theme.gray800};
    }
  }
`;

function Tooltip (props) {
  const { setShowTooltips } = props;
  const [showContents, setShowContents] = useState(0);

  const tooltipContents = [
    <>
      <h1>1. 키워드로 검색하기</h1>
      <div className="image-section">
        <img src="/images/keywordSearch.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>화면 중앙 상단의 입력창에 검색하고 싶은 키워드를 입력해주세요.</h2>
    </>,
    <>
      <h1>2-1. 약속장소 찾기</h1>
      <div className="image-section">
        <img src="/images/nonMemberPlace.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>화면 좌측 메뉴에서 자신과 상대의 주소를 입력합니다.</h2>
    </>,
    <>
      <h1>2-2. 약속장소 찾기</h1>
      <div className="image-section">
        <img src="/images/detailAdress.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>대략의 주소를 입력하고 엔터 혹은 돋보기 모양의 검색 버튼을 누를 시 자세한 주소를 보여줍니다.</h2>
    </>,
    <>
      <h1>2-3. 약속장소 찾기</h1>
      <div className="image-section">
        <img src="/images/resultMap.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>주소를 모두 입력 후 "약속장소 찾기"버튼을 누르면 지도에 두 주소의 중간에 위치한 카페목록을 보여줍니다.</h2>
    </>,
    <>
      <h1>3-1. 회원 기능</h1>
      <div className="image-section">
        <img src="/images/favorite.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>로그인 시 즐겨찾기 기능을 이용할 수 있습니다.</h2>
    </>,
    <>
      <h1>3-2. 회원 기능</h1>
      <div className="image-section">
        <img src="/images/friend.jpg" placeholder="tooltip-image"/>
      </div>
      <h2>친구목록에서 한 명을 골라 그 사용자의 즐겨찾기 기능을 이용할 수 있습니다.</h2>
    </>,
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
        <ContentsSection>
          {tooltipContents[showContents]}
        </ContentsSection>
        <StyeldFooter>
          <button type="button" onClick={() => {setShowContents(showContents => Math.max(showContents - 1, 0))}}><MdArrowLeft /></button>
          <button type="button" onClick={() => {setShowContents(showContents => Math.min(showContents + 1, tooltipContents.length - 1))}}><MdArrowRight /></button>
        </StyeldFooter>
      </TooltipBox>
    </Wrapper>
  );
}

export default Tooltip;