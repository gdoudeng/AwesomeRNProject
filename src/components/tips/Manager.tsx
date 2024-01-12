import React, { Component } from "react";
import RootSiblings from "react-native-root-siblings";
import ToastContainer, { durations, positions, ToastContainerProps } from "./toast/ToastContainer";
import { DialogOptions, TipsType } from "./types";
import ConfirmDialog from "@components/tips/dialog/ConfirmDialog";
import InfoDialog from "@components/tips/dialog/InfoDialog";

let lastInstance: RootSiblings;

let defaultOptions: ToastContainerProps = {};

interface DialogProps extends DialogOptions {
  type: TipsType;
}

class Manager extends Component<DialogProps & ToastContainerProps> {
  static displayName = "Tips";
  static positions = positions;
  static durations = durations;

  static setDefaultOptions = (options: ToastContainerProps) => {
    defaultOptions = options;
  };

  //convenience method
  static showLoading = (message: string, options: ToastContainerProps) => {
    let opts = Object.assign({ duration: 9007199254740992 }, options, { image: defaultOptions.imageLoading ? defaultOptions.imageLoading : require("./toast/images/loading.gif") });
    Manager.showToast(message, opts);
  };

  static showSuccess = (message: string, options: ToastContainerProps) => {
    let opts = Object.assign({}, options, { image: defaultOptions.imageSuccess ? defaultOptions.imageSuccess : require("./toast/images/success.png") });
    Manager.showToast(message, opts);
  };

  static showFail = (message: string, options: ToastContainerProps) => {
    let opts = Object.assign({}, options, { image: defaultOptions.imageFail ? defaultOptions.imageFail : require("./toast/images/error.png") });
    Manager.showToast(message, opts);
  };

  static showInfo = (message: string, options: ToastContainerProps) => {
    let opts = Object.assign({}, options, { image: defaultOptions.imageInfo ? defaultOptions.imageInfo : require("./toast/images/info.png") });
    Manager.showToast(message, opts);
  };

  static showWarn = (message: string, options: ToastContainerProps) => {
    let opts = Object.assign({}, options, { image: defaultOptions.imageWarn ? defaultOptions.imageWarn : require("./toast/images/warn.png") });
    Manager.showToast(message, opts);
  };

  static showToast = (message: string, options: ToastContainerProps): RootSiblings => {
    if (lastInstance != null) {
      lastInstance.destroy();
    }

    let rawDefaultOptions = {
      duration: durations.SHORT,
      position: positions.CENTER
    };

    let opts = Object.assign(rawDefaultOptions, defaultOptions, options);

    let onHidden = opts.onHidden;

    opts.onHidden = function() {
      toast && toast.destroy();
      onHidden && onHidden();
    };

    let toast = new RootSiblings(
      <ToastContainer
        {...opts}
        visible={true}
      >
        {message}
      </ToastContainer>);

    lastInstance = toast;

    return toast;
  };

  static hide = (toast?: RootSiblings) => {
    toast?.destroy();

    if (lastInstance != null) {
      lastInstance.destroy();
    }
  };

  static showDialog = (type: TipsType, options: DialogOptions) => {
    if (lastInstance != null) {
      lastInstance.destroy();
    }

    let defaultOptions = {
      title: "提示",
      okText: "确定",
      cancelText: "取消"
    };

    let opts = Object.assign(defaultOptions, options);

    opts.destroyDialog = function() {
      dialog && dialog.destroy();
    };

    let dialog: RootSiblings;

    switch (type) {
      case TipsType.confirm:
        dialog = new RootSiblings(
          <ConfirmDialog
            {...opts}
          />);
        break;
      case TipsType.info:
        dialog = new RootSiblings(
          <InfoDialog
            {...opts}
          />);
        break;
      default:
        dialog = new RootSiblings(
          <ConfirmDialog
            {...opts}
          />);
        break;
    }

    lastInstance = dialog;

    return dialog;
  };

  _instance?: RootSiblings;

  componentDidMount = () => {
    const { type } = this.props;
    if (type == TipsType.confirm) {
      this._instance = new RootSiblings(
        <ConfirmDialog
          {...this.props}
        />);
    } else if (type == TipsType.info) {
      this._instance = new RootSiblings(
        <InfoDialog
          {...this.props}
        />);
    } else if (type == TipsType.toast) {
      this._instance = new RootSiblings(
        <ToastContainer
          {...this.props}
          duration={0}
        />);
    }
  };

  componentWillReceiveProps = (nextProps: DialogProps & ToastContainerProps) => {
    if (nextProps.type == TipsType.confirm) {
      this._instance?.update(
        <ConfirmDialog
          {...nextProps}
        />);
    } else if (nextProps.type == TipsType.info) {
      this._instance?.update(
        <InfoDialog
          {...nextProps}
        />);
    } else if (nextProps.type == TipsType.toast) {
      this._instance?.update(
        <ToastContainer
          {...nextProps}
          duration={0}
        />);
    }
  };

  componentWillUnmount = () => {
    this._instance?.destroy();
  };

  render() {
    return null;
  }
}

export {
  RootSiblings as RootSiblingsManager
};

export default Manager;
