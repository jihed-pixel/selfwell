import React from 'react';

import axios from "axios";
import http from "./http-common";
import AuthHeader from './AuthHeader';

import AsyncStorage from '@react-native-community/async-storage';
import 'localstorage-polyfill'; 

const email = '';
const password = '';


const login = (email, password) => {
  return http
    .post(`/user/user/signin`, {
      email,
      password,
    });
};

const Register = (send) => {
  return http.post(`/user/user/signup`, send);
};

const sendEmail = (send) => {
  return http.post(`/user/user/sendEmail`, send);
};

const confirmAccount = (token) => {
  return http.get(`/user/user/confirm-account/${token}`)
};

/************************************ BMI API *****************************/

const NewBmi = (send) => {
  return http.post(`/selfwell/bmi/add`, 
  send, 
  )};
const getBmi = (idUser) => {
  http.get(`/selfwell/bmi/${idUser}`,
  
  )};

const editBmi = (id, data) => {
  http.put(`/selfwell/bmi/${id}`, data,
  );
};

const DeleteBmi = (idBmi) => {
  http.delete(`/selfwell/bmi/${idBmi}`, 
  )
};

const getBmiByLatestDate = (id) => {
  return  http.get(`/selfwell/bmi/bmilatest/${id}`,
 )
};

const addOrupdateBmi = (send,idUser) => {
  return  http.put(`/selfwell/bmi/up/${idUser}`,
  send,
 )
};

/********************************** Blood Analysis API ********************************/

const NewBloodAnalysis = (send) => {
  return http.post(`/selfwell/bloodAnalyses/add`, 
  send, 
  );
};

const getBloodAnalysis = (id) => {
  return http.get(`/selfwell/bloodAnalyses/${id}`,
  );
};

const getBloodAnalysisById = (id) => {
  return http.get(`/selfwell/bloodAnalyses/details/${id}`,
  );
};

const updateBloodAnalysis = (id, data) => {
  return http.put(`/selfwell/bloodAnalyses/${id}`, data,
  );
};

const saveBloodAnalysis = (send,idUser, bloodAnalysisDate) => {
  return http.put(`/selfwell/bloodAnalyses/${idUser}/${bloodAnalysisDate}`, send,
  );
};

const DeleteBloodAnalysis = (id) => {
  return http.delete(`/selfwell/bloodAnalyses/${id}`,
  );
};

const getBloodAnalysisByIdUser = (idUser) => {
  return http.get(`/selfwell/bloodAnalyses/getByidUser/${idUser}`,
  );
};

const exportBloodAnalysisByIdUser = (idUser) => {
  return http.get(`/selfwell/bloodAnalyses/export/${idUser}`,
  );
};

/********************************** Food API ********************************/

const getFoodList = () => {
  return http.get(`/nutrition/food/tutorials`,
  );
};

const getFoodById = (id) => {
  return http.get(`/nutrition/food/byid/${id}`,
  );
};

const getFoodByName = (name) => {
  return http.get(`/nutrition/food/byName/${name}`,
  );
};

/********************************** Breakfast API ********************************/

const NewBreakfast = (send,idUser, breakfastDate) => {
  return http.put(`/nutrition/breakfast/${idUser}/${breakfastDate}`, 
  send, 
  );
};

const showBreakfast = (idUser, breakfastDate) => {
  return http.get(`/nutrition/breakfast/${idUser}/${breakfastDate}`);
};

const deleteFoodFromBreakfast = (send,id, index) => {
  return http.put(`/nutrition/breakfast/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Lunch API ********************************/

const NewLunch = (send,idUser, lunchDate) => {
  return http.put(`/nutrition/lunch/${idUser}/${lunchDate}`, 
  send, 
  );
};

const showLunch = (idUser, lunchDate) => {
  return http.get(`/nutrition/lunch/${idUser}/${lunchDate}`);
};

const deleteFoodFromLunch = (send,id, index) => {
  return http.put(`/nutrition/lunch/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Dinner API ********************************/

const NewDinner = (send,idUser, dinnerDate) => {
  return http.put(`/nutrition/dinner/${idUser}/${dinnerDate}`, 
  send, 
  );
};

const showDinner = (idUser, dinnerDate) => {
  return http.get(`/nutrition/dinner/${idUser}/${dinnerDate}`);
};

const deleteFoodFromDinner = (send,id, index) => {
  return http.put(`/nutrition/dinner/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Cognitive test API ********************************/

const NewTest = (send) => {
  return http.post(`/cognictivetest/cognictivetest/add`, 
  send, 
  );
};

export default {
  login,
  Register,
  sendEmail,
  confirmAccount,
  getBmiByLatestDate,
  NewBmi,
  getBmi,
  editBmi,
  DeleteBmi,
  addOrupdateBmi,
  NewBloodAnalysis,
  getBloodAnalysis,
  getBloodAnalysisById,
  getBloodAnalysisByIdUser,
  exportBloodAnalysisByIdUser,
  updateBloodAnalysis,
  saveBloodAnalysis,
  DeleteBloodAnalysis,
  getFoodList,
  getFoodById,
  getFoodByName,
  NewBreakfast,
  showBreakfast,
  deleteFoodFromBreakfast,
  NewLunch,
  showLunch,
  deleteFoodFromLunch,
  NewDinner,
  showDinner,
  deleteFoodFromDinner,
  NewTest,
}