import logo from "./logo.svg";
import "./App.css";
import Mainbody from "./Components/Mainbody";
import { useState, useEffect, createContext } from "react";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/f";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAcXdOKUeK3bFl5fYFtwQPLTWU5EaxA1r8",
//   authDomain: "hexagon-visualizer.firebaseapp.com",
//   projectId: "hexagon-visualizer",
//   storageBucket: "hexagon-visualizer.appspot.com",
//   messagingSenderId: "979755479587",
//   appId: "1:979755479587:web:8e97a8d9fbaad3cfcf7796",
//   measurementId: "G-ZGDVXM6M3Y",
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const panelDimension = Math.min(Math.trunc(width * 0.9), height - 100);
  const size = Math.min(20.0, Math.trunc(panelDimension / 17));
  return { size, panelDimension };
}

export const GridContext = createContext({});

function App() {
  const [panelDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GridContext.Provider value={panelDimensions}>
      <Mainbody />
    </GridContext.Provider>
  );
}

export default App;
