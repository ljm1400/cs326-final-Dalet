Data Flows:

User Objects: ID, Name, Email, Password, List of postID's
Post Objects: PostID, PostType, Title, description, images, Tags, ratings, comments 
Comment Objects included in posts: Title, comment body, user ID, post ID

API Ideas:

1. /user/:userID/login allows the user to log in
2. /user/create creates a new user from signup information (done - Louis)
3. /user/update if we allow the user to update their profile information, this will be needed to update that specific user's information
4. /user/:userID/delete allows a user to delete their account given the correct userID, email and password
5. /posts/create creates a new post when given the required information of PostType, Title, Description, >= 1 image. All other fields are optional. (done - Louis)
6. /posts/delete/:postId deletes a post with a given id (only shows option to delete if the currently logged in user is the user that created the post)
7. /posts a get request to get all of the posts from the database  (done - Louis)
8. /posts/climbing will get all of the posts that have a postType = climbing
9. /posts/hiking will get all of the posts that have postType = hiking
10. /comment/create takes a postID and creates a new comment on that post
11. /comment/:commentID/delete allows a comment to be deleted
12. /rating/:postId/create adds a new rating to a given post
