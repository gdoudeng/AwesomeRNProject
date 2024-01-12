import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "@src/reducer";
import { Action } from "redux";
import Component, { IAppDispatchProps, IAppStateProps } from "./Main";
import actionCreators from "@src/actions";

const mapStateToProps = (state: IState): IAppStateProps => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>): IAppDispatchProps => ({
  onLogout: () => dispatch(actionCreators.onLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
