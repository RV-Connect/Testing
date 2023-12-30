import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/home';
import LogoutPage from '../pages/LogOut/logOutRedirect';

const MainApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/logOutPage" element={<LogoutPage/>} />
            </Routes>
        </Router>
    );
};

export default MainApp;
