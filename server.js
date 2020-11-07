const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
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
      type: "c",
      description: "This is the description",
      images: [],
      tags: [],
      ratings: [],
      comments:[
        {
          user: 1,
          post: 1,
          commentTitle:"Test Comment",
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
    console.log("Pushing user: " + JSON.stringify(user));
    datastore.users.push(user);
    res.send(JSON.stringify(user));
  }
})

app.post('/post/create', (req, res) => {
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
  console.log("Pushing post: " + JSON.stringify(post));
  datastore.posts.push(post);
  res.send(JSON.stringify(post));
});

app.get('*', (req, res) => {
  res.send('No Route Found');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})