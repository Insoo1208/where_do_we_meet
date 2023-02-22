import { useNavigate, Outlet, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
  width: 100%;
  height: 75px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f2f2f;
  color: #f2f2f2;
  /* box-shadow: 0 4px 4px 0px #555; */
`;

const StyledLogo = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledLink = styled(Link)`
  padding: .5rem;
`;

const StyledNavLink = styled(NavLink)`
  padding: .5rem;
`;

function Header () {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Wrapper>
          <StyledLogo onClick={() => { navigate('/'); }}  className="cursor-pointer">
            <StyledLink to='/'>우리 어디서 만나?</StyledLink>
          </StyledLogo>
          <StyledUl>
            <SubMenu><StyledNavLink to='/signin'>로그인</StyledNavLink></SubMenu>
            <SubMenu><StyledNavLink to='/signup'>회원가입</StyledNavLink></SubMenu>
            <SubMenu><StyledNavLink to='/board'>게시판</StyledNavLink></SubMenu>
          </StyledUl>
        </Wrapper>
      </header>
      <Outlet />










    </>
  );
}

export default Header;