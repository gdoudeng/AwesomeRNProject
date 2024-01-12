import { IUserInfoData } from "@src/api/login/types";

export enum LoginActionTypes {
  LOGIN_CHANGE_IS_INIT_UMENG = "LOGIN/LOGIN_CHANGE_IS_INIT_UMENG",
  LOGIN_CHANGE_CHECKED_PRIVACY = "LOGIN/LOGIN_CHANGE_CHECKED_PRIVACY",
  LOGIN_CHANGE_USER_INFO = "LOGIN/LOGIN_CHANGE_USER_INFO",
}

export interface IChangeIsInitUmengAction {
  type: LoginActionTypes.LOGIN_CHANGE_IS_INIT_UMENG
  payload: {
    isInitUmeng: boolean;
  }
}

export interface IChangeCheckedPrivacyAction {
  type: LoginActionTypes.LOGIN_CHANGE_CHECKED_PRIVACY
  payload: {
    checkedPrivacy: boolean;
  }
}

export interface IChangeUserInfoAction {
  type: LoginActionTypes.LOGIN_CHANGE_USER_INFO
  payload: IUserInfoData
}

export type UsersAction =
  | IChangeUserInfoAction
  | IChangeIsInitUmengAction
  | IChangeCheckedPrivacyAction
