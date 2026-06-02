# TP IDE & Frameworks: TaskFlow Full-Stack

Application web Full-Stack de gestion de tâches d'équipe développée avec React, Node.js, Express et MongoDB.

# Information de l'étudiant
    -Nom&Prenom: DON MACHEKENG JERRY MANDELSONE
    -Matricule: 23ENSPM0445
    -Option: RESEAU ET TELECOMMUNICATION

### 1. Cloner le dépôt

git clone https://github.com/Jerry237237/TP_IDE-FRAMEWORKS.git
cd TP_IDE-FRAMEWORKS

## Lancement

### Étape 1 : Démarrer MongoDB

Ouvrir le terminal en administrateur et taper (ici nous avins travailler sur windows) :

net start MongoDB

### Étape 2 : Démarrer le serveur Backend

Ouvrir un terminal dans le dossier `server` :

cd server
npm run dev

Le serveur démarre sur : `http://localhost:5000`

### Étape 3 : Démarrer le Frontend React

Ouvrir un autre terminal dans le dossier `client/frontend` et taper:

cd client/frontend
npm run dev

L'application démarre sur : `http://localhost:5173`

## Fonctionnalités

- Affichage de la liste des tâches depuis la base de données
- Ajout d'une nouvelle tâche via un formulaire
- Consultation du détail d'une tâche
- Persistance des données dans MongoDB
- Navigation sans rechargement de page
- API RESTful sécurisée avec CORS
