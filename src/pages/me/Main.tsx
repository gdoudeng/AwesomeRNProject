import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import { MainTabScreenProps } from "@src/navigation/types";

interface IAppOwnProps extends IBaseProps, MainTabScreenProps<"Me"> {
}

export interface IAppDispatchProps {
}

interface IAppOwnState {
}

export interface IAppStateProps {
}

class Me extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "Me";

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Me</Text>
      </SafeAreaView>
    );
  }
}

export default Me;
