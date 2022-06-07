import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Button, Dimensions, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import RNRnHeartRateMonitor from 'rn-heart-rate-monitor';

const AddCardiac = ({navigation}) => {
return(
    <View>
        <Text>aaaaaaaaaaa</Text>
        <TouchableOpacity
        onPress = { () => navigation.navigate("ConfirmAccount")}>
            <Text>click</Text>
            
        </TouchableOpacity>
         
    </View>
);
};

export default AddCardiac;