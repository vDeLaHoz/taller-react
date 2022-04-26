// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAms9UZYsOhDmS5TAF96pJRHZRYp267q7A",
  authDomain: "crud-react-5e4eb.firebaseapp.com",
  projectId: "crud-react-5e4eb",
  storageBucket: "crud-react-5e4eb.appspot.com",
  messagingSenderId: "152645685839",
  appId: "1:152645685839:web:6b545369d93992c44d903a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}

