import SignError from "../components/SignError";
import SignInfo from "../components/SignInfo";

import SignButton from "../components/SignButton";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

interface ISign {
  type: "signin" | "signup";
}

export default function Sign({ type }: ISign) {
  const { user, setUser, handleChange, handleSignin, handleSignup, isValid } =
    useUser();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={type === "signin" ? handleSignin : handleSignup}
      className="flex flex-col m-4"
    >
      <SignInfo
        email={user.email}
        password={user.password}
        onChange={handleChange}
      />
      <SignError error={user.error} />
      <SignButton
        txt={type === "signin" ? "로그인" : "회원가입"}
        isValid={isValid}
      />
      <hr className="my-4" />
      <SignButton
        txt={type === "signin" ? "회원가입" : "로그인"}
        isOutlined
        onClick={() => {
          setUser({ ...user, error: "" });
          navigate(type === "signin" ? "/signup" : "/signin");
        }}
      />
    </form>
  );
}
