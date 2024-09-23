// src/components/Login.js
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import du hook

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('curesuremedico@test.com');
    const [motDePasse, setMotDePasse] = useState('curesuremedico');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                email,
                motDePasse,
            });
            if (response.data) {
                // Enregistrer le token dans la session pour la gestion de la session
                sessionStorage.setItem('token', response.data.token); // Assumer que l'API retourne un token
                onLogin(response.data.token);
                setLoading(false);
                navigate('/'); // Rediriger vers la page d'accueil après connexion réussie
            }
        } catch (err) {
            setError('Nom d’utilisateur ou mot de passe incorrect.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de Passe"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">{loading ? "Connexion ... " : "Se connecter"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
