'use strict'
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://walvarez:cs326dalet@cluster0.oig9w.mongodb.net/Cluster0?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

client.connect();

// var myobj = { name: "will", address: "37 philips" };
// const db = client.db("db");
// const coll = db.collection("test");

// coll.insertOne(myobj, function (err, res) { This is an example of an insert to the database
//   if (err)
//     throw err;
//   console.log("1 document inserted");
// });


const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
  client.close(); // Close MongodDB Connection when Process ends
  process.exit(); // Exit with default success-code '0'.
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

app.use(express.json({limit: '50mb'}));
app.use('/', express.static('./client'));
require('dotenv').config();
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy



const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
    async (username, password, done) => {
	if (!findUser(username)) {
	    // no such user
	    return done(null, false, { 'message' : 'Wrong username' });
	}
	if (!validatePassword(username, password)) {
	    // invalid password
	    // should disable logins after N messages
	    // delay return to rate-limit brute-force attacks
	    await new Promise((r) => setTimeout(r, 2000)); // two second delay
	    return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
    // should create a user object here, associated with a unique identifier
    let user = {
        ID: users[username].ID,
        username: username,
        name: users[username].name,
        pfpLink: users[username].pfpLink,
        email: users[username].email
    }
	return done(null, user);
    });


// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(express.urlencoded({'extended' : true})); // allow URLencoded data
let postId = 0;
let userId = 0;
let users = {};
let posts = [];
// Returns true iff the user exists.
function findUser(username) {
    if (!users[username]) {
	return false;
    } else {
	return true;
    }
}

// TODO
// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
function validatePassword(name, pwd) {
    if (!findUser(name)) {
	return false;
    }
	// TODO CHECK PASSWORD
    //const equal = mc.check(pwd, users[name][0], users[name][1]);
    console.log(name);
    console.log(pwd);
    let equal = users[name].password === pwd;
    return equal;
}

// Add a user to the "database".
// TODO
function addUser(username, pwd, name, email) {
    if (findUser(username)) {
	return false;
    }
	// TODO SAVE THE SALT AND HASH
    //const [salt, hash] = mc.hash(pwd);

    users[username] = {
        ID: userId++,
        username,
        password: pwd, 
        name: name,
        pfpLink: '.public/profile.png',
        posts: [],
        email
    };
    return true;
}

// Routes

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
	// Otherwise, redirect to the login page.
	res.redirect('/login');
    }
}


app.get('/',
	(req, res) => res.sendFile('client/login.html',
           { 'root' : __dirname }));

app.get('/climbing',
	(req, res) => res.sendFile('client/climbing.html',
           { 'root' : __dirname }));
           
app.get('/hiking',
	(req, res) => res.sendFile('client/hiking.html',
           { 'root' : __dirname }));
           
app.get('/myPosts', checkLoggedIn,
	(req, res) => res.sendFile('client/myPosts.html',
           { 'root' : __dirname }));

app.get('/signup',
	(req, res) => res.sendFile('client/signup.html',
           { 'root' : __dirname }));
 



app.post('/login', passport.authenticate('local' , {     // use username/password authentication
	     'successRedirect' : '/myPosts',   // when we login, go to /private 
	     'failureRedirect' : '/login'      // otherwise, back to login
     }));

app.get('/login',
	(req, res) => res.sendFile('client/login.html',
           { 'root' : __dirname }));
     
app.post('/register',
	 (req, res) => {
	     const username = req.body['username'];
         const password = req.body['password'];
         const confirmPassword = req.body['confirmPassword'];
         const email = req.body['email'];
         const name = req.body['name'];
         if(password !== confirmPassword){
             res.send(alert("Passwords do not match!"));
             res.redirect('/register');
         }
	     if (addUser(username, password, name, email)) {
		 res.redirect('/login');
	     } else {
             res.send("Passwords do not match");
		    res.redirect('/register');
	     }
     });

app.get('/user', checkLoggedIn,function(req, res){
    res.send(req.user);
    });

app.get('/users', checkLoggedIn, function(req, res){
    let sendUsers = {};
    for(const [key, value] of Object.entries(users)){
        sendUsers[key] = {
            username: value.username,
            ID: value.ID,
            posts: value.posts,
            pfpLink: value.pfpLink,
            name: value.name
        }
    }
    
    res.send(sendUsers);
})
app.get('/user/:username', checkLoggedIn,function(req, res){
    const username = req.params['username']
    let user = {
        username,
        name: users[username].name,
        pfpLink: users[username].pfpLink,
        posts: users[username].posts,
        ID: users[username].ID
    }
    res.send(user);
    });

app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});


app.post('/user/update', checkLoggedIn, (req, res) => {
    let name = req.body['name'];
    let email = req.body['email'];
    let pfpLink = req.body['pfpLink'];

    let user = users[req.user.username];
    name ? user.name = name : user.name = user.name;
    email ? user.email = email : user.email = user.email;
    pfpLink ? user.pfpLink = pfpLink : user.pfpLink = pfpLink;
    res.send({
        name,
        email,
        pfpLink
    });
  });

app.post('/posts/create', checkLoggedIn,(req, res) => {
    const title = req.body["title"];
    const files = req.body["files"];
    const type = req.body["type"];
    const description = req.body["description"];
    const tags = req.body["tags"];
    const author = req.user;
    let post = {
        ID: postId++,
        author: author.username,
        title: title,
        type: type,
        description: description,
        images: files,
        tags: tags,
        ratings: [],
        comments:[]
    }
    users[author.username].posts.push(post.ID);
    posts.push(post);
    
    res.send(JSON.stringify(post));
});


//Endpoint to get all posts
app.get('/posts', (req, res)=>{
    res.send(JSON.stringify(posts));
  });
  
  //Endpoint to get all posts of type 'climbing'
  app.get('/posts/climbing', (req, res)=>{
    const arr = [];
    for(let i = 0; i < posts.length; i++){
      if(posts[i].type.toLowerCase() === "climbing"){
        arr.push(posts[i]);
      }
    }
    res.send(JSON.stringify(arr));
  });
  
  //Endpoint to get all posts of type 'hiking'
  app.get('/posts/hiking', (req, res)=>{
    const arr = [];
    for(let i = 0; i < posts.length; i++){
      if(posts[i].type.toLowerCase() === "hiking"){
        arr.push(posts[i]);
      }
    }
    res.send(JSON.stringify(arr));
  });

  //Endpoint to get all the posts created by the provided user
app.get('/posts/myPosts', checkLoggedIn,(req, res)=>{
    const arr = [];
    let user = users[req.user.username];
    for(let j = 0; j < user.posts.length ; j++){
        let postNum = user.posts[j];
        arr.push(posts[postNum]);
    }
    res.send(JSON.stringify(arr));
  });

//Endpoint for a user to submit a comment on a post
app.post('/posts/:postId/comment', checkLoggedIn, (req, res) => {
    let newPostId = req.params["postId"];
    let newComment = req.body["comment"];
    let author = req.user.username;

    for (let post of posts) {
      let postID = post.ID;

        if (JSON.stringify(postID) === newPostId) {
            let retObj = {
                'author': author,
                'commentBody': newComment
            }
            post.comments.push(retObj);
        }
    }
    res.send("Comment Posted");
  });
  
  //Endpoint for a user to submit a comment on a post
  app.post('/posts/:postId/rating', checkLoggedIn, (req, res) => {
    
    let newPostId = req.params["postId"];
    let newRating = req.body["rating"];
    let author = req.user.username;
    
    for (let post of posts) {
      let postID = post.ID;

        if (JSON.stringify(postID) === newPostId) {
            let retObj = {
              'author': author,
              'post': newPostId,
              'rating': newRating
            }
            post.ratings.push(retObj);
        }
    }
    res.send("Rating Posted");
    
  });

app.get('*', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
    console.log(`App now listening at http://localhost:${port}`);
});