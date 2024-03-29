import { userDao } from "@src/dao/UserDao";
import { IIsLoginData, IUserInfoData } from "./types";
import { get, post } from "@src/utils/http";

export function getUserInfo() {
  return get<IUserInfoData>("/app/login/user/phone");
}

export function logout() {
  return post("/security/logout");
}

export function isLogin() {
  return userDao.getUserToken()
    .then(_ => {
      return post<IIsLoginData>("/app/login/isLogin");
    })
    .catch(_ => {
      return post<IIsLoginData>("/app/login/isLogin");
    });
}
