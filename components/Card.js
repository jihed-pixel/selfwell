import React, { Component } from "react";
import { StyleSheet } from "react-native";

import Block from "./Block";

export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
      <Block style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 25,
    marginBottom: 16,
  }
});