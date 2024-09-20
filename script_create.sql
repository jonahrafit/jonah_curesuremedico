-- Active: 1705590420801@@127.0.0.1@3306@curesuremedico
CREATE TABLE Utilisateurs (
    utilisateurID INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    motDePasse VARCHAR(60) NOT NULL
);

CREATE TABLE Projets (
    projetID INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    dateDebut DATETIME NOT NULL,
    utilisateurID INT,
    FOREIGN KEY (utilisateurID) REFERENCES Utilisateurs(utilisateurID) ON DELETE CASCADE
);

CREATE TABLE Taches (
    tacheID INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    dateEcheance DATETIME NOT NULL,
    Statut ENUM('En cours', 'Terminé', 'En attente') NOT NULL,
    projetID INT,
    FOREIGN KEY (projetID) REFERENCES Projets(projetID) ON DELETE CASCADE
);

CREATE TABLE Commentaires (
    commentaireID INT PRIMARY KEY AUTO_INCREMENT,
    texte TEXT NOT NULL,
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    tacheID INT,
    utilisateurID INT,
    FOREIGN KEY (tacheID) REFERENCES Taches(tacheID) ON DELETE CASCADE,
    FOREIGN KEY (utilisateurID) REFERENCES Utilisateurs(utilisateurID) ON DELETE CASCADE
);

CREATE TABLE Assignations (
    assignationID INT PRIMARY KEY AUTO_INCREMENT,
    tacheID INT,
    utilisateurID INT,
    FOREIGN KEY (tacheID) REFERENCES Taches(tacheID) ON DELETE CASCADE,
    FOREIGN KEY (utilisateurID) REFERENCES Utilisateurs(utilisateurID) ON DELETE SET NULL
);
