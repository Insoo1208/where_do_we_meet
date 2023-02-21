import styled, { css } from "styled-components";
import { MdChevronLeft, MdChevronRight, MdSearch, MdClose } from "react-icons/md";
import { useState } from "react";
const SideMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  ${props => props.menuOpened
    ? css`
      transform: translateX(0px);
    `
    : css`
      transform: translateX(-400px);
    `
  }
  transition: transform .8s;
`;
const MenuBg = styled.div`
  // postion: relative;
  // left: 0;
  // top: 0;
  width: 450px;
  height: calc(100vh - 75px);
  background-color: #d9d9d9;
  /* z-index: 10; */
`;

const MenuSlideButton = styled.div`
  // postion: absolute;
  // right: -20px;
  // top: 50%;
  // bottom: 50%;
  // margin: auto;
  width: 24px;
  height: 50px;
  background-color: #d9d9d9;
  /* z-index: 10; */
  border-radius: 0 10px 10px 0;
  font-size: 1.5rem;
  cursor: pointer; 
  display: flex;
  justify-content: center;
  align-items: center;
`;


const UserSearchEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 445px;
  height: 148px;
  background-color: #c8b2d6;
  padding: 30px;
  
  .userName {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 54px;
  }

  input {
    width: 280px;
    height: 46px;
    border-radius: 4px;
  }
`;
function SideMenu () {
  const [menuOpened, setMenuOpened] = useState(true);


    // <>
    //   {/* <MiniBar /> */}
    //   <Detail menuOpened={menuOpened}>
    //     <MenuButton onClick={() => {setMenuOpened(menuOpened => !menuOpened)}}>
    //       {menuOpened ? <MdChevronLeft /> : <MdChevronRight />}
    //     </MenuButton>
    //   </Detail>
    // </>
  return (
    <SideMenuWrapper menuOpened={menuOpened}>
      <MenuBg>
        <UserSearchEl>
          <div className="userName">나</div>
          <div className="searchEl">
            <MdSearch />
            <input />
            <MdClose />
          </div>
        </UserSearchEl>
      </MenuBg>
      {/* 콜백함수로 set함수값을 바꿔주는 이유는? 동기적으로 처리하기 위해 */}
      <MenuSlideButton onClick={() => {setMenuOpened(menuOpened => !menuOpened)}}>
        {menuOpened ? <MdChevronLeft /> : <MdChevronRight />}
      </MenuSlideButton>
    </SideMenuWrapper>
  );
}

export default SideMenu;
