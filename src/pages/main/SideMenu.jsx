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
  width: 450px;
  height: calc(100vh - 75px);
  background-color: ${props => props.theme.mainLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: .75rem;
  padding: .5rem;
`;

const UserSearchWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.main};
  padding: 1rem 1.25rem;
  border-radius: .5rem;

  :nth-child(even) {
    background-color: ${props => props.theme.accent};
  }
`;

const MenuSlideButton = styled.div`
  width: 24px;
  height: 50px;
  background-color: ${props => props.theme.mainLight};
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
  
  .user-name {
    position: relative;
    width: 3.375rem;
    height: 3.375rem;
    border-radius: 50%;
    background-color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `;

const InputArea = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  border: .125rem solid ${props => props.theme.mainDark} ;
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

const StyledMdClose = styled(MdClose)`
  ${props => props.$foucused
      ? css`visibility: visible;`
      : css`visibility: hidden;`
  }
`;

const UserSearchLine = styled.div`
  width: 100%;
  height: 2px;
  margin: calc((150px - (54px + 48px) - 16px * 2) / 2) 0 ;
  background-color: ${props => props.theme.mainDark};
`; 

const UserFastSearch = styled.div`
  width: 100%;
  height: 48px;
  
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

const DetailListWrapper = styled.ul`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    width: 90%;
    background-color: ${props => props.theme.accent};
    padding: .5rem;
    border-radius: .5rem;

    h1 {
      font-size: 1.25rem;
      padding-bottom: .75rem;
      color: ${props => props.theme.accentDark};
    }

    h2 {
      padding-bottom: .5rem;
    }

    h3 {
      font-size: .8rem;
      font-weight: 300;
      color: ${props => props.theme.gray600};
    }

    h4 {
      padding-bottom: .5rem;
    }
  }
`;

const DropDown = styled.ul`
  position: absolute;
  top: 3.5rem;
  left: 1.5rem;
  z-index: 12;
  background-color: white;
  border: 2px solid ${props => props.theme.mainDark};
  border-radius: .5rem;
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    width: 100%;
    text-align: center;
    height: 100%;
    font-size: 1rem;
    padding: .5rem;
  }

  li.close {
    text-align: right;

    svg {
      font-size: 1rem;
    }
  }
`;

const FindButton = styled.button`
  width: 80%;
  height: 2.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.mainDark};
  border: none;
  border-radius: .5rem;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.accentDark};
  }
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
    if(selectedFriend) setFriendDetailAdress([...data.userInfo.find(user => user.id === selectedFriend).favorites]);
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

  return (
    <SideMenuWrapper menuOpened={menuOpened}>
      <SideMenuBg>
        <UserSearchWrapper>
          <UserSearchArea>
            <div style={{ cursor: "default" }} className="user-name">나</div>
            <InputArea>
              <MdSearch onClick={() => { handleDetailSearch(adressValue); setShowFriendDropdown(false); setShowMyDropdown(true); }} />
              <input
                value={adressValue}
                onChange={ e => setAdressValue(e.target.value)}
                onKeyUp={ e => {if(e.key === "Enter" && adressValue) { handleDetailSearch(adressValue); setShowFriendDropdown(false); setShowMyDropdown(true); }}}
                spellCheck="false"
                autoComplete="off"
                placeholder="주소를 입력해주세요."
              />
              <StyledMdClose $foucused={adressValue} onClick={() => setAdressValue('') }/>
              {showMyDropdown && 
                <DropDown>
                  <li className="cursor-pointer close" onClick={() => {setShowMyDropdown(false); setDetailAdress([]);}}><MdClose /></li>
                  {detailAdress.map((address, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer"
                      onClick={() => {
                        setAdressValue(detailAdress[idx]);
                        setDetailAdress([]);
                        setShowMyDropdown(false);
                      }}
                    >{address}</li>
                    )}
                </DropDown>
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
              { (user && selectedFriend) || '상대' }
              { showFirendListDropdown &&
                <DropDown>
                  <li className="cursor-pointer close" onClick={e => {e.stopPropagation(); setShowFirendListDropdown(false);}}><MdClose /></li>
                  <li className="cursor-pointer" onClick={e => {e.stopPropagation(); setSelectedFriend(''); setShowFirendListDropdown(false); }}>초기화</li>
                  {user && user.friends.map((friend, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedFriend(friend);
                        setShowFirendListDropdown(false);
                      }}>{friend}</li>
                  )}
                </DropDown>
              }
            </div>
            <InputArea>
              <MdSearch onClick={() => { handleDetailSearch(friendAdressValue); setShowMyDropdown(false); setShowFriendDropdown(true); }}/>
              <input
                value={friendAdressValue}
                onChange={ e => setFriendAdressValue(e.target.value) }
                onKeyUp={ e => {if(e.key === "Enter" && friendAdressValue) { handleDetailSearch(friendAdressValue); setShowMyDropdown(false); setShowFriendDropdown(true); };}}
                spellCheck="false"
                autoComplete="off"
                placeholder="주소를 입력해주세요."
              />
              {showFriendDropdown && 
                <DropDown>
                  <li className="cursor-pointer close" onClick={() => {setShowFriendDropdown(false); setDetailAdress([]);}}><MdClose /></li>
                  {detailAdress.map((address, idx) => 
                    <li key={idx} className="text-ellipsis cursor-pointer"
                      onClick={() => {
                        setFriendAdressValue(detailAdress[idx]);
                        setDetailAdress([]);
                        setShowFriendDropdown(false);
                      }}
                    >{address}</li>
                    )}
                </DropDown>
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
        <FindButton type="button" onClick={() => { setMyAdress(adressValue); setFriendAdress(friendAdressValue); }}> 약속장소 찾기 </FindButton>
        <DetailListWrapper user={user}>
          {searchData && 
            searchData.map((data, index) => (
              <li key={data.id} style={{ margin: '1rem' }}>
                <h4>{index + 1}.</h4>
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
          placeholder="검색할 키워드를 입력해주세요."
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
