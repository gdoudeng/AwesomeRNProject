import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle
} from "@src/lib/react-native-popup-dialog";

interface Props {
  title?: string,
  onCancelPress?: () => void;
  onOKPress?: () => void;
  onDismiss?: () => void;
  description?: string;
  okText?: string,
  cancelText?: string,
  destroyDialog?: () => void,
  contentView?: Element,
  okTextColor?: string,
  cancelTextColor?: string
}

interface State {
  visible: boolean;
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 15
  },
  cancelText: {
    color: "#ff0000B3"
  },
  okText: {
    color: "#000000BF"
  }
});

class ConfirmDialog extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  handleCancelPress = () => {
    this.setState({ visible: false });
    if (this.props.onCancelPress) {
      this.props.onCancelPress();
    }
  };

  handleOKPress = () => {
    this.setState({ visible: false });
    if (this.props.onOKPress) {
      this.props.onOKPress();
    }
  };

  hideDialog = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
    if (this.props.destroyDialog) {
      this.props.destroyDialog();
    }
  };

  _onHardwareBackPress = () => {
    return true;
  };

  render() {
    const { description, cancelText, title, okText, contentView, okTextColor, cancelTextColor } = this.props;

    const titleView =
      <DialogTitle
        title={title}
        hasTitleBar={false}
        align="left"
      />;

    const myContentView = contentView ? contentView :
      <DialogContent>
        <Text style={styles.contentText}>{description}</Text>
      </DialogContent>;

    const footerView =
      <DialogFooter>
        <DialogButton
          text={cancelText}
          bordered
          onPress={this.handleCancelPress}
          // @ts-ignore
          textStyle={[styles.cancelText, cancelTextColor && { color: cancelTextColor }]}
          key="button-1"
        />
        <DialogButton
          text={okText}
          bordered
          onPress={this.handleOKPress}
          // @ts-ignore
          textStyle={[styles.okText, okTextColor && { color: okTextColor }]}
          key="button-2"
        />
      </DialogFooter>;

    return (
      <Dialog
        onDismiss={this.hideDialog}
        width={0.82}
        visible={this.state.visible}
        rounded
        dialogTitle={titleView}
        footer={footerView}
        onHardwareBackPress={this._onHardwareBackPress}
      >
        {myContentView}
      </Dialog>
    );
  }
}

export default ConfirmDialog;
