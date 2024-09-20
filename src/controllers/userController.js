// src/controllers/userController.js
import { createUser, getUserByEmail } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Fonction d'inscription
export async function register(req, res) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Vérifiez si l'email existe déjà
        const existingEmail = await getUserByEmail(req.body.email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email déjà utilisé par d\'autre utilisateur' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.motDePasse, salt); // Utilisez le champ correct pour le mot de passe

        const userData = {
            nom: req.body.nom, // Assurez-vous que le nom est dans le corps de la requête
            email: req.body.email,
            motDePasse: hashedPassword,
        };

        await createUser(userData);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Fonction de connexion
export async function login(req, res) {
    try {
        const user = await getUserByEmail(req.body.email); // Utilisez l'email pour la recherche
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.motDePasse, user.motDePasse);

        if (!validPassword) {
            return res.status(400).json({ error: 'Mot de passe incorrect!' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.utilisateurID, nom: user.nom, email: user.email },JWT_SECRET, { expiresIn: '1h' });

        // Envoyer le token au client
        res.status(200).json({ message: 'Utilisateur connecté avec succès', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
