import React from "react";
import { getFocusedRouteNameFromRoute, NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from "@react-navigation/stack";
import MainTabNavigator from "./MainTab";
import LoginScreen from "@src/pages/login";
import { StyleSheet } from "react-native";
import AboutScreen from "@src/pages/about";
import { navigationRef } from "./RootNavigation";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#ffffff",
    elevation: 0
  },
  pr16: {
    paddingRight: 16
  },
  pl16: {
    paddingLeft: 15
  },
  textStyle: { fontSize: 18, color: "rgba(0,0,0,0.9)" }
});

// https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state
function getMainRouteOptions(route: RouteProp<RootStackParamList, "Main">): StackNavigationOptions {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return {
        headerTitle: "首页",
        headerShown: false
      };
    case "Add":
      return {
        ...getCommonScreenOptions("新项目")
      };
    case "Me":
      return getCommonScreenOptions("我的");
    default:
      return {};
  }
}

function getCommonScreenOptions(title: string): StackNavigationOptions {
  return {
    headerTitle: title,
    headerTitleAlign: "center",
    headerStyle: styles.headerStyle
  };
}

export default function GlobalStack(): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={"Login"}
                       screenOptions={{
                         gestureEnabled: true,
                         ...TransitionPresets.SlideFromRightIOS
                       }}>
        <Stack.Screen name="Main" component={MainTabNavigator}
                      options={({ route }) => getMainRouteOptions(route)} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTitle: () => null
          }} />
        <Stack.Screen name="About"
                      component={AboutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
