import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f2f2f;
  color: #f2f2f2;
`;

const StyledLogo = styled.div`
  width: 150px;
  height: 50px;

`;

const StyledUl = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const SubMenu = styled.li`
  width: 15%;
  text-align: center;
`;

function Header () {
  // const navigate = useNavigate();

  return (
    <>
      <header>
        <Wrapper>
          <StyledLogo className="cursor-pointer">
            우리 어디서 만나?
          </StyledLogo>
          <StyledUl>
            <SubMenu>로그인</SubMenu>
            <SubMenu>회원가입</SubMenu>
          </StyledUl>
        </Wrapper>
      </header>
      <Outlet />
    </>
  );
}

export default Header;