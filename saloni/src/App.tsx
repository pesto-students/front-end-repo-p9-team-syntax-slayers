import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import SalonDetails from "./pages/salonDetails/SalonDetails";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import FinalSelection from "./pages/finalSelection/FinalSelection";
import UserProfile from "./pages/userProfile/UserProfile";
import { Provider } from "react-redux";
import {store} from './redux/store'
import DashboardServices from "./pages/dashboardServices/DashboardServices"

function App() {
  return (
    <> 
       <Provider store={store}>
      <Router>
       <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <Heading>Hello Saloni</Heading>
            }
          />
          <Route
            path="/salonDetails"
            element={
              <SalonDetails/>
            }
          />
          <Route
            path="/finalSelection"
            element={
              <FinalSelection/>          
            }
          />
          <Route
          path="/userProfile"
          element={
            <UserProfile/>
          }/>
          <Route 
          path="dashboardService"
          element={
            <DashboardServices/>
          }/>
        </Routes>
        <Footer/>
      </Router>
      
      </Provider>
     
    </>
  );
}

export default App;
