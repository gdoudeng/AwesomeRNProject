import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";
import { Dialog, DialogButton, DialogContent, DialogFooter, DialogTitle } from "@src/lib/react-native-popup-dialog";

interface Props {
  title?: string,
  onOKPress?: () => void;
  onDismiss?: () => void;
  description?: string;
  okText?: string,
  destroyDialog?: () => void
}

interface State {
  visible: boolean;
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 16
  },
  okText: {
    color: "#000000BF"
  }
});

class InfoDialog extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: true
    };
  }

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
    const { description, title, okText } = this.props;

    const titleView =
      <DialogTitle
        title={title}
        hasTitleBar={false}
        align="left"
      />;

    const contentView =
      <DialogContent>
        <Text style={styles.contentText}>{description}</Text>
      </DialogContent>;

    const footerView =
      // @ts-ignore
      <DialogFooter>
        <DialogButton
          text={okText}
          onPress={this.handleOKPress}
          key="button-1"
        />
      </DialogFooter>;

    return (
      <Dialog
        onDismiss={this.hideDialog}
        width={0.85}
        visible={this.state.visible}
        rounded
        dialogTitle={titleView}
        footer={footerView}
        onHardwareBackPress={this._onHardwareBackPress}
      >
        {contentView}
      </Dialog>
    );
  }
}

export default InfoDialog;
