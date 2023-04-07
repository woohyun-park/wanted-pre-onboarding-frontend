import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { isTokenValid } from "./apis/valid";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function checkLogin() {
      const path = location.pathname;
      if (isTokenValid()) {
        navigate("/todo");
      } else {
        if (path !== "/signin" && path !== "/signup") {
          navigate("/signin");
        }
      }
    }
    checkLogin();
  }, []);

  return <Outlet />;
}
