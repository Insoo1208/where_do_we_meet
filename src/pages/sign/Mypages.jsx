import styled from "styled-components";
import MypagesMenu from "./MypagesMenu";
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

function Mypages () {  

  return (
    <Wrapper>
      <MypagesMenu />
      <Outlet />
    </Wrapper>
  );
}

export default Mypages;