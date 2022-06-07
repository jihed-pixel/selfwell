import React, { PureComponent } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Step from './Step';

import API from '../API';

import AsyncStorage from '@react-native-community/async-storage';



class Wizard extends PureComponent {
  static Step = Step;

  state = {
    index: 0,

    values: {
      ...this.props.initialValues,
    },
  };

  _nextStep = () => {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
      }));
    }
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
      }));
    }
  };

  _onChangeValue = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  _onSubmit = async () => {

    const idUser = await AsyncStorage.getItem("id");
    const glucose = this.state.values.glucose;
    const cReactiveProtein = this.state.values.cReactiveProtein;
    const dDimer = this.state.values.dDimer;
    const ip10 = this.state.values.ip10;
    const freeAlbumin = this.state.values.freeAlbumin;
    const leptin = this.state.values.leptin;
    const adiponectin = this.state.values.adiponectin;
    const igf1 = this.state.values.igf1;
    const resistin = this.state.values.resistin;
    const opn = this.state.values.opn;
    const orexinA = this.state.values.orexinA;
    const melatonin = this.state.values.melatonin;
    const creatinine = this.state.values.creatinine;
    const bloodAnalysisDate = this.state.values.bloodAnalysisDate;
    
    await API.NewBloodAnalysis( {idUser, glucose, cReactiveProtein, dDimer, ip10, freeAlbumin, leptin, adiponectin, 
                                 igf1, resistin, opn, orexinA, melatonin, creatinine,bloodAnalysisDate} ); 
        
    
  };

  render() {
    
    return (
      <View style={{ flex: 1}}>
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
              onChangeValue: this._onChangeValue,
              values: this.state.values,
              onSubmit: this._onSubmit,
            });
          }

          return null;
        })}
      </View>
    );
  }
}

export default Wizard;
