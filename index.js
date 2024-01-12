if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
/**
 * @format
 */

import "react-native-gesture-handler";
import * as React from "react";
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider as StoreProvider } from "react-redux";
import store from "@src/store";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Main() {
  return (
    <StoreProvider store={ store }>
      <RootSiblingParent>
        <App />
      </RootSiblingParent>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
