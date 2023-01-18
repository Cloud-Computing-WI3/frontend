
![Logo](https://avatars.githubusercontent.com/u/117459812?s=200&v=4)
#   Newsify - Frontend
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;&nbsp; 
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)&nbsp;&nbsp; 

## News App using Cloud Computing & Data Engineering

Eine Webanwendung, die einen personalisierte Nachrichten-Artikel anzeigt.

User können Vorlieben und Schlagworte in ihrem Profil hinterlegen und bekommen dann einen Newsfeed mit passenden Nachrichten angezeigt (und können auf die Quellen navigieren).

**Eingesetzte Technologien:**
* React 18.2.0 inkl. React Router 6.4.2 (https://reactjs.org/)
* Material UI 5.10.12 (https://mui.com/material-ui/getting-started/overview/)
* Axios 1.1.3 (https://axios-http.com/docs/intro)

## Table of Content
- [Getting started](#getting-started)
- [Repository Overview](#repository-overview)

## Getting Started
* Install packages with `npm install`
* Start development server by running `npm run dev`
* Build production build by running `npm run build`

## Repository Overview

```
Frontend
├── src
│   ├── components
│   │   ├── KeywordAutocomplete.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── MediaCard.css
│   │   ├── MediaCard.jsx
│   │   └── Message.jsx
│   ├── layout
│   │   ├── Content.jsx
│   │   ├── Header.css
│   │   ├── Header.jsx
│   │   └── RequireAuthRoute.jsx
│   ├── pages
│   │   ├── user
│   │   │   └── UserPage.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.css
│   │   ├── LoginPage.jsx
│   │   ├── NewsPage.jsx
│   │   └── RegisterPage.jsx
│   └── utils
│       ├── apis
│       ├── news_feed
│       │   ├── articles_by_categories.js
│       │   ├── articles_by_keywords.js
│       │   ├── articles.js
│       │   └── google_categories.js
│       ├── profile_management
│       │   ├── accounts.js
│       │   ├── authentication.js
│       │   ├── categories.js
│       │   └── keywords.js
│       ├── NewsFeed.jsx
│       ├── ProfileManagement.jsx
│       └── providers
│           ├── AccountProvider.jsx
│           ├── LoadingProvider.jsx
│           └── MessageProvider.jsx
├── App.jsx
├── main.jsx
├── Theme.jsx
├── app.yaml
├── index.html
├── package.json
├── vite.config.js
└── package-lock.json

The "Frontend" directory contains the files for the frontend of the project. The "src" directory holds the main source code for the frontend, including the "components" directory which contains reusable UI components.The "layout" directory contains the layout components. The "pages" directory holds the different pages of the application. The "utils" directory contains utility files such as the "apis", "news_feed" directory which contains the news feed functionalities "articles_by_categories.js", "articles_by_keywords.js", "articles.js" and "google_categories.js" files, the "profile_management" directory which contains the profile management functionalities "accounts.js", "authentication.js", "categories.js" and "keywords.js" files, and the "NewsFeed.jsx", "ProfileManagement.jsx" and "providers" directory which contains the providers "AccountProvider.jsx", "LoadingProvider.jsx" and "MessageProvider.jsx" files. The "App.jsx", "main.jsx" files are the entry point of the application. 
"Theme.jsx" is where the application theme is configuered. The "app.yaml" file is used for deploying the application to Google App Engine. "index.html" is the main html file of the application. "package.json" contains the project dependencies."vite.config.js" file is used for configuring the development server.
