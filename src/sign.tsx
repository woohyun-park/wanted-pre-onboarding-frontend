import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ISign {
  type: "signin" | "signup";
}

export default function Sign({ type }: ISign) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    localStorage.getItem("access_token") && navigate("/todo");
  }, []);

  function checkEmail(email: string) {
    return email.includes("@");
  }
  function checkPassword(password: string) {
    return password.length >= 8;
  }
  function isValid() {
    return checkEmail(userInfo.email) && checkPassword(userInfo.password);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInfo({ ...userInfo, [e.currentTarget.name]: e.currentTarget.value });
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      }
    } catch (e: any) {
      console.log(e.response);
      setUserInfo({ ...userInfo, error: e.response.data.message });
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        console.log(res);
        navigate("/signin");
      }
    } catch (e: any) {
      console.log(e.response);
      setUserInfo({ ...userInfo, error: e.response.data.message });
    }
  }

  return (
    <form
      onSubmit={type === "signin" ? handleSignin : handleSignup}
      className="flex flex-col m-4"
    >
      <label className="label">아이디</label>
      <input
        className="mb-4 input"
        data-testid="email-input"
        name="email"
        value={userInfo.email}
        placeholder={"example@email.com"}
        onChange={handleChange}
      />
      <label className="label">패스워드</label>
      <input
        className="mb-4 input"
        data-testid="password-input"
        type="password"
        name="password"
        value={userInfo.password}
        placeholder={"********************"}
        onChange={handleChange}
      />
      <p className="mb-8 text-xs italic text-red-500">{userInfo.error}</p>
      {type === "signin" ? (
        <>
          <button
            data-testid="signin-button"
            type="submit"
            className={isValid() ? "btn" : "btn-disabled"}
            disabled={!isValid()}
          >
            로그인
          </button>
          <hr className="my-4" />
          <button
            data-testid="signup-button"
            className="btn_outline"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </>
      ) : (
        <>
          <button
            data-testid="signup-button"
            type="submit"
            className={isValid() ? "btn" : "btn-disabled"}
            disabled={!isValid()}
          >
            회원가입
          </button>
          <hr className="my-4" />
          <button
            data-testid="signin-button"
            className="btn_outline"
            onClick={() => navigate("/signin")}
          >
            로그인
          </button>
        </>
      )}
    </form>
  );
}
