import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { isTokenValid } from "./apis/valid";

// 페이지 이동 없이 localStorage 값을 변화하였을 때에도 (즉, 강제로 로그인 정보를 삽입하거나 삭제했을 경우에도)
// 자동으로 todo 또는 signin 페이지로 리다이렉션하도록 checkLogin을 사용하여 1초마다 로그인 상태를 체크

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      function checkLogin() {
        isTokenValid() ? navigate("/todo") : navigate("/signin");
      }
      checkLogin();
      setInterval(checkLogin, 1000);
    }
    init();
  }, []);

  return <Outlet />;
}
