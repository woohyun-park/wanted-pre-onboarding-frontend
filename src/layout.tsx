import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { isTokenValid } from "./apis/valid";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
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
  }, [navigate, location.pathname]);

  return <>{children}</>;
}
