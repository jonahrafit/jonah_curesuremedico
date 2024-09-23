# BACKEND
## node js express

### Installation
Après avoir mettre en place la base de donnée mysql 
n'oublie pas de faire la configuration sur le fichier config.js
et une insertion d'une utilisateur par defaut : 

### donnée utilisateur test
insert into 
  `Utilisateurs` (
    nom, 
    email, 
    `motDePasse`
  )
values
  (
    "CuresureMedico", 
    "curesuremedico@test.com", 
    "$2b$10$aUkt09X7IBggwLKMhvUkzu0xVs/R4f3AED.wHBzEmo0P3PvSKnBzK"
  );

Mais , vous pouvez faire appel a un API sur Postman:
http://localhost:3000/api/users/register
POST
{
  "nom": "Curesure Medico",
  "email": "curesuremedico@test.com",
  "motDePasse": "curesuremedico"
}

### Exécution
node src/app.js
