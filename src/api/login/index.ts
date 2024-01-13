import { userDao } from "@src/dao/UserDao";
import { IIsLoginData, IUserInfoData } from "./types";
import { http } from "@src/utils/http";

export function getUserInfo() {
  return http.get<IUserInfoData>("/app/login/user/phone");
}

export function logout() {
  return http.post("/security/logout");
}

export function isLogin() {
  return userDao.getUserToken()
    .then(_ => {
      return http.post<IIsLoginData>("/app/login/isLogin");
    })
    .catch(_ => {
      return http.post<IIsLoginData>("/app/login/isLogin");
    });
}
