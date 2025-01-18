import React, { createContext, useReducer, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Form from "./components/Form";

const Routing = () => {



  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />     
        <Route path="/upload" element={<Form />} />           
      </Routes>
    </>
  );
};
function App() {
  return (
      <Router>
        <Routing />
      </Router>
  );
}

export default App;