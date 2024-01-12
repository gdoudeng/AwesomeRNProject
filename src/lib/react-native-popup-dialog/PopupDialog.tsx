import React, { Component } from "react";
// Import library there,it will wrap everything registered by AppRegistry.registerComponent
// And add or remove other elements after the root component
import Dialog from "./components/Dialog";
import type { DialogProps } from "./type";
import RootSiblingsManager from "react-native-root-siblings";

type State = {
  visible: boolean
}

export default class PopupDialog extends Component<DialogProps, State> {
  constructor(props: DialogProps) {
    super(props);

    this.state = {
      visible: props.visible
    };
  }

  componentDidMount() {
    const { visible } = this.state;
    if (visible) {
      this.createDialog();
    }
  }

  componentDidUpdate(prevProps: DialogProps, prevState: State) {
    // update visible state and create dialog if visible is true
    if (prevState.visible !== this.props.visible) {
      // will use getDerivedStateFromProps in future, then don't need to setState
      // on componentDidUpdate
      // eslint-disable-next-line
      this.setState({ visible: this.props.visible });
      if (this.props.visible) {
        this.createDialog();
      }
    }
    // always re-render if sibling is not null
    if (this.sibling) {
      this.updateDialog();
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss();
    }
    this.destroyDialog();
  };

  sibling?: RootSiblingsManager;

  createDialog() {
    // Protect against setState happening asynchronously
    if (!this.sibling) {
      this.sibling = new RootSiblingsManager(this.renderDialog());
    }
  }

  updateDialog() {
    this.sibling?.update(this.renderDialog());
  }

  destroyDialog() {
    this.sibling?.destroy();
    this.sibling = undefined;
  }

  renderDialog() {
    return (
      <Dialog
        {...this.props}
        onDismiss={this.handleDismiss}
        visible={this.state.visible}
      />
    );
  }

  render() {
    return null;
  }
}
