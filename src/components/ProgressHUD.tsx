import React, { Component } from "react";
import Modal from "react-native-modal";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  onModalHideCallback?: () => void
}

interface State {
  isShow: boolean,
  hasText: boolean,
  text: string
}

class ProgressHud extends Component<Props, State> {
  private _onHideWithCallback: undefined | (() => void);
  private _isMounted = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: false,
      hasText: false,
      text: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  show(text: string) {
    if (!this._isMounted || this.state.isShow) {
      return;
    }
    let hasText = false;
    if (text !== undefined && text != null && text !== "") {
      hasText = true;
    }
    this.setState({
      isShow: true,
      text: text,
      hasText: hasText
    });

    // 每次显示前都清理掉前一次都callback 免得有bug
    this._onHideWithCallback = undefined;
  }

  hide(callback?: () => void) {
    if (!this._isMounted || !this.state.isShow) {
      return;
    }
    this.setState({ isShow: false });

    // 用于完全隐藏加载框后进行的操作
    // 因为iOS奇葩 不能同时显示两个Modal 一定要其中一个完全隐藏了 才能显示另一个
    if (callback && typeof callback === "function") {
      this._onHideWithCallback = callback;
    }
  }

  changeTipText(text: string) {
    if (!this._isMounted || !this.state.isShow) {
      return;
    }
    let hasText = false;
    if (text !== undefined && text != null && text !== "") {
      hasText = true;
    }
    if (!hasText) {
      return;
    }
    this.setState({
      text: text,
      hasText: hasText
    });
  }

  _onModalHideCallback = () => {
    if (this.props.onModalHideCallback) {
      this.props.onModalHideCallback();
    }

    if (this._onHideWithCallback) {
      this._onHideWithCallback();
    }
  };

  render() {
    const { isShow, hasText } = this.state;
    return (
      <Modal animationIn="fadeIn"
             animationOut="fadeOut"
             useNativeDriver
             supportedOrientations={["portrait", "landscape"]}
             isVisible={isShow}
             style={hudStyles.container}
             onModalHide={this._onModalHideCallback}
      >
        <View style={hudStyles.hud}>
          <Image
            style={[hudStyles.iconStyle, !hasText && { marginBottom: 0 }]}
            source={require("../components/tips/toast/images/loading.gif")} />
          {hasText ? <Text style={hudStyles.text}>{this.state.text}</Text> : null}
        </View>
      </Modal>
    );
  }
}

export default ProgressHud;

const hudStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  hud: {
    backgroundColor: "black",
    borderRadius: 10,
    opacity: 0.6,
    padding: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    lineHeight: 16
  },
  iconStyle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
