import React from "react";
import { NavigationAction, NavigationContainerRef, StackActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";

/**
 * 导航工具类
 * 使用：
 * import NavigationUtils from '@src/navigation/NavigationUtils';
 *
 * NavigationUtils.navigate('ChatScreen', { userName: 'Lucy' });
 */
export default class NavigationUtils {
  static navigationRef: NavigationContainerRef | null;

  static isReady: boolean = false;

  /**
   * 监听底栏点击事件 执行完自己的事件后给个回调函数用于跳转页面
   */
  static onTabPress?: (callback: () => void) => void;

  // https://reactnavigation.org/docs/navigating-without-navigation-prop
  static navigate(name: string, params?: any) {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      // Perform navigation if the app has mounted
      NavigationUtils.navigationRef.navigate(name, params);
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }

  static push(name: string, params?: object | undefined) {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      NavigationUtils.navigationRef.dispatch(StackActions.push(name, params));
    } else {
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }

  static reset(name: string) {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      NavigationUtils.navigationRef.reset({
        index: 0,
        routes: [{ name }]
      });
    } else {
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }

  static replace(name: string, params?: object | undefined) {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      NavigationUtils.navigationRef.dispatch(StackActions.replace(name, params));
    } else {
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }

  static goBack() {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      NavigationUtils.navigationRef.goBack();
    } else {
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }

  static dispatch(action: NavigationAction) {
    if (NavigationUtils.isReady && NavigationUtils.navigationRef) {
      // Perform navigation if the app has mounted
      NavigationUtils.navigationRef.dispatch(action);
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
      Toast.show("导航还未挂载", Toast.LONG);
    }
  }
}
