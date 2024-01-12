import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
}

interface State {
}

class Item extends PureComponent<Props, State> {

  render() {
    return (
      <View style={styles.container}>
        <Text>组件放这里</Text>
      </View>
    );
  }
}

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
