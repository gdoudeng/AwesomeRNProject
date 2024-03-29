import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import BaseComponent, { IBaseProps } from "@components/BaseComponent";
import styles from "./styles";
import { RootStackScreenProps } from "@src/navigation/types";

interface IAppOwnProps extends IBaseProps, RootStackScreenProps<"About"> {
}

export interface IAppDispatchProps {
}

interface IAppOwnState {
}

export interface IAppStateProps {
}

class About extends BaseComponent<IAppOwnProps & IAppStateProps & IAppDispatchProps, IAppOwnState> {
  name = "About";

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>About</Text>
      </SafeAreaView>
    );
  }
}

export default About;
