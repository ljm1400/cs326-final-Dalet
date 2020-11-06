const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('./client'))
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

app.get('/signup', (req, res) =>{
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
      ID: 1,
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

app.get('*', (req, res) => {
  res.send('No Route Found');
});

app.post('*', (req, res) => {
  res.send('No Route Found');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})