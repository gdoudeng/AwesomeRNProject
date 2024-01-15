import * as React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import { RootStackScreenProps } from "@src/navigation/types";

interface IAppOwnProps extends IBaseProps, RootStackScreenProps<"Login"> {
}

export interface IAppDispatchProps {
  onInitApp: () => void;
}

interface IAppOwnState {
}

export interface IAppStateProps {
  checkedPrivacy: boolean;
  isInitUmeng: boolean;
}

class Login extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "Login";

  private handleLogin = () => {
    this.props.onInitApp();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Login</Text>
        <Button title={"登陆"} onPress={this.handleLogin} />
      </SafeAreaView>
    );
  }
}

export default Login;
