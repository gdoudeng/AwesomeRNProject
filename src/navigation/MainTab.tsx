import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "@src/pages/home";
import AddScreen from "@src/pages/add";
import MeScreen from "@src/pages/me";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0e77ba",
        tabBarInactiveTintColor: "#000000"
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "首页",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarLabel: "新项目",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "我的",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
