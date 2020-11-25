'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./db.js');
app.use(express.json({limit: '50mb'}));
app.use('/', express.static('./client'));
require('dotenv').config();
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const minicrypt = require('./miniCrypt.js');
const mc = new minicrypt();
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
    const getUser = await db.getUser(username);
    const user = {
        _id: getUser._id,
        username: username,
        name: getUser.name,
        pfpLink: getUser.pfpLink,
        email: getUser.email
    };
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


// Returns true iff the user exists.
async function findUser(username) {
    const user = await db.getUser(username);
    if (!user) {
	return false;
    } else {
	return true;
    }
}


// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
async function validatePassword(name, pwd) {
    if (!findUser(name)) {
	return false;
    }
    const user = await db.getUser(name);
    const equal = false;
    if(!user){
        equal = false;
    }
    else{
       equal = mc.check(pwd, user.salt, user.hash);
    }
    
    return equal;
}

// Add a user to the "database".
async function addUser(username, pwd, name, email) {
    if (await findUser(username)) {
	return false;
    }
	
    const [salt, hash] = mc.hash(pwd);

    const user  = {
        username,
        salt: salt,
        hash: hash, 
        name: name,
        pfpLink: './public/profile.png',
        posts: [],
        email
    };
    db.addUser(user);
    return true;
}

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
    // Otherwise, redirect to the login page.
	res.redirect('/login');
    }
}

function checkUser(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
	// Otherwise, redirect to the login page.
	res.send({_id: -1});
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
            res.redirect('/signup');
        }
        if (addUser(username, password, name, email)) {
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    });

app.get('/user', checkUser,function(req, res){

    res.send(JSON.stringify(req.user));
    });

app.get('/users', async function(req, res){
    const sendUsers = {};
    const users = await db.getUsers();
    for(const user of users){
        sendUsers[user.username] = {
            username: user.username,
            ID: user._id,
            posts: user.posts,
            pfpLink: user.pfpLink,
            name: user.name
        };
    }
    res.send(JSON.stringify(sendUsers));
});
app.get('/user/:username', checkLoggedIn, async function(req, res){
    const username = req.params['username'];
    const user = db.getUser(username);
    const sendUser = {
        username: user.username,
        ID: user._id,
        posts: user.posts,
        pfpLink: user.pfpLink,
        name: user.name
    }
    res.send(sendUser);
    });

app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});

app.post('/user/update', checkLoggedIn, (req, res) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const pfpLink = req.body['pfpLink'];
    const user = {
        name: null,
        email: null,
        pfpLink: null
    }
    
    user.name = name ? name : null;
    user.email = email ? email : null;
    user.pfpLink  = pfpLink ? pfpLink : null;
    db.updateUser(req.user.username, user);
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
    const post = {
        author: author.username,
        title: title,
        type: type,
        description: description,
        images: files,
        tags: tags,
        ratings: [],
        comments:[]
    };
    db.createPost(post);
    
    res.send(JSON.stringify(post));
});


//Endpoint to get all posts
app.get('/posts', async (req, res)=>{
    const allPosts = await db.getPosts();
    res.send(allPosts);
  });
  
  //Endpoint to get all posts of type 'climbing'
  app.get('/posts/climbing', async (req, res)=>{
    const climbingPosts = await db.getClimbingPosts();
    res.send(JSON.stringify(climbingPosts));
  });
  
  //Endpoint to get all posts of type 'hiking'
  app.get('/posts/hiking', async (req, res)=>{
    const hikingPosts = await db.getHikingPosts();
    res.send(JSON.stringify(hikingPosts));
  });

  //Endpoint to get all the posts created by the provided user
app.get('/posts/myPosts', checkLoggedIn, async (req, res)=>{
    const myPosts = await db.getMyPosts(req.user.username);
    res.send(JSON.stringify(myPosts));
  });

//Endpoint for a user to submit a comment on a post
app.post('/posts/:postId/comment', checkLoggedIn, (req, res) => {
    const newPostId = req.params["postId"];
    const newComment = req.body["comment"];
    const author = req.user.username;
    const retObj = {
        'author': author,
        'commentBody': newComment
    };
    db.addComment(newPostId, retObj);
    res.send("Comment Posted");
  });
  
  //Endpoint for a user to submit a comment on a post
  app.post('/posts/:postId/rating', checkLoggedIn, (req, res) => {
    
    const newPostId = req.params["postId"];
    const newRating = req.body["rating"];
    const author = req.user.username;
    const retObj = {
        'author': author,
        'rating': newRating
      };
    db.addRating(newPostId, retObj);
    res.send("Rating Posted");
    
  });

    //Endpoint for a user to delete a post
    app.delete('/posts/:postId/delete/', checkLoggedIn, (req, res) => {
        const postId = req.params["postId"];
        db.deletePost(postId);
        res.send("Deleted Post");
    });



app.get('*', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
    console.log(`App now listening at http://localhost:${port}`);
});