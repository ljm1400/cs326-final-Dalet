Data Flows:

User Objects: ID, Name, Email, Password, List of postID's
Post Objects: PostID, PostType, Title, description, images, Tags, ratings, comments 
Comment Objects included in posts: Title, comment body, user ID, post ID

API Ideas:

1. /user/:userID/login allows the user to log in (Benjamin)
2. /user/create creates a new user from signup information (done - Louis)
3. /user/update if we allow the user to update their profile information, this will be needed to update that specific user's information
4. /users returns a list of all users with {ID, email, pfpLink, and posts} (done - Louis)
5. /posts/create creates a new post when given the required information of PostType, Title, Description, >= 1 image. All other fields are optional. (done - Louis)
6. /posts/delete/:postId deletes a post with a given id (only shows option to delete if the currently logged in user is the user that created the post)
7. /posts a get request to get all of the posts from the database  (done - Louis)
8. /posts/climbing will get all of the posts that have a postType = climbing (done - Will)
9. /posts/hiking will get all of the posts that have postType = hiking (done - Will)
10. /posts/:user gets all of the posts that were created by the given user. Will be used for myPosts page.
11. /posts/:postId/comment adds the comment to postId's post. also passes the ID of the user who sent it (done - Ben)
12. /posts/:postId/rating adds the rating to postId's post. also passes the ID of the user who sent it (done - Ben)
13. /comment/:commentID/delete allows a comment to be deleted


Our Heroku Application: https://cs326-final-dalet.herokuapp.com/

