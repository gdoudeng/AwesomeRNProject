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

class Add extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "Add";

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Add</Text>
      </SafeAreaView>
    );
  }
}

export default Add;
