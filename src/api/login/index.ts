import HttpUtils from "@src/utils/HttpUtils";
import UserDao from "@src/dao/UserDao";
import { IIsLoginData, IUserInfoData } from "./types";

export function getUserInfo() {
  return HttpUtils.getRequest<IUserInfoData>("/app/login/user/phone");
}

export function logout() {
  return HttpUtils.postRequest("/security/logout");
}

export function isLogin() {
  return UserDao.getUserToken()
    .then(token => {
      if (token) {
        HttpUtils.header = {
          "Content-Type": "application/json",
          "X-FM-Token": token
        };
      }
      return HttpUtils.postRequest<IIsLoginData>("/app/login/isLogin");
    })
    .catch(_ => {
      return HttpUtils.postRequest<IIsLoginData>("/app/login/isLogin");
    });
}
