'use strict';
let secrets;
let password;
let username;
if (!process.env.PASSWORD) {
secrets = require('./secrets.json');
username = secrets.USERNAME;
password = secrets.PASSWORD;
} else {
  username = process.env.USERNAME;
	password = process.env.PASSWORD;
}

const uri = `mongodb+srv://${username}:${password}@cluster0.oig9w.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const cleanup = () => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
    client.close(); // Close MongodDB Connection when Process ends
    process.exit(); // Exit with default success-code '0'.
  };
  
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
client.connect(err => {
  if (err) {
      console.error(err);
  }else{
    console.log("DB connected");
  }
  
});
//Adds a new user to the database
async function addUser(user){
	await client.db("mydb").collection("Users").insertOne(user, function(err) {
		if (err) { throw err };
      	console.log("User " + user.name + " inserted");
	});
}

//gets a user with a given username from the database
async function getUser(username){
	const user = await client.db('mydb').collection('Users').findOne({username : username});
	return user;
}

//updates a given user's information from newUserInfo
async function updateUser(username, newUserInfo){
	const updateInfo = {};
	newUserInfo.name ? updateInfo['name'] = newUserInfo.name : null;
	newUserInfo.email ? updateInfo['email'] = newUserInfo.email: null;
	newUserInfo.pfpLink ? updateInfo['pfpLink'] = newUserInfo.pfpLink: null;
	await client.db('mydb').collection('Users').updateOne({username: username}, {$set: updateInfo}, function(err, res) {
		if (err) { throw err };
    		console.log("User " + username + " updated");
  	});
}

//gets all of the users from the database, modified to not include sensitive information
async function getUsers(){
	const allUsers = await client.db("mydb").collection("Users").find().toArray();
	return allUsers;
}

//adds a newly created post to the database
async function createPost(post){
	await client.db("mydb").collection("Posts").insertOne(post, function(err, res) {
		if (err) { throw err }
    		console.log("Post " + post.postID + " inserted");
  	});
}

//gets all of the posts from the database
async function getPosts(){
	const allPosts = await client.db("mydb").collection("Posts").find().toArray();
	return allPosts;
}

//gets all of the posts from the database of type climbing
async function getClimbingPosts(){
	let allClimbing = await client.db("mydb").collection("Posts").find({type:"Climbing"}).toArray();
	return allClimbing;
}

//gets all of the posts from the database of type hiking
async function getHikingPosts(){
	let allHiking = await client.db("mydb").collection("Posts").find({type:"Hiking"}).toArray();
	return allHiking;
}

//update a given 
async function updatePost(postID, newPostInfo){	
	await client.db('mydb').collection('Posts').updateOne({postID: postID}, {$set: {newPostInfo}}, function(err, res) {
		if (err) { throw err };
    		console.log("Post " + postID + " updated");
  	});	
}

async function addComment(postID, comment) {
	await client.db('mydb').collection('Posts').updateOne({postID: postID}, {$push: {"Comments": comment}}, function(err, res) {
		if (err) { throw err };
    		console.log("Comment for Post " + postID + " added");
  	});
}

async function addRating(postID, rating) {
	await client.db('mydb').collection('Posts').updateOne({postID: postID}, {$push: {"Ratings": rating}}, function(err, res) {
		if (err) { throw err };
    		console.log("Rating to Post " + postID + " added");
  	});
}

//Removes post[postID] from database
async function deletePost(postID) {
	await client.db('mydb').collection('Posts').deleteOne({postID: postID}, function(err, obj) {
    		if (err) { throw err };
    		console.log("Post deleted");
  	});
}
	
module.exports = {
  addUser,
  getUser,
  updateUser,
  getUser,
  getUsers,
  createPost,
  getPosts,
  getClimbingPosts,
  getHikingPosts,
  updatePost,
  deletePost
};
