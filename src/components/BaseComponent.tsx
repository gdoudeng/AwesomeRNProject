import React, { PureComponent } from "react";

export interface IBaseProps {
  name: string
}

export default class BaseComponent<P = {}, S = {}, SS = any> extends PureComponent<P & IBaseProps, S, SS> {

  name = "BaseComponent";

  componentDidMount() {
    this._componentDidMount();
  }

  componentWillUnmount() {
    this._componentWillUnmount();
  }

  /**
   * BaseComponent的componentDidMount
   * 记住一定要用箭头函数
   */
  _componentDidMount = () => {
  };

  /**
   * BaseComponent的componentWillUnmount
   * 记住一定要用箭头函数
   */
  _componentWillUnmount = () => {
  };
}
