import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/NavBar/Home/home';
import ContactUs from './components/NavBar/ContactUs/contactUs';
import NavBar from './components/NavBar/NavbarComp/navBar';
import { navDataArr } from './components/NavBar/NavbarComp/navDetails';
import LogIn from './components/NavBar/LogIn/logIn';
import Rooms from './components/NavBar/Rooms/Rooms';
import ProfilePage from './components/NavBar/profilePage/profile';
import MyCalendar from './components/NavBar/OrderRoom/CalendarComp/MyCalendar';
import CartContents from './components/NavBar/OrderRoom/CartContents/CartContents';
import PayMent from './components/NavBar/OrderRoom/payment/PayMent';
import TermsOfService from './components/NavBar/TermsOfService/TermsOfService';
import SignUp from './components/NavBar/SignUp/signUp';
import { ShoppingCartProvider } from './components/NavBar/OrderRoom/ShoppingCartContext';
import Dashboard from './components/NavBar/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShoppingCartProvider>
          <NavBar items={navDataArr} titleOfNav={''} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="cart" element={<CartContents />} />
            <Route path="/PayMent" element={<PayMent />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
            <Route path="calendar/:id" element={<MyCalendar />} />
          </Routes>
          <Dashboard />
        </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
