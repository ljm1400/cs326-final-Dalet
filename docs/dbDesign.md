DB 1: User

user {
  ID: number
  username: string
  name: string
  pfpLink: IMG Link (string)
  email: string
}

The database for Users has all of the information needed to identify a unique user. Each user has a unique ID #, username, and email. The pfpLink is the image file for the public profile. Each time a new user is added to the database, their ID increases by 1. We use password to authenticate users, and we keep their password in a separate file.

DB 2: Posts

posts {
  postID: number
  author: string
  title: string
  type: string
  description: string
  images: IMG Link (string)
  tags: string
  ratings: Array []
  comments: Array []
}

Within the DB for posts, there are two arrays, containing all of the different rating and comments that may be left on a post. Each post has a unique ID to help find the post later. Besides the rating and comment boxes, the rest of the information that gets stored in this DB comes directly from the "Create New Post" button on our site. When a new post is uploaded to the DB, the ratings and comment boxes are initialized as empty arrays.
