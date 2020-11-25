# Dalet #
## Klimbs ##
Steps to build and run application:

clone the repository: git clone https://github.com/ljm1400/cs326-final-Dalet

In the root directory of the application that was cloned:

### Install dependencies
npm install  

### Setup Database (MongoDB Atlas)

For steps to setup the database visit: https://docs.atlas.mongodb.com/getting-started/ and follow part 1-4

After creating the mongoDB user, create a file in the project root directory named secrets.json containing

{
    "USERNAME": "yourMongoUserUserName",
    "PASSWORD": "yourMongoUserUserPassword"
}

### Run Application

npm start

In a browser, go to: http://localhost:8080
