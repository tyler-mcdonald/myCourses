# myCourses

A full stack app for school administrators create an account and log in view, create, update, and delete courses.

## Get started
**Start the API**
```
cd ./api
npm install
npm start
```

**Start the client**
```
cd ./client
npm install
npm start
```

## Features
* Sign up to create a user account
* Logged in users can create new courses and update/delete their own courses
* Users cannot make changes to courses they don't own

## Build
* Server built within Node.js environment as a REST API using Express for server routing, Sequelize ORM for SQL interfacing, and connected to a PostgreSQL database
* Data model associations built with data validation, type checking, and user auth for higher access levels
* User authentication includes signup/login with data validation, hashed password storage, and user persistence in browser cookies
* Client built with React and React Router to display client data with URL redirection for certain events, private routes blocking unauthorized access, and router error handling
