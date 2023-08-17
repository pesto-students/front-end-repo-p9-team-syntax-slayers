import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import SalonDetails from './pages/salonDetails/SalonDetails';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import FinalSelection from './pages/finalSelection/FinalSelection';
import UserProfile from './pages/userProfile/UserProfile';

import DashboardServices from './pages/dashboardServices/DashboardServices';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import Landing from './pages/landing/Landing';
import Listings from './pages/listings/Listings';
import useGeolocation from './helper/geolocation';
import { geocodeCoordinates } from './helper/geoCoding';
import { useAppDispatch } from './redux/hooks';
import { setGeoAddress, setUserLocation } from './redux/slices/user';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/listings/*" element={<Listings />} />
          <Route path="/salonDetails/:salonId" element={<SalonDetails />} />
          <Route
            path="/finalSelection"
            element={
              <PrivateRoute>
                <FinalSelection />
              </PrivateRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboardService"
            element={
              <PrivateRoute>
                <DashboardServices />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
