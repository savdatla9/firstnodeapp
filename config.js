// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcwe9kqQfrHozt2jW3f9qqfC1kAdfFSLQ",
  authDomain: "firstnodeap.firebaseapp.com",
  projectId: "firstnodeap",
  storageBucket: "firstnodeap.firebasestorage.app",
  messagingSenderId: "457653165710",
  appId: "1:457653165710:web:dfb0129603e6bb7b7833df",
  measurementId: "G-KJCMJB572F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);