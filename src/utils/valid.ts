function checkEmail(email: string) {
  return email.includes("@");
}
function checkPassword(password: string) {
  return password.length >= 8;
}

export function checkUserInfo(email: string, password: string) {
  return checkEmail(email) && checkPassword(password);
}

export function checkToken() {
  return localStorage.getItem("access_token") ? true : false;
}
