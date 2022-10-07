# myCourses 📚

A full stack app for school administrators create an account and log in view, create, update, and delete courses.

This app consumes data from the [myCourses REST API](https://github.com/tyler-mcdonald/myCourses-api).

## Features

- Sign up to create a user account
- Users can create new courses, update, and delete their courses
- Courses info is public, but only users can update/delete their owned courses

## Build

- Server built within Node.js environment as a REST API using Express for server routing, Sequelize ORM for SQL interfacing, and connected to a PostgreSQL database
- Data model associations built with data validation, type checking, and user auth for higher access levels
- User authentication includes signup/login with data validation, hashed password storage, and user persistence in browser cookies
- Client built with React and React Router to display client data with URL redirection for certain events, private routes blocking unauthorized access, and router error handling
