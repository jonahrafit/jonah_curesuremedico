import React from 'react';
import './Home.css';

const Home = ({ user, onLogout }) => {
    return (
        <div className="home-container">
            <h1>Bienvenue, {user.nom}!</h1>
            <p>Ceci est votre page d'accueil.</p>
            <button className="logout-button" onClick={onLogout}>Se déconnecter</button>
        </div>

    );
};

export default Home;
