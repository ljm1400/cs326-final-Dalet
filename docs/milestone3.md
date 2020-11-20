DB 1: Users

Users {
  ID: number                 //2
  username: string           //JSmith2454
  name: string               //John Smith
  pfpLink: IMG Link (string) //Public Profile Pic
  email: string              //JSmith@notreal.com
}

The database for Users has all of the information needed to identify a unique user. Each user has a unique ID #, username, and email. The pfpLink is the image file for the public profile. Each time a new user is added to the database, their ID increases by 1. We use password to authenticate users, and we keep their password in a separate file.

Functions of DB 1:
-Used to authenticate login information
-Going to "My Posts" shows all posts in our DB 2 where posts.author === users.username

DB 2: Posts

posts '{'
  postID: number        //Incremented every time a new post is made
  author: string        //Who made the post
  title: string         //Name of Hiking Place
  type: string          //Hiking or Climbing
  description: string    
  images: Array []      //Contains All images added to post
  tags: string          //Whatever tags are interesting. Hiking, climbing, easy, difficult, etc.
  ratings: Array []
  comments: Array []
'}'

Within the DB for posts, there are two arrays, containing all of the different rating and comments that may be left on a post. Each post has a unique ID to help find the post later. Besides the rating and comment boxes, the rest of the information that gets stored in this DB comes directly from the "Create New Post" button on our site. When a new post is uploaded to the DB, the ratings and comment boxes are initialized as empty arrays.

Functions of DB 2:
-Adding ratings/comments: pushes new info into proper Array
-Only posts with type "Hiking" will be shown in the hiking section, and vice-versa with Climbing
-Searching for specific tags grabs all posts in the DB that match that tag
-Author of post will see post listed on myPosts page

DIVISION OF LABOR:
Ben
- Added CRUD functions for both collections of our MongoDB

William


Louis
