import "./App.css";
import Mainbody from "./Components/Mainbody";
import { useState, useEffect, createContext } from "react";

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
