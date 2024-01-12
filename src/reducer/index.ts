import { combineReducers } from "redux";
import Login, { IUserState, initialUserState } from "./login";

export interface IState {
  LoginState: IUserState;
}

export const initialState: IState = {
  LoginState: initialUserState
};

export default combineReducers({
  LoginState: Login
});
