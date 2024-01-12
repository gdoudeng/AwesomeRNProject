import * as React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@src/navigation/GlobalStack";
import { StackNavigationProp } from "@react-navigation/stack";

interface IAppOwnProps extends IBaseProps {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
  route: RouteProp<RootStackParamList, "Login">
}

export interface IAppDispatchProps {
  onInitApp: () => void;
}

interface IAppOwnState {
}

export interface IAppStateProps {
  checkedPrivacy: boolean
  isInitUmeng: boolean
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
