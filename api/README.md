# REST-API
A REST API for course and user information. 

## Quickstart
#### Using nodemon
```
npm install
nodemon
```
#### using npm start
```
npm install
npm start
```

## API Features
* `Users`
    * `get` user info and `post` new users
* `Courses`
    * `get` courses associated with the currently authenticated user
    * `post` new courses
    * `put` updated course information (with user auth)
    * `delete` courses (with user auth)
    
## Data Validation
* `User`
    * `firstName` is required
    * `lastName` is required
    * `email` must be correctly formatted and unique among all users
    * `password` is required
    
    
* `Course`
    * `title` is required
    * `description` is required
    
    
## Security
* All passwords are hashed using `bcrypt` with `10 salt rounds`
* Users are authenticated using `basic-auth` 
* User authentication is required to:
    * `get` the active user's info
    * `get` courses
    * `post` a new course
    * `put` an existing course
    * `delete` an existing course
    
    
