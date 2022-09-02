/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useEffect } from 'react';
import { View,LogBox, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { ModalPortal } from 'react-native-modals';

import { DrawerContent } from './screens/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';

import MainTabScreen from './screens/MainTabScreen';
import model from './screens/model/model';
import model2 from './screens/model/model2';
import UpdatePass from './screens/UpdatePass';
import ConfirmAccount from './screens/ConfirmAccount';
import ListDate from './screens/IotData/ListDate';
import ListDate1 from './screens/IotData/ListDate1';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import SelfWellScreen from './screens/SelfWellScreen';
import BmiScreen from './screens/Bmi/BmiScreen';
import BmiHistory from './screens/Bmi/BmiHistory';
import BmiCalculator from './screens/Bmi/BmiCalculator';
import EditBmi from './screens/Bmi/EditBmi';
import BmiChart from './screens/Bmi/BmiChart';
import BloodAnalysisTab from './screens/BloodAnalysis/BloodAnalysisTab';
import WelcomeScreen from './screens/BloodAnalysis/WelcomeScreen';
import BloodAnalysisHistory from './screens/BloodAnalysis/BloodAnalysisHistory';
import ChartBloodAnalysis from './screens/BloodAnalysis/ChartBloodAnalysis';
import BloodAnalysisForm from './screens/BloodAnalysis/BloodAnalysisForm'
import BloodAnalysisDetails from './screens/BloodAnalysis/BloodAnalysisDetails';
import BloodAnalysisEdit from './screens/BloodAnalysis/BloodAnalysisEdit';
import AddCardiac from './screens/Cardiac/AddCardiac';
import SearchFood from './screens/Nutrition/SearchFood';
import FoodChart from './screens/Nutrition/FoodChart';
import BreakfastFood from './screens/Nutrition/BreakfastFood';
import LunchFood from './screens/Nutrition/LunchFood';
import DinnerFood from './screens/Nutrition/DinnerFood';
import DailyFood from './screens/Nutrition/DailyFood';
import Puzzle from './screens/CognitiveTest/Puzzle';
import AttentionI from './screens/CognitiveTest/AttentionI';
import AttentionII from './screens/CognitiveTest/AttentionII';
import Calculus from './screens/CognitiveTest/Calculus';
import InhibI from './screens/CognitiveTest/InhibI';
import InhibII from './screens/CognitiveTest/InhibII';
import Opposite from './screens/CognitiveTest/Opposite';
import SequencesI from './screens/CognitiveTest/SequencesI';
import SequencesII from './screens/CognitiveTest/SequencesII';
import ShoppingTask from './screens/CognitiveTest/ShoppingTask';
import VisualMemoryI from './screens/CognitiveTest/VisualMemoryI';
import VisualMemoryII from './screens/CognitiveTest/VisualMemoryII';
import WordCateg from './screens/CognitiveTest/WordCateg';
import WrittenComp from './screens/CognitiveTest/WrittenComp';
import VisualI from './screens/CognitiveTest/VisualMemoryI';
import VisualII from './screens/CognitiveTest/VisualMemoryII';
import TimeSequence from './screens/CognitiveTest/TimeSequence';
import Logical from './screens/CognitiveTest/Logical';
import Memory from './screens/CognitiveTest/Memory';
import Score from './screens/CognitiveTest/Score';
import PedometerCounter from './screens/Pedometer/PedometerCounter';
import API from './API';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import 'localstorage-polyfill'; 

const Drawer = createDrawerNavigator();
const SelfWellStack = createStackNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 
  LogBox.ignoreAllLogs()
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    idUser: null,
    token: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          token:  AsyncStorage.getItem("user"),
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          idUser:  AsyncStorage.getItem("user"),
          token:  AsyncStorage.getItem("user"),
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          idUser: null,
          token: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          idUser: AsyncStorage.getItem("user"),
          token: AsyncStorage.getItem("user"),
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
    
       const token = await AsyncStorage.getItem("user");
       const idUser = await AsyncStorage.getItem("id");
      
      
      dispatch({ type: 'LOGIN', token: token, id: idUser});
      const tk = await AsyncStorage.getItem("user");
      var idd= await AsyncStorage.getItem("user");
      },
    signOut: async() => {
      // settoken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem("user");
      } catch(e) {
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async(NewUser) => {
      const token = String(NewUser.token);
      const idUser = String(NewUser.idUser);
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('idUser', idUser);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'REGISTER', id: idUser, token: token });
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let token;
      token = "";
      try {
        token = await AsyncStorage.getItem("user");
    
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: token });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  const SelfWellStackScreen = ({navigation}) => (
    <SelfWellStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <SelfWellStack.Screen name="SelfWellScreen" component={SelfWellScreen} options={{
            title:'Self well',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </SelfWellStack.Navigator>
    );
  return (
    <PaperProvider theme={theme}>
    <ModalPortal />
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.idUser !== null ? (
        <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
           <Drawer.Screen name="model" component={model} />
           <Drawer.Screen name="model2" component={model2} />
           <Drawer.Screen name="ListDate" component={ListDate} />
           <Drawer.Screen name="ListDate1" component={ListDate1} />
           <Drawer.Screen name="SplashScreen" component={SplashScreen} />
           <Drawer.Screen name="ConfirmAccount" component={ConfirmAccount} />
          <Drawer.Screen name="SignInScreen" component={SignInScreen} />
          <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
          <Drawer.Screen name="UpdatePass" component={UpdatePass} />
          <Drawer.Screen name="BmiScreen" component={BmiScreen} />
          <Drawer.Screen name="BmiHistory" component={BmiHistory} />
          <Drawer.Screen name="BloodAnalysisTab" component={BloodAnalysisTab} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Drawer.Screen name="SelfWellScreen" component={SelfWellStackScreen} />
          <Drawer.Screen name="BmiCalculator" component={BmiCalculator} />
          <Drawer.Screen name="EditBmi" component={EditBmi} />
          <Drawer.Screen name="BmiChart" component={BmiChart} />
          <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Drawer.Screen name="BloodAnalysisHistory" component={BloodAnalysisHistory} />
          <Drawer.Screen name="ChartBloodAnalysis" component={ChartBloodAnalysis} />
          <Drawer.Screen name="BloodAnalysisForm" component={BloodAnalysisForm} />
          <Drawer.Screen name="BloodAnalysisDetails" component={BloodAnalysisDetails} />
          <Drawer.Screen name="BloodAnalysisEdit" component={BloodAnalysisEdit} />
          <Drawer.Screen name="AddCardiac" component={AddCardiac} />
          <Drawer.Screen name="SearchFood" component={SearchFood} />
          <Drawer.Screen name="FoodChart" component={FoodChart} />
          <Drawer.Screen name="BreakfastFood" component={BreakfastFood} />
          <Drawer.Screen name="LunchFood" component={LunchFood} />
          <Drawer.Screen name="DinnerFood" component={DinnerFood} />
          <Drawer.Screen name="DailyFood" component={DailyFood} />
          <Drawer.Screen name="Puzzle" component={Puzzle} />
          <Drawer.Screen name="AttentionI" component={AttentionI} />
          <Drawer.Screen name="AttentionII" component={AttentionII} />
          <Drawer.Screen name="Calculus" component={Calculus} />
          <Drawer.Screen name="InhibI" component={InhibI} />
          <Drawer.Screen name="InhibII" component={InhibII} />
          <Drawer.Screen name="Opposite" component={Opposite} />
          <Drawer.Screen name="SequencesI" component={SequencesI} />
          <Drawer.Screen name="SequencesII" component={SequencesII} />
          <Drawer.Screen name="ShoppingTask" component={ShoppingTask} />
          <Drawer.Screen name="VisualMemoryI" component={VisualMemoryI} />
          <Drawer.Screen name="VisualMemoryII" component={VisualMemoryII} />
          <Drawer.Screen name="WordCateg" component={WordCateg} />
          <Drawer.Screen name="WrittenComp" component={WrittenComp} />
          <Drawer.Screen name="VisualI" component={VisualI} />
          <Drawer.Screen name="VisualII" component={VisualII} />
          <Drawer.Screen name="TimeSequence" component={TimeSequence} />
          <Drawer.Screen name="Logical" component={Logical} />
          <Drawer.Screen name="Memory" component={Memory} />
          <Drawer.Screen name="Score" component={Score} />
          <Drawer.Screen name="PedometerCounter" component={PedometerCounter} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
