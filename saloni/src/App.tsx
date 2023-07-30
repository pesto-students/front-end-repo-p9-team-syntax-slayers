import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Router>
      
        <Routes>
          <Route
            path="/"
            element={
              <Heading>Hello Saloni</Heading>
            }
          />
        </Routes>
      </Router>
      
    
     
    </>
  );
}

export default App;
