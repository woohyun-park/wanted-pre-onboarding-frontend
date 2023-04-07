import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignin, requestSignup } from "../apis/backend";

import { isUserValid } from "../apis/valid";

interface ISign {
  type: "signin" | "signup";
}

export default function Sign({ type }: ISign) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await requestSignin(user.email, user.password);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      }
    } catch (e: any) {
      setUser({ ...user, error: e.response.data.message });
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await requestSignup(user.email, user.password);
      if (res.status === 201) navigate("/signin");
    } catch (e: any) {
      setUser({ ...user, error: e.response.data.message });
    }
  }

  return (
    <form
      onSubmit={type === "signin" ? handleSignin : handleSignup}
      className="flex flex-col m-4"
    >
      <label className="label">이메일</label>
      <input
        data-testid="email-input"
        className="mb-4 input"
        name="email"
        value={user.email}
        placeholder={"example@email.com"}
        onChange={handleChange}
      />
      <label className="label">패스워드</label>
      <input
        data-testid="password-input"
        className="mb-4 input"
        type="password"
        name="password"
        value={user.password}
        placeholder={"********************"}
        onChange={handleChange}
      />
      <p className="mb-8 text-xs italic text-red-500">{user.error}</p>
      {type === "signin" ? (
        <>
          <button
            data-testid="signin-button"
            type="submit"
            className={
              isUserValid(user.email, user.password) ? "btn" : "btn-disabled"
            }
            disabled={!isUserValid(user.email, user.password)}
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
            className={
              isUserValid(user.email, user.password) ? "btn" : "btn-disabled"
            }
            disabled={!isUserValid(user.email, user.password)}
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
