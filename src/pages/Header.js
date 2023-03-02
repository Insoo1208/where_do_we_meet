import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser, userLogOut } from '../features/user/userSlice';

const Wrapper = styled.nav`
  width: 100%;
  height: 75px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #131E22; */
  /* color: #f2f2f2; */
  background-color: ${props => props.theme.mainDark};
  color: ${props => props.theme.gray200}
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      <header>
        <Wrapper>
          <StyledLogo onClick={() => { navigate('/'); }}  className="cursor-pointer">
            <StyledLink to='/'>우리 어디서 만나?</StyledLink>
          </StyledLogo>
          <StyledUl>
            { user
              ? 
              <>
                <p>{user.nickname}님 환영합니다.</p>
                <SubMenu><StyledNavLink to='/'>내 정보</StyledNavLink></SubMenu>
                <SubMenu><StyledNavLink onClick={() => dispatch(userLogOut())}>로그아웃</StyledNavLink></SubMenu>
              </>
              :
              <>
                <SubMenu><StyledNavLink to='/signin'>로그인</StyledNavLink></SubMenu>
                <SubMenu><StyledNavLink to='/signup'>회원가입</StyledNavLink></SubMenu>
              </>}
            <SubMenu><StyledNavLink to='/board'>게시판</StyledNavLink></SubMenu>
          </StyledUl>
        </Wrapper>
      </header>
      <Outlet />
    </>
  );
}

export default Header;