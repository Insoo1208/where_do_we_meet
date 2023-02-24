import SideMenu from "./SideMenu";
import Map from "./Map";
import { useState } from "react";

function Main () {
  const [myAdress, setMyAdress] = useState('');
  const [friendAdress, setFriendAdress] = useState('');

  return (
    <div>
      <SideMenu myAdress={myAdress} setMyAdress={setMyAdress} friendAdress={friendAdress} setFriendAdress={setFriendAdress} />
      <Map myAdress={myAdress} setMyAdress={setMyAdress} friendAdress={friendAdress} setFriendAdress={setFriendAdress} />
    </div>
  );
}

export default Main;