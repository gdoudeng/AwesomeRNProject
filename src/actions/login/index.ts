import { Action, Dispatch } from "redux";
import NavigationUtils from "@src/navigation/NavigationUtils";
import Toast from "react-native-simple-toast";
import { getUserInfo, logout } from "@src/api/login";
import Tips from "@components/tips";
import {
  IChangeCheckedPrivacyAction,
  IChangeUserInfoAction,
  LoginActionTypes
} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "@src/reducer";
import UserDao from "@src/dao/UserDao";
import HttpUtils from "@src/utils/HttpUtils";

/**
 * 初始化app
 * 目前逻辑不多 首先判断是否已经登陆 然后更新用户信息
 */
export function onInitApp() {
  return async (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch({
      type: LoginActionTypes.LOGIN_CHANGE_CHECKED_PRIVACY,
      payload: { checkedPrivacy: true }
    });
    NavigationUtils.reset("Main");
  };
}

/**
 * 更新用户信息
 * @param onSuccessCallback 回调函数 因为一般不会自己无端端获取用户信息 都是其他操作后需要更新用户信息的
 * @param onErrorCallback 失败回调
 */
export function onChangeUserInfo(onSuccessCallback?: () => void, onErrorCallback?: () => void) {
  return async (dispatch: Dispatch<IChangeUserInfoAction>) => {
    try {
      const response = await getUserInfo();
      dispatch({ type: LoginActionTypes.LOGIN_CHANGE_USER_INFO, payload: response.data });
      onSuccessCallback?.();
    } catch (error) {
      Toast.show("error", Toast.LONG);
      onErrorCallback?.();
    }
  };
}

/**
 * 是否已经勾选了同意隐私政策
 */
export function onChangeCheckedPrivacy() {
  return (dispatch: Dispatch<IChangeCheckedPrivacyAction>, getState: () => IState) => {
    dispatch({
      type: LoginActionTypes.LOGIN_CHANGE_CHECKED_PRIVACY,
      payload: { checkedPrivacy: !getState().LoginState.checkedPrivacy }
    });
  };
}

export function onLogout() {
  return async (dispatch: Dispatch<IChangeCheckedPrivacyAction>) => {
    const tips = Tips.showToast("", {
      mask: true,
      showLoading: true,
      showText: false,
      maskColor: "#00000099",
      duration: 10000
    });
    // 重置路由
    try {
      await logout();
      await UserDao.clearUserToken();
      HttpUtils.header = {
        "Content-Type": "application/json"
      };
      Tips.hide(tips);
      NavigationUtils.reset("Login");
    } catch (e) {
      Tips.hide(tips);
      HttpUtils.header = {
        "Content-Type": "application/json"
      };
      NavigationUtils.reset("Login");
    } finally {
      dispatch({
        type: LoginActionTypes.LOGIN_CHANGE_CHECKED_PRIVACY,
        payload: { checkedPrivacy: false }
      });
    }
  };
}


