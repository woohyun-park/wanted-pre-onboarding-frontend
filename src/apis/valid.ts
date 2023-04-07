function checkEmail(email: string) {
  return email.includes("@");
}
function checkPassword(password: string) {
  return password.length >= 8;
}

export function isUserValid(email: string, password: string) {
  return checkEmail(email) && checkPassword(password);
}

export function isTokenValid() {
  return localStorage.getItem("access_token") ? true : false;
}
