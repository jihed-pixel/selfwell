import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Button, Dimensions, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Card1 from '../../components/Card1';
import Block from '../../components/Block';
import axios from 'axios';

import Api from '../../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../API';


const { width, height } = Dimensions.get("window");
var back = '<';
var date = '';
const moment = require('moment');
const today = moment();
var date1 = today.format('YYYY-MM-DD');

const BloodAnalysisHistory = ({navigation}) => {
  


    const [bloodanalysis, setBloodanalysis] = useState([{
      glucose: 0,
      isValidGlucose: true,
      cReactiveProtein: 0,
      isValidcReactiveProtein: true,
      dDimer: 0,
      isValiddDimer: true,
      ip10: 0,
      isValidip10: true,
      freeAlbumin: 0,
      isValidfreeAlbumin: true,
      leptin: 0,
      isValidleptin: true,
      adiponectin: 0,
      isValidadiponectin: true,
      igf1: 0,
      isValidigf1: true,
      resistin: 0,
      isValidresistin: true,
      opn: 0,
      isValidopn: true,
      orexinA: 0,
      isValidorexinA: true,
      melatonin: 0,
      isValidmelatonin: true,
      creatinine: 0,
      isValidcreatinine: true,
      bloodAnalysisDate: '',
    }]);  
    const initialAnalyseState = {
      id: "",
      food: [],
      calories: "0",
      fat: "0",
      protein: "0",
      calcium: "0",
      saturatedFats: "0",
      fiber: "0"
    };
    const [datePicker, setDatePicker] = useState(false); 
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const [todayTest, setTodayTest] = useState([]);
    const [weekTest, setWeekTest] = useState([]);
    const [monthTest, setMonthTest] = useState([]);
    const [currentBloodanalysis, setCurrentBloodanalysis] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [value, setValue] = useState('Today');
    const [items, setItems] = useState([ {label: 'Today', value: 'Today'}, {label: 'This month', value: 'Thismonth'},{label: 'All', value: 'All'} ]);
    let controller;
    const [breakfastItems, setBreakfastItems] = useState(initialAnalyseState);
    const [lunchItems, setLunchItems] = useState(initialAnalyseState);
    const [dinnerItems, setDinnerItems] = useState(initialAnalyseState); 
    const [bmis, setBmis] = useState([]); 
    const [data0, setData0] = useState();
    const [data2, setData2] = useState();
    const [data1, setData1] = useState();
    const [cognitive, setCognitive] = useState();
    var idUser;

    const getBreakfast = async (date) => {
      const idUser = await AsyncStorage.getItem("id");
      API.showBreakfast(idUser, date)
      .then(response => {
        setBreakfastItems (response.data);
      })
      .catch(e => {
        console.log(e);
      });
    };
    const getLunch = async (date) => {
      const idUser = await AsyncStorage.getItem("id");
      API.showLunch(idUser, date)
      .then(response => {
        setLunchItems (response.data);
      })
      .catch(e => {
        console.log(e);
      });
    };
    const getDinner = async (date) => {
      idUser = await AsyncStorage.getItem("id");
     API.showDinner(idUser, date)
     .then(response => {
       setDinnerItems (response.data);
     })
     .catch(e => {
       console.log(e);
     });
   };
   useEffect(() => {
    const d = new Date();
    getBreakfast(d);
    getLunch(d);
    getDinner(d);
   }, []);
   useEffect(() => {
    getBreakfast(date1);
    getLunch(date1);
    getDinner(date1);
    localStorage.clear("value");
   }, [date1]);
    
    useEffect(() => {
        let temp= [];
        for (var i = 0; i < bloodanalysis.length; i++) {
          if ((bloodanalysis[i].bloodAnalysisDate).substring(0, 10) == date1.substring(0,10) ) {
            temp.push(bloodanalysis[i]);
            setTodayTest(temp);
            

          }
        
        }
        setTodayTest(temp);
        console.log(date1);
      }, [date1]);

    const retrieveBloodanalysis = async () => {
      idUser = await AsyncStorage.getItem("id");
              Api.getBloodAnalysis(idUser)
        .then(response => {
          setBloodanalysis(response.data)
        
        })
        .catch(e => {
        console.log(e.message);
      });
    };





    function showDatePicker() {
      setDatePicker(true);
    };
   
    function showTimePicker() {
      setTimePicker(true);
    };
    function onDateSelected(event, value) {
      setDate(value);
console.log(value);
      //date1 = String(date.toISOString().slice(0, 10)) ;
      date1 = moment(value).format('YYYY-MM-DD');
      retrieveBloodanalysis();
      setDatePicker(false);
    };
   
    function onTimeSelected(event, value) {
      setTime(value);
      setTimePicker(false);
    };


    const exportBilan = async () => {
      const idUser = await AsyncStorage.getItem("id");
      Api.exportBloodAnalysisByIdUser(idUser)
      .then(response => {
      
      })
      .catch(e => {
      console.log(e.message);
    });
  };

    const refreshList = () => {
        retrieveBloodanalysis();
        setCurrentBloodanalysis(null);
        setCurrentIndex(-1);
    };

    const setActiveBloodAnalysis = (blood, index,idBloodAnalyse) => {
        setCurrentBloodanalysis(blood);
        setCurrentIndex(index);
        navigation.navigate("BloodAnalysisDetails", {idBloodAnalyse})
        
    };

    const update = (idBloodAnalyse) => {
      navigation.navigate("BloodAnalysisEdit", {idBloodAnalyse})
    }

    const removeBloodAnalysis = (id) => {
        API.DeleteBloodAnalysis(id)
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      };

    const showAlertDelete = (idItem) => {
        Alert.alert(
            'Confirmation',
            'Sure you want to delete this item ?',
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => removeBloodAnalysis(idItem)
                },
            ],
        )
    }
    
  useEffect(() => {
    retrieveBmi()}, [idUser]);
  useEffect(() => {
    let temp1=0 ;
    let temp2=0 ;
    let temp3=0 ;
    for (var i = 0; i < bmis.length; i++) {
      if ((bmis[i].bmiDate).substring(0, 10) == date1.substring(0,10) ) {
      temp1=bmis[i].bmi;
      temp2=bmis[i].height;
      temp3=bmis[i].weight;
      setData0(temp3);
      setData1(temp1);
      setData2(temp2);
        }
      }
      setData0(temp3);
      setData1(temp1);
      setData2(temp2);
  },[bmis,date1]);
   const retrieveBmi = async () => {

    idUser = await AsyncStorage.getItem("id");
    await axios.get(`https://test.yobitrust.com:8443/Service-SelfWell-0.0.1-SNAPSHOT/bmi/${idUser}`)
    .then(response => {
      setBmis(response.data);
    })
    .catch(e => {
    console.log(e.message);
  });
};
const retrieveCognitive = async () => {
      const idUser = await AsyncStorage.getItem("id");
    API.GetTest(idUser)
    .then(response => {
      setCognitive(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveCognitive();
   });
    return(
      
        <ScrollView style={styles.container}>
<SafeAreaView>
    <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
            <Text style={styles.back}>{back}</Text>
          </TouchableOpacity>
         
          <Text style={styles.headerText}>My blood analysis History</Text>
          </View>
<View >
{datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}

        {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
          />
        )}
 
        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
          </View>
        )}
 
        {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Time Picker" color="green" onPress={showTimePicker} />
          </View>
        )}
        
      
      <View>
      
{todayTest ? ( 
  <View>
    
<View style={styles.containerThree}>
{todayTest &&
           todayTest.map((blood, index) => (
            <Card1 key={index} style={styles.containerThree}>
                     
            <Block row space="between" style={{ marginBottom: 16 }}>
            <TouchableOpacity 
                        spacing={0.5} caption
                        onPress={ () => update(blood.idBloodAnalyse)}
              >
                     <Image spacing={0.5} caption source={require('../../assets/pencil.png')} style={styles.image}/>    
             </TouchableOpacity>
              <TouchableOpacity 
                        spacing={0.5} caption
                        onPress={ () => showAlertDelete(blood.idBloodAnalyse)}
              >
                     <Image spacing={0.5} caption source={require('../../assets/x-button.png')} style={styles.image1}/>  
             </TouchableOpacity>
            </Block>
              <Text style={styles.dateText}>{moment(blood.bloodAnalysisDate).format('LLLL')}</Text>
              {blood.glucose >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>glucose: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.glucose}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.cReactiveProtein >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>C-Reactive protein: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.cReactiveProtein}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.dDimer >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>D-dimer: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.dDimer}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.ip10 >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>IP-10: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.ip10}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.freeAlbumin >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Free albumin: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.freeAlbumin}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.leptin >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Leptin: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.leptin}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           
           {blood.adiponectin >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Adiponectin: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.adiponectin}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.igf1 >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>IGF-1: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.igf1}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.resistin >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Resistin: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.resistin}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.opn >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>OPN: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.opn}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.orexinA >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Orexin-A: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.orexinA}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.melatonin >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Melatonin: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.melatonin}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
           {blood.creatinine >0 ? ( 
              <View style={{flexDirection: 'row', marginTop: height * 0.02, marginLeft: width * 0.02}}>
                       <Text spacing={0.5} caption style={styles.text_footer}>Creatinine: </Text>
                       <Text spacing={0.5} caption style={styles.textfooter}>{blood.creatinine}</Text>
              
                       </View>                        
                       ):(<View>

             </View>
           )}
            
           
             
            
           
    </Card1>
           ))}
    
           </View> 
           </View>) : (
<View style={styles.containerThree}>

<Text>Add and Log Food</Text>
</View>
               
            )}
           </View>
           
{/* ////////////////////////////////////////// */}
<View style={styles.containerThree}>
       
       <TouchableOpacity  onPress={()=> navigateToBreakfast("Breakfast")}>  
       <Card1 style={styles.card}>
       {breakfastItems   ? ( 
       
               <Block row space="between">
                 
               <View style={{flex: 1, flexDirection: 'row'}}>
               <Image source={require('../../assets/breakfast.png')} style={styles.icon}/>
              <Text style={styles.itemText}>Breakfast</Text>
               </View>
               
              <Text style={styles.caloriesText}>{breakfastItems.calories} cals</Text>
              </Block>
              
          ) : (
            <Block row space="between">
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={require('../../assets/breakfast.png')} style={styles.icon}/>
           <Text style={styles.itemText}>Breakfast</Text>
            </View>
           
           <Text style={styles.caloriesText}>0 cals</Text>
           </Block>
          )}
               
       </Card1>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() =>  navigateToLunch()} >
       <Card1 style={styles.card}>
       {lunchItems ? ( 
               <Block row space="between">
                 
               <View style={{flex: 1, flexDirection: 'row'}}>
               <Image source={require('../../assets/waiting.png')} style={styles.icon}/>
              <Text style={styles.itemText}>Lunch</Text>
               </View>
               
              <Text style={styles.caloriesText}>{lunchItems.calories} cals</Text>
              </Block>
          ) : (
            <Block row space="between">
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={require('../../assets/waiting.png')} style={styles.icon}/>
           <Text style={styles.itemText}>Lunch</Text>
            </View>
           
           <Text style={styles.caloriesText}>0 cals</Text>
           </Block>
          )}
               
       </Card1>
       </TouchableOpacity>

       <TouchableOpacity  onPress={() =>  navigateToDinner()} >
       <Card1 style={styles.card}>
       {dinnerItems ? ( 
               <Block row space="between">
                 
               <View style={{flex: 1, flexDirection: 'row'}}>
               <Image source={require('../../assets/omelette.png')} style={styles.icon}/>
              <Text style={styles.itemText}>Dinner</Text>
               </View>
              <Text style={styles.caloriesText}>{dinnerItems.calories} cals</Text>
              </Block>
          ) : (
            <Block row space="between">
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={require('../../assets/omelette.png')} style={styles.icon}/>
           <Text style={styles.itemText}>Dinner</Text>
            </View>
           
           <Text style={styles.caloriesText}>0 cals</Text>
           </Block>
          )}
               
       </Card1>
      </TouchableOpacity>
       </View>
{/* ////////////////////////////////////////// */}
<Card1 shadow >
        <Block row space="between" style={{ marginBottom: 16 }}>
       
          <Text spacing={0.5} caption medium primary style={styles.dateText}>
          
          </Text>
        
         
        </Block>
        <Text style={styles.dateText}>{moment(date1).format('LL')}</Text>
        <Block row space="between" style={{ marginBottom: 16 }}>
          <Image spacing={0.5} caption source={require('../../assets/scale.png')} style={styles.image}/>
          <Image spacing={0.5} caption source={require('../../assets/height.png')} style={styles.image}/>
          <Image spacing={0.5} caption source={require('../../assets/bmiIcon.png')} style={styles.image}/>
        </Block>
        <Block row center>
          
        <Block row space="between" style={{ marginBottom: 16 }}>          
            <Text spacing={0.5} caption medium primary style={styles.textStyle}>
              {data0} Kg
            </Text>
            <Text spacing={0.5} caption style={styles.textStyle}>
            {data2} cm
            </Text>
            <Text spacing={0.5} caption style={styles.textStyle}>
            {data1}
            </Text>
        </Block>
        </Block>
      

       
</Card1>
<Card1 shadow >
        <Block row space="between" style={{ marginBottom: 16 }}>
       
        <Text style={styles.dateText}></Text>
          </Block>
          <Text style={styles.dateText}>{moment(date1).format('LL')}</Text>
          <Block row space="between" style={{ marginBottom: 30 }}>
       
          </Block><Text style={styles.dateText}>{cognitive.score}</Text>
      

       
      </Card1>









            </View>
            </SafeAreaView>

        </ScrollView>
    );
}

export default BloodAnalysisHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F9F9F9'
    },
    header: {
      height: height * 0.08,
      width: width,
      flexDirection: 'row',
    },
    back: {
  fontSize: 43,
  marginLeft: width * 0.05,
  marginTop:  height * 0.01,
  },
  itemText: {
    color: '#000000',
    fontSize: 18,
    marginLeft: width * 0.05
  },
  headerText: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: 'bold',
    marginLeft: width * 0.1,
    marginTop: height * 0.035
    },
    containerTwo: {
        flex: 1, 
        backgroundColor: '#F9F9F9',
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        width: width * 0.95,
        alignSelf: 'center',
        borderRadius: 20
      },
      containerTab: {
        flex: 1,
        flexDirection: 'row', 
        backgroundColor: '#fff',
        width: width * 0.95,
        height: height * 0.06,
        alignSelf: 'center',
        borderRadius: 20
      },
      tab: {
        flex: 1,
        backgroundColor: '#fff',
        width: (width * 0.95) / 3,
        height: height * 0.06,
        alignSelf: 'center',
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center'
      },
      tabText: {
        color: '#56BED1',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
      },
    containerThree: {
        backgroundColor: '#fff',
        flex: 1,
        width: width * 0.95,
        alignSelf: "center",
    },
    containerThreee: {
      backgroundColor: '#fff',
      flex: 1,
      width: width * 0.95,
      alignSelf: "center",
      height: height * 0.3
  },
    containerFour: {
      backgroundColor: '#fff',
      flex: 1,
      width: width * 0.95,
      alignSelf: "center",
      height: height * 0.3
    },
    containerSix: {
      backgroundColor: 'red',
      height: height * 0.5,
      marginTop: height * 0.02,
      width: width * 0.95,
      alignSelf: 'center',
      marginBottom: height * 0.05
    },
    dateText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3a3c4e',
      marginTop: - height * 0.038,
      alignSelf: 'center'
    },
    text_footer: {
      color: '#3a3c4e',
      fontSize: 18,
  },
  textfooter: {
    color: '#5C75D9',
    fontWeight: 'bold',
    fontSize: 18,
},
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf:"center",
        marginTop: 20
    },
    detailText: {
        color: '#1C47BE',
        fontSize: 20,
        alignSelf:"center",
        marginTop: 20,
        fontWeight: 'bold'
    },   
    image1: {
        height: width *0.07,
        width: width * 0.07,
        marginLeft: width * 0.7,
        marginBottom: height * 0.02
    },
    card: {
      backgroundColor: '#fff',
      height: height * 0.1,
      width: width * 0.95,
    },
    image: {
      height: width *0.07,
      width: width * 0.07,
  },
  icon: {
    height: height * 0.05,
    width: width * 0.09,
  },
  caloriesText: {
    color: '#000000',
    fontSize: 18,
  },
    
});