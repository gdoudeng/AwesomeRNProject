import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "@src/reducer";
import { Action } from "redux";
import Component, { IAppDispatchProps, IAppStateProps } from "./Main";
import actionCreators from "@src/actions";

const mapStateToProps = (state: IState): IAppStateProps => ({
  checkedPrivacy: state.LoginState.checkedPrivacy,
  isInitUmeng: state.LoginState.isInitUmeng
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>): IAppDispatchProps => ({
  onInitApp: () => dispatch(actionCreators.onInitApp())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
