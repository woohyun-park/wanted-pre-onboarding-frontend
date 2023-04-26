import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSign } from "../apis/sign";
import { checkUserInfo } from "../utils/valid";

export function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });
  const isValid = checkUserInfo(user.email, user.password);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await requestSign("signin", user.email, user.password);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      }
      setUser({ ...user, error: "" });
    } catch (e: any) {
      setUser({ ...user, error: e.response.data.message });
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await requestSign("signup", user.email, user.password);
      console.log(res);
      if (res.status === 201) navigate("/signin");
      setUser({ ...user, error: "" });
    } catch (e: any) {
      setUser({ ...user, error: e.response.data.message });
    }
  }

  return {
    user,
    isValid,
    setUser,
    handleChange,
    handleSignin,
    handleSignup,
  };
}
