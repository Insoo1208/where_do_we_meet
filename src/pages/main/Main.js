import SideMenu from "./SideMenu";
import Map from "./Map";
import { useEffect, useState } from "react";

function Main () {
  const [myAdress, setMyAdress] = useState('');
  const [friendAdress, setFriendAdress] = useState('');
  const [contentsSearch, setContentsSearch] = useState('');
  const [searchData, setSearchData] = useState([]);

  return (
    <div style={{ position: "relative" }}>
      <SideMenu setMyAdress={setMyAdress} setFriendAdress={setFriendAdress} setContentsSearch={setContentsSearch} searchData={searchData} />
      <Map myAdress={myAdress} friendAdress={friendAdress} contentsSearch={contentsSearch} setSearchData={setSearchData}/>
    </div>
  );
}

export default Main;