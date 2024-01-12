import { produce } from "immer";
import { LoginActionTypes, UsersAction } from "@src/actions/login/types";

export const initialUserState: IUserState = {
  // 只有用户点击了同意隐私政策才开始收集信息 同时保证全局只初始化一次友盟
  isInitUmeng: false,
  checkedPrivacy: false
};

export interface IUserState {
  // 是否已经初始化过友盟
  isInitUmeng: boolean;
  // 勾选同意隐私政策
  checkedPrivacy: boolean;
}

export default function loginReducer(state: IUserState = initialUserState, action: UsersAction) {
  return produce(state, (draft: IUserState) => {
    switch (action.type) {
      case LoginActionTypes.LOGIN_CHANGE_IS_INIT_UMENG:
        draft.isInitUmeng = action.payload.isInitUmeng;
        break;
      case LoginActionTypes.LOGIN_CHANGE_CHECKED_PRIVACY:
        draft.checkedPrivacy = action.payload.checkedPrivacy;
        break;
    }
  });
}

