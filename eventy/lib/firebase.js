import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBugAZqsh5aWqBq-6T_gga933EAnDX6XfY",
    authDomain: "eventy-b1d0d.firebaseapp.com",
    projectId: "eventy-b1d0d",
    storageBucket: "eventy-b1d0d.appspot.com",
    messagingSenderId: "940677597788",
    appId: "1:940677597788:web:431662d614f8033e517499",
    measurementId: "G-YD8B46H8D8"
  };
  
  if(!firebase.getApps().length){
    firebase.initializeApp(firebaseConfig)
  }
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
