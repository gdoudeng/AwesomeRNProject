import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "@src/reducer";
import { Action } from "redux";
import Component, { IAppDispatchProps, IAppStateProps } from "./Main";

const mapStateToProps = (state: IState): IAppStateProps => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>): IAppDispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
