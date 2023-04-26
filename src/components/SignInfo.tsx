import React from "react";

interface ISignInfo {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignInfo({ email, password, onChange }: ISignInfo) {
  return (
    <>
      <label className="label">이메일</label>
      <input
        data-testid="email-input"
        className="mb-4 input"
        name="email"
        value={email}
        placeholder={"example@email.com"}
        onChange={onChange}
      />
      <label className="label">패스워드</label>
      <input
        data-testid="password-input"
        className="mb-4 input"
        type="password"
        name="password"
        value={password}
        placeholder={"********************"}
        onChange={onChange}
      />
    </>
  );
}
