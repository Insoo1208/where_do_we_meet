import styled from "styled-components";
import Menu from "./Menu";
import Contents from "./Content";
import PostWrite from "./PostWrite";

const Wrapper = styled.div`
  min-height: 860px;
  display: flex;
  background-color: #f5f5f5;
`;

function Board () {  

  return (
      <Wrapper>
        <Menu />
        <Contents />

        {/* 게시물 작성하기*/}
        {/* <PostWrite />  */}
      </Wrapper>
  );
}

export default Board;