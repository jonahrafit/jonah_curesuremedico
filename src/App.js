import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded); // Exemple : extraire le nom d'utilisateur
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    };

    const handleLogin = (token_props) => {
        const decoded = jwtDecode(token_props);
        const token = sessionStorage.getItem('token');
        if (token === token_props) {
            setUser(decoded); // Extraire le nom d'utilisateur après décodage du token
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute user={user}>
                        <Home user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;
