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

Our Screenshots:

![signup](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/SignupPage.JPG)
This is our sign up page. If the password and confirm Password boxes match, an alert pops up letting you know you've successfully made an account. The account gets stored in our server so it can tell if someone trying to log in has made an account already

![login](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/LoginPage.JPG)
The login page looks similar to the sign up page. If the email and password provided match an email and password in our database, then you will be successfully logged in. Otherwise, you have to sign up first. If you successfully login, you will be directed to the "My Posts" page

![EditUserInfo](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/EditUserInfo.JPG)
![EditUserInfoBack](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/EditUserInfoBack.JPG)
These two screenshots show the function of the Edit User Info button. The first screenshot shows the pop-up window where you can update whatever information you are updating and the second screenshot is the response from the page after hitting the submit button. This updates the user's information inside our database, keeping the userId the same but changing whatever information is needed.

![CreatePost](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/CreatePost.JPG)
When the submit button is pressed, this will create a new post and add it to our database. The "What type of post is this?" question decides whether it will show up under the hiking or climbing tab. After hitting submit, you will be able to find your post in the "My Posts" page

![PostCreated](https://github.com/ljm1400/cs326-final-Dalet/blob/master/docs/Milestone2Screens/PostCreated.JPG)
This is what our page displays after a new post has been created. The buttons for comment, comments, and rate are all collapsable and bring up text boxes that contain their information. If a new comment or rating is submitted for a post, it will update the post's information in the database.
