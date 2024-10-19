# Participation ODM 2024 - Régionales de France

## Techstack

- [SolidStart](https://start.solidjs.com), framework fullstack basé sur SolidJS, utilise Vinxi, Vite et Nitro en interne
- [UnoCSS](https://unocss.dev), framework CSS dans le même esprit que TailwindCSS
- [pnpm](https://pnpm.io), gestionnaire de dépendances rapide et efficace
- [TypeScript](https://www.typescriptlang.org), JS mais typé pour assurer la qualité du code 
- [MongoDB](https://www.mongodb.com), base de données NoSQL

J'ai décidé de partir sur SolidStart puisque SolidJS est une librairie que j'admire pour réaliser mes interfaces.
C'est pourquoi il me paraît évident de partir sur un framework fullstack qui utilise SolidJS pour le front-end.

Concernant la base de données, j'ai décidé d'aller vers MongoDB pour sa très bonne intégration dans l'écosystème NodeJS (via `mongoose`) et sa facilité d'utilisation.

## Fonctionnalités

- [x] Inscription (+ envoi d'un code OTP par e-mail pour confirmer l'inscription)
  - [x] Mot de passe hashé (bcrypt)
  - [x] Vérification de la validité de l'adresse e-mail
  - [x] Mot de passe >= 8 caractères (bonnes pratiques)
- [x] Connexion
- [ ] Suppression de son compte
  - [ ] Entraine la suppression de toutes les réservations effectuées
- [x] Réservation entre deux dates
  - [x] Vérification de la disponibilité
- [x] Liste des réservations effectuées par l'utilisateur
- [ ] Annulation d'une réservation 
- [x] Recherche de séjours disponibles
  - [x] Filtrer par pays
  - [x] Filtrer par ville
  - [x] Filtrer par continent
  - [x] Filtrer par nombre de personnes
  - [x] Filtrer par prix
  - [x] Filtrer par environnement (campagne, ville, ...)
- [x] Affichage des détails d'un séjour 

## Ce qu'il reste à faire

- [ ] Affichage des potentielles erreurs (via le `toaster` implémenté)
- [ ] `favicon.ico` et `favicon.svg`
- [ ] `robots.txt`
- [ ] `<meta>` (SEO)
- [ ] Transposition de la charte graphique vers Figma
- [ ] Modification de son nom complet dans le profil utilisateur

## Développement

```bash
# On clone le dépôt git
git clone https://github.com/Vexcited/odm-2024
cd odm-2024

# Installation des dépendances
pnpm install
```

Il ne faut pas oublier de créer un fichier `.env` à la racine du projet avec les variables d'environnement contenues dans le fichier `.env.example`.

Vous pouvez démarrer le serveur de développement en utilisant la commande suivante :

```bash
pnpm dev
```

## Production

Nous utilisons le preset `node` par défaut.

```bash
pnpm build
node .output/server/index.mjs
```
