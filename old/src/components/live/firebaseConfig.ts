var firebase = require("firebase/app");
// var firebasedb = require("firebase/database");

const firebaseConfig =  {
  apiKey: "AIzaSyBMGNBX-KupzueYhF6AejYV1VOM-d2BlBU",
  authDomain: "admin-notification-f854d.firebaseapp.com",
  projectId: "admin-notification-f854d",
  storageBucket: "admin-notification-f854d.appspot.com",
  messagingSenderId: "420992502988",
  appId: "1:420992502988:web:34fac603cd5d71a27b0669",
  measurementId: "G-GKTQ2PXKM3"
}; //by adding your credentials, you get authorized to read and write from the database

export const app = firebase.initializeApp(firebaseConfig);