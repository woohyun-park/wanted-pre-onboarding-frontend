import http from "./http";

export async function requestSign(
  type: "signin" | "signup",
  email: string,
  password: string
) {
  return await http.post(`/auth/${type}`, {
    email,
    password,
  });
}
