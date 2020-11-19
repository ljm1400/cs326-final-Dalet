'use strict'
let secrets;
let password;
let username;
if (!process.env.PASSWORD) {
secrets = require('./secrets.json');
username = secrets.USERNAME;
password = secrets.PASSWORD;
} else {
  username = process.env.USERNAME
	password = process.env.PASSWORD;
}
console.log(username);
console.log(password);
const uri = `mongodb+srv://${username}:${password}@cluster0.oig9w.mongodb.net/Cluster0?retryWrites=true&w=majority`;
console.log(uri);
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
    client.close(); // Close MongodDB Connection when Process ends
    process.exit(); // Exit with default success-code '0'.
  }
  
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
client.connect(err => {
  if (err) {
      console.error(err);
  }else{
    console.log("DB connected")
  }
  
});
//Adds a new user to the database
function addUser(user){
	let db = client.db("mydb");
	db.collection("Users").insertOne(user, function(err, res) {
		if (err) throw err;
    		console.log("User " + user.name + " inserted");
  	});
}

//gets a user with a given username from the database
function getUser(username){

}

//updates a given user's information from newUserInfo
function updateUser(username, newUserInfo){

}

//gets all of the users from the database, modified to not include sensitive information
function getUsers(){

}

//adds a newly created post to the database
function createPost(post){

}

//gets all of the posts from the database
function getPosts(){

}

//gets all of the posts from the database of type climbing
function getClimbingPosts(){

}

//gets all of the posts from the database of type hiking
function getHikingPosts(){

}

//update a given 
function updatePost(postId, newPostInfo){

}
