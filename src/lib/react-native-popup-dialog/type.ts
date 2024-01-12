import * as React from "react";
import DialogButton from "./components/DialogButton";
import { StyleProp, TextStyle, ViewPropTypes, ViewStyle } from "react-native";
import Animation from "./animations/Animation";

export type DialogProps = {
  visible: boolean;
  children?: any;
  width?: number;
  height?: number;
  zIndex?: number,
  rounded?: boolean;
  hasOverlay?: boolean;
  overlayPointerEvents?: "auto" | "none";
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  dialogTitle?: React.ReactElement;
  dialogAnimation?: Animation;
  dialogStyle?: any;
  containerStyle?: any;
  animationDuration?: number;
  onTouchOutside?: () => void;
  onHardwareBackPress?: () => boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  footer?: React.ReactNode;
  useNativeDriver?: boolean;
  backgroundStyle?: StyleProp<ViewStyle>;
  actions?: any
}

export type DialogFooterActionList = Array<React.ReactElement<typeof DialogButton>>;

export type DialogFooterProps = {
  children: DialogFooterActionList;
  style?: StyleProp<ViewStyle>;
  bordered?: boolean;
}

export type DialogButtonProps = {
  text?: string;
  onPress: () => void;
  align?: "left" | "right" | "center";
  style?: any;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  activeOpacity?: number;
  bordered?: boolean;
}

export type DialogTitleProps = {
  title: any;
  style?: any;
  textStyle?: StyleProp<TextStyle>;
  align?: "left" | "right" | "center";
  hasTitleBar?: boolean;
}

export type DialogContentProps = {
  children: any,
  style?: StyleProp<ViewStyle>,
}

export type OverlayProps = {
  visible: boolean;
  opacity: number;
  onPress?: () => void;
  backgroundColor?: string;
  animationDuration?: number;
  // @ts-ignore
  pointerEvents?: ViewPropTypes.pointerEvents;
  useNativeDriver: boolean;
}
