# Node-JS-API-Authenctication
AuthenticationNodeJs
This project aims to provide an authentication system using Node.js. Authentication is a crucial component for verifying user identities and enabling authorization processes.

## Features
User registration and login functionality
Password reset mechanism
Email verification
Social media login (Facebook and Twitter)
JWT-based session management

## Requirements
Make sure you have the following software installed before running the project:

Node.js (v14 or higher)
npm (Node Package Manager)

## Installation
- npm install <br>
- npm run dev <br>
- npm run start
- 
## İnfo
Create a .env file in the project root directory and set the following variables: 

DB_HOST = { hostname  }<br>
DB_PORT = { portno } <br>
DB_user = { user:userpassword }<br>
DB_NAME = { databasename } <br>
JWT_SECRET = 8663577bcf6610827a8ed39e2ca074edfb92855de06d5f2227c55be95cb8ef97334890004cdb5c3fbbcd107328c77d85de6845c15d805eab425a625db3bcee74 <br>
ACCESS_TOKEN_SECRET = 2e438cbfc7d4fa7ea197d5dc4078cd14324ed28dedc720a340e355ccf106df9f70578498e4b1e326708c92242b6f0da3a4a2afd092c7ed0c27e8ddd247d07462 <br>
REFRESH_TOKEN_SECRET = f3e51012f2b5a9a291c3b386cb4033b83c8cdb6cb73b1fb3761d6f10f89f6f2a2605df5d9008e88fe5e00c4083899330abb71144fae3347bd04e1df3d46dd646 <br>

## Technologies

* Nodejs
* Express
* Mongodb
* Mongoose
* jsonwebtoken (JWT)
* Bcryptjs
* Dotenv
- axios
- body-parser
- cors
- passport
- passport-google-oauth20
- passport-linkedin-oauth2

## Contribution
If you would like to contribute to this project, please follow these steps:

Fork the project repository.
Create a new branch for your feature (git checkout -b my-new-feature).
Make the necessary changes and commit them (git commit -am 'Add new feature').
Push your changes to the branch (git push origin my-new-feature).
Open a new pull request and describe your changes.
## License
This project is licensed under the MIT License. See the LICENSE file for more information.

This README provides essential information on how to use and contribute to the AuthenticationNodeJs project. For more detailed instructions, please refer to the source code and documentation.



