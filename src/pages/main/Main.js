import SideMenu from "./SideMenu";
import Map from "./Map";
import { useEffect, useState } from "react";

function Main () {
  const [myAdress, setMyAdress] = useState('');
  const [friendAdress, setFriendAdress] = useState('');
  const [searchData, setSearchData] = useState([]);

  return (
    <div>
      <SideMenu setMyAdress={setMyAdress} setFriendAdress={setFriendAdress} searchData={searchData} />
      <Map myAdress={myAdress} friendAdress={friendAdress} setSearchData={setSearchData}/>
    </div>
  );
}

export default Main;