Data Flows:

User Objects: ID, Name, Email, Password, List of postID's
Post Objects: PostID, PostType, Title, description, images, Tags, ratings, comments 
Comment Objects included in posts: Title, comment body, user ID, post ID

API Ideas:

/login allows the user to log in
/signup creates a new user from signup information
/user/update if we allow the user to update their profile information, this will be needed to update that specific user's information
/post/new creates a new post when given the required information of PostType, Title, Description, >= 1 image. All other fields are optional.
/posts a get request to get all of the posts from the database
/posts/climbing will get all of the posts that have a postType = climbing
/posts/hiking will get all of the posts that have postType = hiking
/comment/new takes a postID and creates a new comment on that post

We should not need a separate API endpoint for getting a list of comments from a post, as the comment objects are stored in each post (If we are using a mongoDB)
