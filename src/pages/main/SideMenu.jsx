import styled, { css } from "styled-components";
import { MdChevronLeft, MdChevronRight, MdSearch, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

import data from "../../data.json";

const { kakao } = window;

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
    position: relative;
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
  position: relative;
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
  height: 2px;
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

const DetailListWrapper = styled.div`
  max-height: ${props => props.user ? "calc(100vh - 304px - 24px - 75px)" : "calc(100vh - 172px - 24px - 75px)"};
  overflow-y: auto;
`;

function SideMenu (props) {
  const [menuOpened, setMenuOpened] = useState(true);

  const [adressValue, setAdressValue] = useState('');
  const [friendAdressValue, setFriendAdressValue] = useState('');
  const [contentsValue, setContentsValue] = useState('');

  const [showMyDropdown, setShowMyDropdown] = useState(false);
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);
  const [showFirendListDropdown, setShowFirendListDropdown] = useState(false);

  const [detailAdress, setDetailAdress] = useState([]);
  const [friendDetailAdress, setFriendDetailAdress] = useState([]);

  const [selectedFriend, setSelectedFriend] = useState('');

  useEffect(() => {
    if(selectedFriend) {
      setFriendDetailAdress([...data.userInfo.find(user => user.id === selectedFriend).favorites]);
    }
  }, [selectedFriend]);


  const user = useSelector(selectUser);
  const { setMyAdress, setFriendAdress, setContentsSearch, searchData } = props;

  const geocoder = new kakao.maps.services.Geocoder();

  const handleDetailSearch = async adress => {
    try {
      const detail = await geocoder.addressSearch(adress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setDetailAdress(result.reduce((acc, cur) => {
            acc.push(cur.address_name);
            return acc;
          }, []));
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setDetailAdress(['검색 결과가 없습니다.']);
        } else if (status === kakao.maps.services.Status.ERROR) {
          setDetailAdress(['검색 중 오류가 발생했습니다.']);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

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
            <div style={{ cursor: "default" }} className="user-name">나</div>
            <InputArea>
              <MdSearch onClick={() => { handleDetailSearch(adressValue); setShowMyDropdown(true); }} />
              <input
                value={adressValue}
                onChange={ e => setAdressValue(e.target.value)}
                onKeyUp={ e => {if(e.key === "Enter" && adressValue) { handleDetailSearch(adressValue); setShowMyDropdown(true); }}}
                spellCheck="false"
                autoComplete="off"
              />
              <StyledMdClose $foucused={adressValue} onClick={() => setAdressValue('') }/>
              {showMyDropdown && 
                <ul style={{
                  position: "absolute",
                  top: 55,
                  left: 30,
                  zIndex: 2,
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: 8,
                  width: 250,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <li className="cursor-pointer" style={{ width: "100%", padding: ".5rem 2rem 0 0", textAlign: "right" }}
                    onClick={() => {setShowMyDropdown(false); setDetailAdress([]);}}
                  >X</li>
                  {detailAdress.map((address, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer" style={{ padding: ".5rem" }}
                      onClick={() => {
                        setAdressValue(detailAdress[idx]);
                        setDetailAdress([]);
                        setShowMyDropdown(false);
                      }}
                    >{address}</li>
                    )}
                </ul>
              }
            </InputArea>
          </UserSearchArea>
          {user &&
            <>
              <UserSearchLine/>
              <UserFastSearch>
                <ul>
                  {user.favorites.map((fav, idx) => 
                    <li key={idx} onClick={() => setAdressValue(fav.adress)}>{fav.title}</li>
                  )}
                </ul>
              </UserFastSearch>
            </>
          }
        </UserSearchWrapper>

        <UserSearchWrapper>
          <UserSearchArea>
            <div className="user-name cursor-pointer" onClick={() => { if (user) setShowFirendListDropdown(true); }}>
              { selectedFriend || '상대' }
              { showFirendListDropdown &&
                <ul style={{
                  position: "absolute",
                  top: 65,
                  left: 0,
                  zIndex: 2,
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: 8,
                  width: 150,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <li className="cursor-pointer" style={{ width: "100%", padding: ".5rem 2rem 0 0", textAlign: "right" }}
                      onClick={e => {e.stopPropagation(); setShowFirendListDropdown(false);}}
                    >X</li>
                  {user && user.friends.map((friend, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer" style={{ padding: ".5rem" }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedFriend(friend);
                        setShowFirendListDropdown(false);
                      }}>{friend}
                    </li>
                  )}
                </ul>
              }
            </div>
            <InputArea>
              <MdSearch onClick={() => { handleDetailSearch(friendAdressValue); setShowFriendDropdown(true); }}/>
              <input
                value={friendAdressValue}
                onChange={ e => setFriendAdressValue(e.target.value) }
                onKeyUp={ e => {if(e.key === "Enter" && friendAdressValue) { handleDetailSearch(friendAdressValue); setShowFriendDropdown(true); };}}
                spellCheck="false"
                autoComplete="off"
              />
              {showFriendDropdown && 
                <ul style={{
                  position: "absolute",
                  top: 55,
                  left: 30,
                  zIndex: 2,
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: 8,
                  width: 250,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <li className="cursor-pointer" style={{ width: "100%", padding: ".5rem 2rem 0 0", textAlign: "right" }}
                    onClick={() => {setShowFriendDropdown(false); setDetailAdress([]);}}
                  >X</li>
                  {detailAdress.map((address, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer" style={{ padding: ".5rem" }}
                      onClick={() => {
                        setFriendAdressValue(detailAdress[idx]);
                        setDetailAdress([]);
                        setShowFriendDropdown(false);
                      }}
                    >{address}</li>
                    )}
                </ul>
              }
              <StyledMdClose $foucused={friendAdressValue} onClick={() => setFriendAdressValue('') }/>
            </InputArea>
          </UserSearchArea>
          {(user && selectedFriend )&&
            <>
              <UserSearchLine/>
              <UserFastSearch>
                <ul>
                  {friendDetailAdress.map((fav, idx) => 
                    <li key={idx} onClick={() => setFriendAdressValue(fav.adress)}>{fav.title}</li>
                  )}
                </ul>
              </UserFastSearch>
            </>
          }
        </UserSearchWrapper>
        <button type="button" style={{ width: "100%" }} onClick={() => { setMyAdress(adressValue); setFriendAdress(friendAdressValue); }}> 약속장소 찾기 </button>
        <DetailListWrapper user={user}>
          {searchData && 
            searchData.map((data, index) => (
              <li key={data.id} style={{ margin: '1rem' }}>
                <h4>{index + 1}</h4>
                <h1>{data.place_name}</h1>
                <h2>{data.road_address_name}</h2>
                <h2>{data.address_name}</h2>
                <h3>{data.phone}</h3>
              </li>
            ))
          }
        </DetailListWrapper>
      </SideMenuBg>
      {/* 콜백함수로 set함수값을 바꿔주는 이유는? 동기적으로 처리하기 위해 */}
      <MenuSlideButton onClick={() => {setMenuOpened(menuOpened => !menuOpened)}}>
        {menuOpened ? <MdChevronLeft /> : <MdChevronRight />}
      </MenuSlideButton>
      <div style={{
        position: "absolute",
        top: 16,
        left: "calc(100% + 1rem)",
        width: 350,
        height: 40,
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: 20,
        padding: ".125rem 15px",
        display: "flex",
        alignItems: "center",
        justifyContents: "center",
      }}>
        <MdSearch onClick={() => setContentsSearch(contentsValue)}/>
        <label htmlFor="content-search"/>
        <input id="content-search" style={{
          flex: 1,
          border: "none",
          outline: "none",
          paddingLeft: "1rem"
        }}
          placeholder="검색 할 키워드를 입력해주세요."
          value={contentsValue} onChange={e => setContentsValue(e.target.value)}
          onKeyUp={ e => {if(e.key === "Enter" && contentsValue) setContentsSearch(contentsValue);}}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </SideMenuWrapper>
  );
}

export default SideMenu;
