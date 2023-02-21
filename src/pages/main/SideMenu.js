import styled from "styled-components";
const MenuBg = styled.div`
  // postion: absolute;
  // left: 0;
  // top: 50%;
  // bottom: 50%;
  width: 24%;
  height: calc(100vh - 75px);
  background-color: #d9d9d9;
  z-index: 10;
`;

const MenuSlideButton = styled.div`
  postion: absolute;
  left: 24%;
  top: 50%;
  bottom: 50%;
  width: 1.56%;
  height: 5vh;
  background-color: #d9d9d9;
  z-index: 10;

`;
const UserSearchEl = styled.div`
  width: 100%;
  heght: 
`;
function SideMenu () {
  
  return (
    <MenuBg>
        test
    </MenuBg>
  );
}

export default SideMenu;