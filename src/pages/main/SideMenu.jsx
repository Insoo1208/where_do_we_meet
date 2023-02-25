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

const SideMenuBg = styled.div`
  // postion: relative;
  // left: 0;
  // top: 0;
  width: 450px;
  height: calc(100vh - 75px);
  background-color: #d9d9d9;

  /* z-index: 10; */
`;

const UserSearchWrapper = styled.div`
  background-color: #c8b2d6;
  /* height: 152px; */
  padding: 1rem 1.25rem ;

  :nth-child(even) {
    background-color: #efcc88;
  }
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


const UserSearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  /* background-color: #c8c8c8; */

  
  .user-name {
    width: 3.375rem;
    height: 3.375rem;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 54px;
    font-size: 1rem;
    font-weight: 700;
  }

  `;

const InputArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  border: .125rem solid #c39cdb ;
  border-radius: .25rem;
  padding: .25rem;
  svg {
    font-size: 1.6rem;
    cursor: pointer;
  }

  input {
    width: 240px;
    height: 40px;
    border-radius: 4px;
    border: none;
    outline: none;
  }
`;

// const StyledMdSearch = styled(MdSearch)`
//   font-size: 2rem;
// `;

const StyledMdClose = styled(MdClose)`
  ${props => props.$foucused
      ? css`
        visibility: visible;
      `
      : css`
        visibility: hidden;
      `
  }
`;

const UserSearchLine = styled.div`
  width: 100%;
  height: .125rem;
  margin: calc((150px - (54px + 48px) - 16px * 2) / 2) 0 ;
  background-color: #d9d9d9;
`; 

const UserFastSearch = styled.div`
  width: 100%;
  height: 48px;
  /* background-color: yellow; */
  
  ul {
    height: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  li {
    border-radius: 1.5rem;
    background-color: #fff;
    padding: .875rem;
    cursor: pointer;
  }
  li + li {
    margin-left: 1rem;
  }
`;

function SideMenu (props) {
  const [menuOpened, setMenuOpened] = useState(true);
  const [adressValue, setAdressValue] = useState('');
  const [friendAdressValue, setFriendAdressValue] = useState('');
  const { myAddress, setMyAdress, friendAdress, setFriendAdress } = props;

  const handledInputFocused = () => {
    
  };
  

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
      <SideMenuBg>
        <UserSearchWrapper>
          <UserSearchArea>
            <div className="user-name">나</div>
            <InputArea>
              <MdSearch style={{ visibility: "hidden" }}/>
              <input
                value={adressValue}
                onChange={ e => setAdressValue(e.target.value)}
                onKeyUp={ e => {if(e.key === "Enter" && adressValue) setMyAdress(adressValue);}}
              />
              <StyledMdClose $foucused={adressValue} onClick={() => setAdressValue('') }/>
            </InputArea>
          </UserSearchArea>
          <UserSearchLine/> 
          <UserFastSearch>
            <ul>
              <li>집</li>
              <li>회사</li>
              <li>새로 추가하기</li>
            </ul>
          </UserFastSearch>
        </UserSearchWrapper>

        <UserSearchWrapper>
          <UserSearchArea>
            <div className="user-name">친구</div>
            <InputArea>
              <MdSearch style={{ visibility: "hidden" }}/>
              <input
                value={friendAdressValue}
                onChange={ e => setFriendAdressValue(e.target.value) }
                onKeyUp={ e => {if(e.key === "Enter" && friendAdressValue) return;}}
              />
              <StyledMdClose $foucused={friendAdressValue} onClick={() => setFriendAdressValue('') }/>
            </InputArea>
          </UserSearchArea>
          <UserSearchLine/> 
          <UserFastSearch>
            <ul>
              <li>집</li>
              <li>회사</li>
              <li>새로 추가하기</li>
            </ul>
          </UserFastSearch>
        </UserSearchWrapper>

        <button type="button" onClick={() => { setMyAdress(adressValue); setFriendAdress(friendAdressValue); }}> 약속장소 찾기 </button>
      </SideMenuBg>
      {/* 콜백함수로 set함수값을 바꿔주는 이유는? 동기적으로 처리하기 위해 */}
      <MenuSlideButton onClick={() => {setMenuOpened(menuOpened => !menuOpened)}}>
        {menuOpened ? <MdChevronLeft /> : <MdChevronRight />}
      </MenuSlideButton>
      
    </SideMenuWrapper>
  );
}

export default SideMenu;
