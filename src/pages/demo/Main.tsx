import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";

interface IAppOwnProps extends IBaseProps {
}

export interface IAppDispatchProps {
}

interface IAppOwnState {
}

export interface IAppStateProps {
}

class Demo extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "Demo";

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>新项目</Text>
      </SafeAreaView>
    );
  }
}

export default Demo;
