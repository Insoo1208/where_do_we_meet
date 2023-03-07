import styled from "styled-components";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 860px;
  display: flex;
  background-color: #f5f5f5;
  @media ${({ theme }) => theme.device.tablet } {
    width: 100%;
    flex-direction: column ;
  }
`;

function Board () {  

  return (
    <Wrapper>
      <Menu />
      <Outlet />
    </Wrapper>
  );
}

export default Board;