import { createNavigationContainerRef, NavigationAction, StackActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    Toast.show("导航还未挂载", Toast.LONG);
  }
}

export function push(name: string, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  } else {
    Toast.show("导航还未挂载", Toast.LONG);
  }
}

export function reset(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name }] });
  } else {
    Toast.show("导航还未挂载", Toast.LONG);
  }
}

export function replace(name: string, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  } else {
    Toast.show("导航还未挂载", Toast.LONG);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  } else {
    Toast.show("导航还未挂载", Toast.LONG);
  }
}

export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    navigationRef.dispatch(action);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    Toast.show("导航还未挂载", Toast.LONG);
  }
}
