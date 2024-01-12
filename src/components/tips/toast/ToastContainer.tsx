import React, { Component } from "react";
import {
  Animated, ColorValue,
  Dimensions,
  Easing,
  Image,
  ImageStyle,
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";

const TOAST_MAX_WIDTH = 0.8;
const TOAST_ANIMATION_DURATION = 200;
const padding_TOP_BOTTOM = 10;
const MARGIN_IMAGE_TEXT = 10;
const DIMENSION = Dimensions.get("window");
let KEYBOARD_HEIGHT = 0;

Keyboard.addListener("keyboardDidChangeFrame", function({ endCoordinates }) {
  KEYBOARD_HEIGHT = DIMENSION.height - endCoordinates.screenY;
});

const WINDOW_WIDTH = DIMENSION.width;
const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0
};

const durations = {
  LONG: 3500,
  SHORT: 2000
};

let styles = StyleSheet.create({
  defaultStyle: {
    position: "absolute",
    width: WINDOW_WIDTH,
    justifyContent: "center",
    alignItems: "center"
  },
  maskStyle: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },

  containerStyle: {
    padding: padding_TOP_BOTTOM * 2,
    paddingTop: padding_TOP_BOTTOM,
    paddingBottom: padding_TOP_BOTTOM,
    backgroundColor: "#000",
    opacity: 0.85,
    borderRadius: 5,
    marginHorizontal: WINDOW_WIDTH * ((1 - TOAST_MAX_WIDTH) / 2),
    justifyContent: "center",
    alignItems: "center"
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginBottom: MARGIN_IMAGE_TEXT,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    lineHeight: 16
  }
});

export interface ToastContainerProps {
  containerStyle?: StyleProp<ViewStyle>
  duration?: number
  visible?: boolean,
  position?: number,
  animation?: boolean,
  shadow?: boolean,
  backgroundColor?: string,
  opacity?: number,
  shadowColor?: string,
  textColor?: string,
  textStyle?: StyleProp<TextStyle>,
  delay?: number,
  // keyboardAvoiding?: boolean, 已经写死是监听keyboardDidChangeFrame
  hideOnPress?: boolean,
  onHide?: Function,
  onHidden?: Function,
  onShow?: Function,
  onShown?: Function,
  // onPress?: Function
  showLoading?: boolean,
  showSuccess?: boolean,
  showFail?: boolean,
  image?: any,
  imageLoading?: any,
  imageSuccess?: any,
  imageFail?: any,
  imageWarn?: any,
  imageInfo?: any,
  imageStyle?: StyleProp<ImageStyle>,
  mask?: boolean,
  maskColor?: string,
  maskOpacity?: number,
  showText?: boolean,
  textFont?: number,
}

interface ToastContainerState {
  visible?: boolean,
  opacity: Animated.Value
}

class ToastContainer extends Component<ToastContainerProps, ToastContainerState> {
  static displayName = "ToastContainer";

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: true,
    showText: true,
    position: positions.CENTER,
    opacity: 0.86,
    maskOpacity: 0.4,
    delay: 0,
    hideOnPress: false
  };

  constructor(props: ToastContainerProps) {
    super(props);
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    }
  };

  UNSAFE_componentWillReceiveProps = (nextProps: ToastContainerProps) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this._showTimeout && clearTimeout(this._showTimeout);
        this._hideTimeout && clearTimeout(this._hideTimeout);
        this._showTimeout = setTimeout(() => this._show(), this.props.delay);
      } else {
        this._hide();
      }

      this.setState({
        visible: nextProps.visible
      });
    }
  };

  componentWillUnmount = () => {
    this._hide();
  };

  _animating: boolean = false;
  _root: any;
  _hideTimeout: NodeJS.Timeout | undefined;
  _showTimeout: NodeJS.Timeout | undefined;

  _show = () => {
    this._showTimeout && clearTimeout(this._showTimeout);
    if (!this._animating) {
      this._hideTimeout && clearTimeout(this._hideTimeout);
      this._animating = true;
      this._root.setNativeProps({
        pointerEvents: "auto"
      });
      this.props.onShow && this.props.onShow();
      Animated.timing(this.state.opacity, {
        // @ts-ignore
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true // <-- Add this
      }).start(({ finished }) => {
        if (finished) {
          this._animating = !finished;
          this.props.onShown && this.props.onShown();
          // @ts-ignore
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(() => this._hide(), this.props.duration);
          }
        }
      });
    }
  };

  _hide = () => {
    this._showTimeout && clearTimeout(this._showTimeout);
    this._hideTimeout && clearTimeout(this._hideTimeout);
    if (!this._animating) {
      this._root.setNativeProps({
        pointerEvents: "none"
      });
      this.props.onHide && this.props.onHide();
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true // <-- Add this
      }).start(({ finished }) => {
        if (finished) {
          this._animating = false;
          this.props.onHidden && this.props.onHidden();
        }
      });
    }
  };

  render() {
    let { props } = this;
    let offset = props.position;
    let position = offset ? {
      [offset < 0 ? "bottom" : "top"]: offset < 0 ? (KEYBOARD_HEIGHT - offset) : offset
    } : {
      top: 0,
      bottom: KEYBOARD_HEIGHT
    };

    return (this.state.visible || this._animating) ?
      <Mask mask={props.mask} maskColor={props.maskColor} maskOpacity={props.maskOpacity}>
        <View
          style={[
            styles.defaultStyle,
            position
          ]}
          pointerEvents="box-none"
        >
          <TouchableWithoutFeedback
            onPress={this.props.hideOnPress ? this._hide : undefined}
          >
            <Animated.View
              style={[
                styles.containerStyle,
                (!props.showText || !props.image && !props.showSuccess && !props.showFail && !props.showLoading) && {
                  paddingTop: padding_TOP_BOTTOM * 2,
                  paddingBottom: padding_TOP_BOTTOM * 2
                },
                props.containerStyle,
                // @ts-ignore
                props.backgroundColor && { backgroundColor: props.backgroundColor },
                {
                  opacity: this.state.opacity
                },
                props.shadow && styles.shadowStyle,
                // @ts-ignore
                props.shadowColor && { shadowColor: props.shadowColor }
              ]}
              pointerEvents="none"
              ref={(ele: any) => this._root = ele}
            >
              {
                props.image ?
                  <Image style={[styles.iconStyle, !props.showText && { marginBottom: 0 }, props.imageStyle]}
                         source={props.image} /> :
                  props.showSuccess ?
                    <Image style={[styles.iconStyle, !props.showText && { marginBottom: 0 }, props.imageStyle]}
                           source={require("./images/success.png")} /> :
                    props.showFail ? <Image
                        style={[styles.iconStyle, !props.showText && { marginBottom: 0 }, props.imageStyle]}
                        source={require("./images/error.png")} /> :
                      props.showLoading ? <Image
                        style={[styles.iconStyle, !props.showText && { marginBottom: 0 }, props.imageStyle]}
                        source={require("./images/loading.gif")} /> : null
              }
              {  // @ts-ignore
                props.showText ? <Text style={[
                  styles.textStyle,
                  props.textStyle,
                  props.textColor && { color: props.textColor },
                  props.textFont && { fontSize: props.textFont, lineHeight: props.textFont + 2 }

                ]}>
                  {this.props.children}
                </Text> : null
              }
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </Mask>
      : null;
  }
}

interface MaskProps {
  mask?: boolean,
  maskColor?: ColorValue,
  maskOpacity?: number
}

class Mask extends Component<MaskProps> {

  render() {
    let { mask, maskColor, maskOpacity } = this.props;
    let backgroundColor = maskColor;
    let opacity = maskOpacity;
    return mask ?
      <View style={styles.maskStyle}>
        <View
          style={[styles.maskStyle, { backgroundColor, opacity }]} />
        {this.props.children}
      </View> :
      this.props.children;

  }
}

export default ToastContainer;

export {
  positions,
  durations
};
