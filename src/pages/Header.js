import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser, userLogOut } from '../features/user/userSlice';
import Tooltip from './main/Tooltip';
import { BsQuestionCircle } from 'react-icons/bs';

const Wrapper = styled.nav`
  width: 100%;
  height: 75px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.gray200};
`;

const StyledLogo = styled.div`
  width: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    font-size: 1.5rem;
  }
`;

const StyledUl = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 15px;
`;

const SubMenu = styled.li`
  flex: 1;
  text-align: center;
`;

const StyledLink = styled(Link)`
  padding: .5rem;
`;

const StyledNavLink = styled(NavLink)`
  padding: .5rem;
`;

const StyledButton = styled.button`
  background-color: inherit;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.gray200};
  }
`;

function Header () {
  const [showTooltips, setShowTooltips] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const closeTooltip = () => {
    if (showTooltips) setShowTooltips(false);
  };

  return (
    <>
      <header>
        <Wrapper>
          <StyledLogo onClick={() => { navigate('/'); }}  className="cursor-pointer">
            <StyledLink className='logo' to='/'>우리 어디서 만나?</StyledLink>
            <StyledButton type="button" onClick={() => setShowTooltips(!showTooltips)}>
              <BsQuestionCircle />
            </StyledButton>
            {showTooltips && <Tooltip setShowTooltips={setShowTooltips}/>}
          </StyledLogo>
          <StyledUl>
            { user
              ? 
              <>
                <li>{user.nickname}님 환영합니다.</li>
                <SubMenu><StyledNavLink to='/' onClick={closeTooltip}>내 정보</StyledNavLink></SubMenu>
                <SubMenu><StyledNavLink onClick={() => { dispatch(userLogOut()); closeTooltip(); }}>로그아웃</StyledNavLink></SubMenu>
              </>
              :
              <>
                <SubMenu><StyledNavLink to='/signin' onClick={closeTooltip}>로그인</StyledNavLink></SubMenu>
                <SubMenu><StyledNavLink to='/signup' onClick={closeTooltip}>회원가입</StyledNavLink></SubMenu>
              </>}
            <SubMenu><StyledNavLink to='/board' onClick={closeTooltip}>게시판</StyledNavLink></SubMenu>
          </StyledUl>
        </Wrapper>
      </header>
      <Outlet />
    </>
  );
}

export default Header;