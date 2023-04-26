import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { checkToken } from "./utils/valid";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function checkLogin() {
      const path = location.pathname;
      if (checkToken()) {
        navigate("/todo");
      } else {
        if (path !== "/signin" && path !== "/signup") {
          navigate("/signin");
        }
      }
    }
    checkLogin();
  }, [navigate, location.pathname]);

  return <Outlet />;
}
