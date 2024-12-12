import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Cài đặt: npm install js-cookie

const ProtectedRoute = ({ children }) => {
    // Lấy cookie PHPSESSID
    const sessionID = Cookies.get('PHPSESSID');
  
    // Nếu cookie tồn tại, cho phép truy cập
    return sessionID ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;