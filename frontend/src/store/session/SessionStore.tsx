import { v4 as uuid } from "uuid";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const cookieName = "session-id";

export const getCookie = () => {
  return cookies.get(cookieName);
};

export const setCookie = (value: string) => {
  cookies.set(cookieName, value, { path: "/" });
};

export const createSession = () => {
  if (getCookie() != null) {
    return;
  }
  const uuid_string = uuid();
  setCookie(uuid_string);
};
