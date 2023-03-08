import styled, { css } from "styled-components";
import { MdChevronLeft, MdChevronRight, MdSearch, MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectColor } from "../../features/color/colorSlice";

import { TbLink } from "react-icons/tb";
import { SiKakaotalk } from "react-icons/si";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

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
      @media ${({ theme }) => theme.device.tablet } {
        transform: translateX(-300px);
      }
      transform: translateX(-400px);
    `
  }
  transition: transform .8s;
`;

const SideMenuBg = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    width: 300px;
  }
  width: 450px;
  height: calc(100vh - 75px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: .75rem;
  padding: .5rem 1.25rem;
  box-shadow: 0 4px 7px 2px ${props => props.theme.gray600};
`;

const UserSearchWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-radius: .5rem;
`;

const MenuSlideButton = styled.div`
  width: 24px;
  height: 50px;
  background-color: #fff;
  border-radius: 0 10px 10px 0;
  font-size: 1.5rem;
  cursor: pointer; 
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 0 7px -2px ${props => props.theme.gray600};
`;


const UserSearchArea = styled.div`
  display: flex;
  column-gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  .user-name {
    position: relative;
    width: 3.375rem;
    height: 3.375rem;
    border-radius: 50%;
    background-color: ${props => props.myColorHex.mainColor};    
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `;

const InputArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  border: 2px solid ${props => props.myColorHex.mainColor};
  border-radius: .5rem;
  padding: .25rem;

  svg {
    font-size: 1.6rem;
    cursor: pointer;
  }

  input {
    @media ${({ theme }) => theme.device.tablet } {
      width: 100%;

    }
    width: 240px;
    height: 40px;
    border: none;
    outline: none;
    letter-spacing: -1px;
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
  margin: .5rem 0 ;
  background-color: ${props => props.myColorHex.mainColor};
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
    background-color: ${props => props.myColorHex.mainLight};
    color: #fff;
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
    background-color: #fff;
    padding: 1.5rem;
    margin: 0 !important;

    h1 {
      font-size: 1.15rem;
      font-weight: 700;
      padding-bottom: .75rem;
      color: ${props => props.myColorHex.mainColor};
      letter-spacing: -0.06rem;
    }

    h2 {
      font-size: .9rem;
      padding-bottom: .5rem;
      color: ${props => props.theme.gray800};
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

  li + li {
    border-top: 1.5px solid ${props => props.theme.gray300};
  }
`;

const DropDown = styled.ul` 
  @media ${({ theme }) => theme.device.tablet } {
    width: 100%;
    left: 0;
  }
  position: absolute;
  top: 3.5rem;
  left: 1.5rem;
  z-index: 12;
  background-color: #fff;
  border: 2px solid ${props => props.myColorHex.mainColor};
  color: ${props => props.theme.gray700};
  border-radius: .5rem;
  min-width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem;

  li {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.92rem;
      padding: 0 1rem 1rem ;
    }
    width: 100%;
    height: 100%;
    font-size: 1rem;
    padding-left: 1.5rem;
    padding-bottom: 1rem;
  }

  li.close {
    text-align: right;

    svg {
      font-size: 1rem;
    }
  }
`;

const FindButton = styled.button`
  width: 100%;
  height: 2.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  background-color: ${props => props.myColorHex.mainColor};
  color: #fff;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
  letter-spacing: -1px;
`;

const ContentsSearch = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    width: 250px;
  }
  position: absolute;
  top: 16px;
  left: calc(100% + 1rem);
  width: 350px;
  height: 40px;
  background-color: #fff;
  border: 2px solid ${props => props.myColorHex.mainColor};
  border-radius: 20px;
  padding: .125rem 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${props => props.myColorHex.mainColor};
    font-weight: 700;
    font-size: 1.25rem;
  }
`;
const IconGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;

    svg {
      font-size: 1rem;
    }
    button {
      width: auto;
      height: auto;
      border: none;
      background: inherit;
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

  const { setMyAdress, setFriendAdress, setContentsSearch, searchData } = props;

  const data = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/insoo1208/where_do_we_meet_data/userInfo');
        if (response.status === 200) {
          data.current =  response.data;
        }
        else throw new Error(`api error: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(selectedFriend) setFriendDetailAdress([...data.current.find(user => user.id === selectedFriend).favorites]);
  }, [selectedFriend]);

  const user = useSelector(selectUser);
  const myColor = useSelector(selectColor);


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
          <UserSearchArea myColorHex={myColor}> 
            <div style={{ cursor: "default" }} className="user-name">나</div>
            <InputArea myColorHex={myColor}>
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
                <DropDown myColorHex={myColor}>
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
              <UserSearchLine myColorHex={myColor}/>
              <UserFastSearch myColorHex={myColor}>
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
          <UserSearchArea myColorHex={myColor}> 
            <div className="user-name cursor-pointer" onClick={() => { if (user) setShowFirendListDropdown(true); }}>
              { (user && selectedFriend) || '상대' }
              { showFirendListDropdown &&
                <DropDown myColorHex={myColor}>
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
            <InputArea myColorHex={myColor}>
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
                <DropDown myColorHex={myColor}>
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
              <UserSearchLine myColorHex={myColor}/>
              <UserFastSearch myColorHex={myColor}>
                <ul>
                  {friendDetailAdress.map((fav, idx) => 
                    <li key={idx} onClick={() => setFriendAdressValue(fav.adress)}>{fav.title}</li>
                  )}
                </ul>
              </UserFastSearch>
            </>
          }
        </UserSearchWrapper>
        <FindButton myColorHex={myColor} type="button" onClick={() => { setMyAdress(adressValue); setFriendAdress(friendAdressValue); }}> 약속장소 찾기 </FindButton>
        <DetailListWrapper myColorHex={myColor} user={user}>
          {searchData && 
            searchData.map((data, index) => (
              <li key={index} style={{ margin: '1rem' }}>
                <h1>{index + 1}. {data.place_name}</h1>
                <h2>{data.road_address_name}</h2>
                <h2>{data.address_name}</h2>
                <h3>{data.phone}</h3>
                <IconGroup>
                  <CopyToClipboard text={data.place_name} onCopy={() => alert("클립보드에 복사되었습니다.")}>
                    <button type="button"><TbLink /></button>
                  </CopyToClipboard>

                  <SiKakaotalk />
                </IconGroup>
              </li>
            ))
          }
        </DetailListWrapper>
      </SideMenuBg>
      <MenuSlideButton onClick={() => {setMenuOpened(menuOpened => !menuOpened)}}>
        {menuOpened ? <MdChevronLeft /> : <MdChevronRight />}
      </MenuSlideButton>
      <ContentsSearch myColorHex={myColor}>
        <MdSearch className="cursor-pointer" onClick={() => setContentsSearch(contentsValue)}/>
        <label htmlFor="content-search"/>
        <input id="content-search" style={{
          flex: 1,
          border: "none",
          outline: "none",
          paddingLeft: "1rem",
          letterSpacing: "-1px"
        }}
          placeholder="검색할 키워드를 입력해주세요."
          value={contentsValue} onChange={e => setContentsValue(e.target.value)}
          onKeyUp={ e => {if(e.key === "Enter" && contentsValue) setContentsSearch(contentsValue);}}
          spellCheck="false"
          autoComplete="off"
        />
      </ContentsSearch>
    </SideMenuWrapper>

  );
}

export default SideMenu;
