import * as React from "react";
import { SafeAreaView, Text, Button, View } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import Toast from "react-native-simple-toast";

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
          <Button title={"退出登陆"} onPress={this.handleLogout} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
