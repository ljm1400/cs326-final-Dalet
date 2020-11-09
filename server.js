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
      ID: 1,
      name:"Tester",
      email:"test@gmail.com",
      password:"testPassword",
      posts: [1]
    
    }
  ],
  posts:[
    {
      ID: 1,
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
      ID: userId++,
      name:"",
      email:email,
      password: password,
      posts: []
    }
    datastore.users.push(user);
    res.send(JSON.stringify(user));
  }
})

app.post('/posts/create', (req, res) => {
  const title = req.body["title"];
  const files = req.body["files"];
  const type = req.body["type"];
  const description = req.body["description"];
  const tags = req.body["tags"];
  let post = {
      ID: postId++,
      title: title,
      type: type,
      description: description,
      images: files,
      tags: tags,
      ratings: [],
      comments:[]
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

app.get('*', (req, res) => {
  res.send('No Route Found');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})