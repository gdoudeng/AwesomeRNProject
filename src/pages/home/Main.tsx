import * as React from "react";
import { SafeAreaView, Text, Button, View } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import Toast from "react-native-simple-toast";
import { getUserInfo } from "@src/api/login";
import { MainTabScreenProps } from "@src/navigation/types";
import { dialogx, WaitDialogXType } from "@src/modules/dialogx";

interface IAppOwnProps extends IBaseProps, MainTabScreenProps<"Home"> {
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

  private handleCancelSavePress = () => {
    console.log("handleCancelSavePress");
  };

  private handleSavePress = () => {
    console.log("handleSavePress");
  };

  private handleLogout = () => {
    this.props.onLogout();
  };

  private testApi = () => {
    getUserInfo()
      .then((res) => {
        console.log("testApi ok", res);
      })
      .catch((err) => {
        console.log("testApi err", err);
      });
  };

  private showLoading = () => {
    dialogx.showLoading();
    setTimeout(() => { dialogx.dismissLoading(); }, 2000);
  };

  private showLoadingWithText = () => {
    dialogx.showLoading("加载中...");
    setTimeout(() => { dialogx.dismissLoading(); }, 2000);
  };

  private showSuccessTip = () => {
    dialogx.showTipDialog("Success!", WaitDialogXType.SUCCESS);
  };

  private showWarnTip = () => {
    dialogx.showTipDialog("Warning!", WaitDialogXType.WARNING);
  };

  private showErrorTip = () => {
    dialogx.showTipDialog("Error!", WaitDialogXType.ERROR);
  };

  private showMessageDialog = async () => {
    const action = await dialogx.showMessageDialog("这是正文内容");
    Toast.show(`${action}`, Toast.SHORT);
  };

  private showSelectDialog = async () => {
    const action = await dialogx.showSelectDialog("确定继续操作?");
    Toast.show(`${action}`, Toast.SHORT);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Home</Text>
        <View style={styles.item}>
          <Button title={"toast"} onPress={this.showToast} />
        </View>
        <View style={styles.item}>
          <Button title={"test api"} onPress={this.testApi} />
        </View>
        <View style={styles.item}>
          <Button title={"等待对话框"} onPress={this.showLoading} />
        </View>
        <View style={styles.item}>
          <Button title={"等待对话框带文字"} onPress={this.showLoadingWithText} />
        </View>
        <View style={styles.item}>
          <Button title={"完成"} onPress={this.showSuccessTip} />
        </View>
        <View style={styles.item}>
          <Button title={"警告"} onPress={this.showWarnTip} />
        </View>
        <View style={styles.item}>
          <Button title={"错误"} onPress={this.showErrorTip} />
        </View>
        <View style={styles.item}>
          <Button title={"消息对话框"} onPress={this.showMessageDialog} />
        </View>
        <View style={styles.item}>
          <Button title={"选择对话框"} onPress={this.showSelectDialog} />
        </View>
        <View style={styles.item}>
          <Button title={"退出登陆"} onPress={this.handleLogout} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
