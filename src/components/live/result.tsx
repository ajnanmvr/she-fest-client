//Loading Firebase Package
// var firebase = require("firebase/app");
// var firebasedb = require("firebase/database");
import { FIREBASE_CONFIG } from "@/lib/env";
import { initializeApp } from "@firebase/app";
import { getDatabase, ref, onValue } from "@firebase/database";

/**
* Update your Firebase Project
* Credentials and Firebase Database
* URL
*/

const firebaseConfig = FIREBASE_CONFIG  //by adding your credentials, you get authorized to read and write from the database

var app = initializeApp(firebaseConfig)
/**
* Loading Firebase Database and refering 
* to user_data Object from the Database
*/
var db = getDatabase(app);
var reference = ref(db, "current")
// firebasedb.get(ref).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });

onValue(reference, (snapshot: any) => {
  const data = snapshot.val();
  if (data == 'no data') {
    console.log('show end');
  } else {
    var DateFiff = (new Date().getTime()) / 1000 - (data?.startTime) / 1000
    console.log(DateFiff);
    if (DateFiff < 3) {
      console.log("Before", data);
      setTimeout(() => {
        console.log("After", data);
      }, 1000);
    }
    else {
      console.log("After", data);
    }
  }
});
