import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect } from "react";

function NotVer() {
  const navigate = useNavigate();

  return (
    <div>
      이메일 인증이 완료되지 않았습니다.
      {`${auth.currentUser.email}로 인증 확인 메일을 보내드렸습니다.`}
      <button type="button" onClick={() => { navigate(-1) }}>뒤로가기</button>
    </div>
  );
}

export default NotVer;