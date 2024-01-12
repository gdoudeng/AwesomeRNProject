import * as React from "react";
import { SafeAreaView, Text, Button, View } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import Toast from "react-native-simple-toast";
import Tips, { TipsType } from "@components/tips";

interface IAppOwnProps extends IBaseProps {
}

export interface IAppDispatchProps {
  onLogout: () => void;
}

interface IAppOwnState {
}

export interface IAppStateProps {
}

class Home extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "Home";


  private showToast = () => {
    Toast.show("微信未安装", Toast.LONG);
  };

  private showLoading = () => {
    const tips = Tips.showToast("", {
      mask: true,
      showLoading: true,
      showText: false,
      maskColor: "#00000099"
    });
    setTimeout(() => {
      Tips.hide(tips);
    }, 2000);
  };

  private showDialog = () => {
    Tips.showDialog(TipsType.confirm, {
      onCancelPress: this.handleCancelSavePress,
      onOKPress: this.handleSavePress,
      description: "是否修改保存？",
      okText: "保存",
      cancelText: "不保存"
    });
  };

  private handleCancelSavePress = () => {
    console.log("handleCancelSavePress");
  };

  private handleSavePress = () => {
    console.log("handleSavePress");
  };

  private handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Home</Text>
        <View style={styles.item}>
          <Button title={"toast"} onPress={this.showToast} />
        </View>
        <View style={styles.item}>
          <Button title={"loading"} onPress={this.showLoading} />
        </View>
        <View style={styles.item}>
          <Button title={"dialog"} onPress={this.showDialog} />
        </View>
        <View style={styles.item}>
          <Button title={"退出登陆"} onPress={this.handleLogout} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
