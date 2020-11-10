const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json({limit: '50mb'}));
app.use('/', express.static('./client'))
let postId = 2;
let userId = 2;
let datastore = {
  users:[
    {
      ID: "1",
      name:"Tester",
      email:"test@gmail.com",
      password:"testPassword",
      posts: [1],
      pfpLink: './public/profile.png'
    
    }
  ],
  posts:[
    {
      ID: 1,
      userID: "1",
      title: "Test",
      type: "climbing",
      description: "This is the description",
      images: [
        {
          lastModified: 1604255037971,
          lastModifiedDate: '2020-11-01T18:23:57.971Z',
          name: 'hiking1.jpg',
          size: 211018,
          type: 'image/jpeg',
          url: 'https://youdidwhatwithyourweiner.com/wp-content/uploads/2017/03/Small-Dog-HIking-Trend-Slider2.jpg'
        },
        {
          lastModified: 1604255037688,
          lastModifiedDate: '2020-11-01T18:23:57.688Z',
          name: 'hiking2.jpg',
          size: 3623647,
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        }
      ],
      tags: [],
      ratings: [],
      comments:[
        {
          user: 1,
          post: 1,
          commentBody: "Test Comment Body"
        }
      ]

  
    }
  ]
};

app.get('/user/create', (req, res) =>{
  const email = req.query.email;
  const password = req.query.password;
  let exists = false;
  for(let person of datastore.users){
    if(email === person.email){
      exists = true;
    }
  }
  if(exists){
    res.send("The user already exists!")
  }
  else{
    let user = {
      ID: JSON.stringify(userId++),
      name:"",
      email:email,
      password: password,
      posts: [],
      pfpURL: './public/profile.png'
    }
    datastore.users.push(user);
    console.log(user);
    res.send(JSON.stringify(user));
  }
});

app.post('/user/:userID/update', (req, res) => {
  let name = req.body['name'];
  let email = req.body['email'];
  let pfpLink = req.body['pfpLink'];
  let ID = req.params['userID'];
  let user = {};
  let idx = 0;
  let userIdx = -1;
  for(let person of datastore.users){
   
    if(person.ID === ID){
      user.name = person.name;
      user.pfpLink = person.pfpLink;
      user.email = person.email;
      user.ID = person.ID;
      user.posts = person.posts;
      user.password = person.password;
      userIdx = idx;

    }
    ++idx;
  }
  if(userIdx !== -1){
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.pfpLink = pfpLink ? pfpLink : user.pfpLink;
    datastore.users[userIdx] = user;
    res.send(JSON.stringify({
      ID: user.ID,
      email: user.email,
      name:user.name,
      pfpLink: user.pfpLink,
      posts: user.posts
    }));
  }
  else{
    res.send(JSON.stringify(
      {ID: '-1'}
    ));
  }
  
});

app.post('/user/login', (req, res) => {
  const email = req.body['email'];
  const password = req.body['password'];
  let login = false;
  let person = {};
  for(let user of datastore.users){
    if(user.email === email && user.password === password){
      login = true;
      person.ID = user.ID;
      person.email = user.email;
      person.posts = user.posts;
      person.pfpLink = user.pfpLink;
      person.posts = user.posts;
      person.name = user.name;
    }

  }
  res.send(JSON.stringify({login, person}));
});

app.get('/users', (req, res) =>{
  let users = [];
  for(let user of datastore.users){
    let newUser = {
      ID: user.ID,
      email: user.email,
      name: user.name,
      posts:user.posts,
      pfpLink: user.pfpLink
    }
    users.push(newUser);
  }
  res.send(JSON.stringify(users));
});

app.post('/posts/create', (req, res) => {
  const title = req.body["title"];
  const files = req.body["files"];
  const type = req.body["type"];
  const description = req.body["description"];
  const tags = req.body["tags"];
  const userID = req.body["userID"];
  console.log(typeof userID + " userID create " + userID);
  let post = {
      ID: JSON.stringify(postId++),
      userID: userID,
      title: title,
      type: type,
      description: description,
      images: files,
      tags: tags,
      ratings: [],
      comments:[]
  }
  for(let i = 0; i < datastore.users.length; i++){
    if(datastore.users[i].ID === userID){
      datastore.users[i].posts.push(post.ID);
    }
  }
  datastore.posts.push(post);
  res.send(JSON.stringify(post));
});

app.get('/posts', (req, res)=>{
  res.send(JSON.stringify(datastore.posts));
});

app.get('/posts/climbing', (req, res)=>{
  const arr = [];
  for(let i = 0; i < datastore.posts.length; i++){
    if(datastore.posts[i].type.toLowerCase() === "climbing"){
      arr.push(datastore.posts[i]);
    }
  }
  res.send(JSON.stringify(arr));
});


app.get('/posts/hiking', (req, res)=>{
  const arr = [];
  for(let i = 0; i < datastore.posts.length; i++){
    if(datastore.posts[i].type.toLowerCase() === "hiking"){
      arr.push(datastore.posts[i]);
    }
  }
  res.send(JSON.stringify(arr));
});

app.get('/posts/myPosts', (req, res)=>{
  const arr = [];
  for(let i = 0; i < datastore.users.length; i++){
    if(datastore.users[i].ID === req.query.user){
      const userJson = datastore.users[i]; 
      for(let j = 0; j < userJson.posts.length; j++){
        let postNum = userJson.posts[j] - 1;
        arr.push(datastore.posts[postNum]);
     }
    }
  }
  res.send(JSON.stringify(arr));
});

app.get('*', (req, res) => {
  res.send('No Route Found');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});