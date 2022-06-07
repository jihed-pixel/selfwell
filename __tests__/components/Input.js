import React, { PureComponent } from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

class Input extends PureComponent {
  _onChangeText = number => {
    this.props.onChangeValue(this.props.name, number);
  };

  render() {
    const { onChangeValue, name, ...rest } = this.props;
    return (
      <TextInput
        style={styles.root}
        {...rest}
        onChangeText={this._onChangeText}
      />
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    height: height * 0.05,
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    paddingLeft: 10,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: '#C3E0B9',
    
  },
});

export default Input;