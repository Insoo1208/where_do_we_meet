import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { resetColor, selectColor } from '../features/color/colorSlice';
import { selectUser, userLogIn, userLogOut } from '../features/user/userSlice';
import Tooltip from './main/Tooltip';
import { BsQuestionCircle } from 'react-icons/bs';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.nav`
  width: 100%;
  height: 75px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.myColorHex.mainColor};
  color: #fff;
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
  @media ${({ theme }) => theme.device.tablet } {
    flex: 1;
    margin-left: 1rem;
    column-gap: .75rem;
  }
  min-width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  column-gap: 2rem;
  padding: 0 1.25rem;
`;

const SubMenu = styled.li`
  @media ${({ theme }) => theme.device.tablet } {
  }
  width: auto;
  text-align: center;
  white-space: nowrap;
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
  const [curUser, setCurUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myColor = useSelector(selectColor);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // console.log(user);
      if (user && user.emailVerified) {
        setCurUser(user);
        console.log(auth.currentUser);
        // dispatch(userLogIn(user));
      } else {
        setCurUser(null);
        // dispatch(userLogOut());
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const closeTooltip = () => {
    if (showTooltips) setShowTooltips(false);
  };

  const handleLogOut = () => {
    // dispatch(userLogOut());
    auth.signOut();
    dispatch(resetColor());
    closeTooltip();
  }

  return (
    <>
      <header>
        <Wrapper myColorHex={myColor}>
          <StyledLogo onClick={() => { navigate('/'); }}  className="cursor-pointer">
            <StyledLink className='logo' to='/'>우리 어디서 만나?</StyledLink>
            <StyledButton type="button" aria-label='show-tooltip-button' onClick={() => setShowTooltips(!showTooltips)}>
              <BsQuestionCircle />
            </StyledButton>
            {showTooltips && <Tooltip setShowTooltips={setShowTooltips}/>}
          </StyledLogo>
          <StyledUl>
            {curUser
              ? 
              <>
                <li>{curUser.auth.displayName ?? `User-${curUser.uid.slice(0, 6)}`}님 환영합니다.</li>
                <SubMenu>
                  <StyledNavLink to='/mypage' onClick={closeTooltip}>내 정보</StyledNavLink>
                </SubMenu>
                <SubMenu><StyledNavLink to='/' onClick={handleLogOut}>로그아웃</StyledNavLink></SubMenu>
              </>
              :
              <>
                <SubMenu><StyledNavLink to='/signin' onClick={closeTooltip}>로그인</StyledNavLink></SubMenu>
                <SubMenu><StyledNavLink to='/signup' onClick={closeTooltip}>회원가입</StyledNavLink></SubMenu>
              </>}
            <SubMenu><StyledNavLink to='/board/review' onClick={closeTooltip}>게시판</StyledNavLink></SubMenu>
          </StyledUl>
        </Wrapper>
      </header>
      <Outlet />
    </>
  );
}

export default Header;