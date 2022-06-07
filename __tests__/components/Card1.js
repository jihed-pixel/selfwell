import React, { Component } from "react";
import { StyleSheet } from "react-native";

import Block from "./Block";

export default class Card1 extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
      <Block color={color || "#FFFFFF"} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 16 + 4,
    marginBottom: 16
  },
  shadow: {
    shadowColor: "#2F2F2F",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 13
  }
});