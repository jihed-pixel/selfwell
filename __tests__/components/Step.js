import React, { PureComponent } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

class Step extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values,
        })}
        <View style={styles.buttonWrapper}>
          
          <TouchableOpacity style={styles.image}
               title="Prev"
               disabled={this.props.currentIndex === 0}
               onPress={this.props.prevStep}
              >
            <Image source={require('../assets/PreviousIcon.png')} style={styles.image} />
          </TouchableOpacity>
          {this.props.isLast ? (
            <TouchableOpacity style={styles.image1}
            title="Submit" onPress={this.props.onSubmit} 
            >
          <Image source={require('../assets/ok.png')} style={styles.image} />
        </TouchableOpacity>
            
          ) : (
            <TouchableOpacity style={styles.image1}
              title="Next" 
              onPress={this.props.nextStep}
              >
            <Image source={require('../assets/NextIcon.png')} style={styles.image} />
          </TouchableOpacity>
           
          )}
        </View>
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
   
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: width * 0.13,
    height: width * 0.13,
    marginLeft: width * 0.05,
    marginBottom: height * 0.04
  },
  image1: {
    width: width * 0.13,
    height: width * 0.13,
    marginRight: width * 0.15,
    marginBottom: height * 0.04
  },
});

export default Step;