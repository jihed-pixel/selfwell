import React from 'react';

import axios from "axios";
import http from "./http-common";

import 'localstorage-polyfill'; 

const email = '';
const password = '';


const login = (email, password) => {
  return http
    .post(`/Utilisateur-Service-0.0.1-SNAPSHOT/user/signin`, {
      email,
      password,
    });
};

const Register = (send) => {
  return http.post(`/Utilisateur-Service-0.0.1-SNAPSHOT/user/signup`, send);
};
const UpdatePass = (send) => {
  return http.post(`/Utilisateur-Service-0.0.1-SNAPSHOT/user/update`, send);
};
const sendEmail = (send) => {
  return http.post(`/Utilisateur-Service-0.0.1-SNAPSHOT/user/sendEmail`, send);
};

const confirmAccount = (token) => {
  return http.get(`/Utilisateur-Service-0.0.1-SNAPSHOT/user/confirm-account/${token}`)
};

/************************************ BMI API *****************************/

const NewBmi = (send) => {
  return http.post(`/Service-SelfWell-0.0.1-SNAPSHOT/selfwell/bmi/add`, 
  send, 
  )};
const getBmi = (idUser) => {
  http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bmi/${idUser}`,
  
  )};

const editBmi = (id, data) => {
  http.put(`/Service-SelfWell-0.0.1-SNAPSHOT/bmi/${id}`, data,
  );
};

const DeleteBmi = (idBmi) => {
  http.delete(`/Service-SelfWell-0.0.1-SNAPSHOT/bmi/${idBmi}`, 
  )
};

const getBmiByLatestDate = (id) => {
  return  http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bmi/bmilatest/${id}`,
 )
};

const addOrupdateBmi = (send,idUser) => {
  return  http.put(`/Service-SelfWell-0.0.1-SNAPSHOT/bmi/up/${idUser}`,
  send,
 )
};

/********************************** Blood Analysis API ********************************/

const NewBloodAnalysis = (send) => {
  return http.post(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/add`, 
  send, 
  );
};

const getBloodAnalysis = (id) => {
  return http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/${id}`,
  );
};

const getBloodAnalysisById = (id) => {
  return http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/details/${id}`,
  );
};

const updateBloodAnalysis = (id, data) => {
  return http.put(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/${id}`, data,
  );
};

const saveBloodAnalysis = (send,idUser, bloodAnalysisDate) => {
  return http.put(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/${idUser}/${bloodAnalysisDate}`, send,
  );
};

const DeleteBloodAnalysis = (id) => {
  return http.delete(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/${id}`,
  );
};

const getBloodAnalysisByIdUser = (idUser) => {
  return http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/getByidUser/${idUser}`,
  );
};

const exportBloodAnalysisByIdUser = (idUser) => {
  return http.get(`/Service-SelfWell-0.0.1-SNAPSHOT/bloodAnalyses/export/${idUser}`,
  );
};

/********************************** Food API ********************************/

const getFoodList = () => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/food/tutorials`,
  );
};

const getFoodById = (id) => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/food/byid/${id}`,
  );
};

const getFoodByName = (name) => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/food/byName/${name}`,
  );
};

/********************************** Breakfast API ********************************/

const NewBreakfast = (send,idUser, breakfastDate) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/breakfast/${idUser}/${breakfastDate}`, 
  send, 
  );
};

const showBreakfast = (idUser, breakfastDate) => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/breakfast/${idUser}/${breakfastDate}`);
};

const deleteFoodFromBreakfast = (send,id, index) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/breakfast/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Lunch API ********************************/

const NewLunch = (send,idUser, lunchDate) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/lunch/${idUser}/${lunchDate}`, 
  send, 
  );
};

const showLunch = (idUser, lunchDate) => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/lunch/${idUser}/${lunchDate}`);
};

const deleteFoodFromLunch = (send,id, index) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/lunch/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Dinner API ********************************/

const NewDinner = (send,idUser, dinnerDate) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/dinner/${idUser}/${dinnerDate}`, 
  send, 
  );
};

const showDinner = (idUser, dinnerDate) => {
  return http.get(`/Nutrition-Service-0.0.1-SNAPSHOT/dinner/${idUser}/${dinnerDate}`);
};

const deleteFoodFromDinner = (send,id, index) => {
  return http.put(`/Nutrition-Service-0.0.1-SNAPSHOT/dinner/deleteFood/${id}/${index}`, 
  send, 
  );
};

/********************************** Cognitive test API ********************************/

const NewTest = (send) => {
  return http.post(`/cognictivetest-service-0.0.1-SNAPSHOT/cognictivetest/add`, 
  send, 
  );
};
const GetTest = (id) => {
  return http.get(`/cognictivetest-service-0.0.1-SNAPSHOT/cognictivetest/${id}` 
  );
};

export default {
  login,
  Register,
  UpdatePass,
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
  GetTest,
}