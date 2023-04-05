import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import NotVer from "./NotVer";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);


  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setVerified(user.emailVerified ? true : false); 
    } else {
      navigate(-1);
    };
  }, []);

  return (
    <>
      {
        verified
        ? <UserInfo />
        : <NotVer />
      }
    </>
  );
}

export default MyPage;