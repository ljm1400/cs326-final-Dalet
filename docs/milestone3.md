__Collection 1: Users__

**Users** {    
  _id: ObjectID()            //unique id assigned by Mongo   
  username: string           //JSmith2454 - the username that the user uses on login  
  name: string               //John Smith - the user's name that will show up on posts and comments.  
  salt: string               //the salt that is hashed with the user password for authentication  
  hash: string               //the hash of the user's password and the generated salt for that user.  
  pfpLink: string            //A created link for the user's profile picture, used for rendering on their posts and comments    
  email: string              //JSmith@notreal.com - the user's email. Not functionally used for anything in the app yet, but could be used for password recovery, etc.  
}  

The database for Users has all of the information needed to identify a unique user. Each user has a unique ID #, username, and email. The pfpLink is the image file for the public profile. Each time a new user is added to the database, their ID increases by 1. We use password to authenticate users, and we keep their password in a separate file.

Functions of DB 1:
- Used to authenticate login information
- Going to "My Posts" shows all posts in our DB 2 where posts.author === users.username

__Collection 2: Posts__

**Posts** {  
  _id: ObjectID()       //unique id assigned by Mongo  
  ID: number            //number assigned by the server when a new post is made. Used for referencing the posts in HTML elements  
  author: string        //The username of the user that made the post   
  title: string         //The title that a user assigns to this post   
  type: string          //Hiking or Climbing, the type of post selected by the user  
  description: string   //The post description  
  images: Array [string]//An array of image links that were uploaded by the user   
  tags: string          //The tags for the post. Hiking, climbing, easy, difficult, etc.    
  ratings: Array []     //An array of rating objects that have been submitted on the post, in the form {author: string, rating: number} where author = username of the author  
  comments: Array []    //An array of comment objects of the post, in the form {author: string, commentBody: string} where author = username of the author  
}  

Within the DB for posts, there are two arrays, containing all of the different rating and comments that may be left on a post. Each post has a unique ID to help find the post later. Besides the rating and comment boxes, the rest of the information that gets stored in this DB comes directly from the "Create New Post" button on our site. When a new post is uploaded to the DB, the ratings and comment boxes are initialized as empty arrays.

Functions of DB 2:
- Adding ratings/comments: pushes new info into proper Array
- Only posts with type "Hiking" will be shown in the hiking section, and vice-versa with Climbing
- Searching for specific tags grabs all posts in the DB that match that tag
- Author of post will see post listed on myPosts page

DIVISION OF LABOR:
- **Ben**
  - Wrote back-end functions for our MongoDB
  - Wrote documentation for our database

- **William**


- **Louis**
  - Incorporated passport.js into server for user authentication
  - Added some info to registration page, switched over to using username/password for login
  - Incorporated mincrypt for hashing passwords

