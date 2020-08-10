# Tri Land
[![Build Status](https://travis-ci.org/Kairn/tri-land.svg?branch=master)](https://travis-ci.org/Kairn/tri-land)
[![Framework](https://img.shields.io/badge/reactjs-16.13.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Site status](https://img.shields.io/badge/status-ok-green?style=flat)](http://esoma-tril.s3-website.us-east-2.amazonaws.com/)

Tri Land is a simple web application that aims to demonstrate the core features of React. It covers component layering, routing, jsx, state management, form handling, and other important concepts. The application features two built-in mini-games and a user form which connects to a real-time database. The pages are styled with basic CSS, and no back-end API is required for them to function.

## Build Project
### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) (Optional)
* [Google Firebase Project](https://firebase.google.com/) (Optional)

### Build
1. Clone or download the repository and change into the project's root directory (where `package.json` is located).
2. Run `npm install` to download/update all dependencies.
3. If you have a Firebase project setup, you may optionally change the configuration details in `src/components/TechTalk/components/OpinionForm/OpinionForm.jsx` (otherwise the form will not be submitted to any database).
4. Run `npm start` to start the local server at port 3000.
5. Run `npm run build` to build the minified production application ready to be deployed to a live server.

## Features
Tri Land features a casual casino card game **Blackjack** and a famous mathematical strategy game **Nim**. Rules of these can be found in the application or online sources. If you have any recommendations or suggestions, I encourage you to use the feedback section (click on the blue float icon on the bottom right) to submit your comments.