import  React , {useState, useEffect} from 'react';

import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB8VlEOy0ur97ypoLpg0nE4hXlCA8y4a1Q",
    authDomain: "medscan-f5a25.firebaseapp.com",
    projectId: "medscan-f5a25",
    storageBucket: "medscan-f5a25.appspot.com",
    messagingSenderId: "557736344880",
    appId: "1:557736344880:web:e1eb936c2b4cc08f931cf5",
    measurementId: "G-581L9F2QF6"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default () =>{
    return {firebase, auth};
}