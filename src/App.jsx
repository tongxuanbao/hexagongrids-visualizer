import logo from "./logo.svg";
import "./App.css";
import Mainbody from "./Components/Mainbody";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcXdOKUeK3bFl5fYFtwQPLTWU5EaxA1r8",
  authDomain: "hexagon-visualizer.firebaseapp.com",
  projectId: "hexagon-visualizer",
  storageBucket: "hexagon-visualizer.appspot.com",
  messagingSenderId: "979755479587",
  appId: "1:979755479587:web:8e97a8d9fbaad3cfcf7796",
  measurementId: "G-ZGDVXM6M3Y",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return <Mainbody />;
}

export default App;
