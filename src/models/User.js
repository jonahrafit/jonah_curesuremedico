// src/models/User.js
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config.js';

const pool = mysql.createPool(DB_CONFIG);

// Fonction pour créer un nouvel utilisateur
export const createUser = async (userData) => {
    const { nom, email, motDePasse } = userData; // Notez le champ "nom"
    const query = 'INSERT INTO Utilisateurs (nom, email, motDePasse) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [nom, email, motDePasse]);
    return result;
};

// Fonction pour obtenir un utilisateur par nom d'utilisateur ou email
export const getUserByEmail = async (email) => { // Changez le nom de la fonction
    const query = 'SELECT * FROM Utilisateurs WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0]; // Retourne le premier utilisateur trouvé
};

