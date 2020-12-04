# Dalet
## Klimbs

#### Semester: 
Fall 2020

#### Overview: 

Our Klimbs application provides a platform for outdoor enthusiasts to share photos and experiences of rock climbing and hiking locations with others. Once users create an account and login, they can then view and create posts that include a title, an image or images, a description, a type (climbing or hiking), and a list of tags. Users can view the main feed of all posts on the home page, or can navigate to the climbing or hiking specific pages to view posts of only that type. They can also view a page with all of the posts that they have created, which provides an easy way for the user to delete their own posts if they wish to do so. On their "My Posts" page, the user can also change some of their profile information, including their email, name, and profile picture. 

Our application is innovative in the sense that there are no other applications to our knowledge that are focused exclusively on sharing posts for outdoor activities such as climbing and hiking. We would hope that this platform could provide an opportunity for poeple to build a community in which they can share experiences and locations that other users may also be able to visit and experience. 
#### Team Members:  

| Team Member       | Github Alias |
|-------------------|--------------|
| Louis Martin      | ljm1400      |
| Benjamin Hamilton | Bkhamilton   |
| William Alvarez   | Willaby292   |

#### User Interface: 
A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.

#### APIs: 

|      API Endpoint      |                                     Description                                     |       Permissions      |
|:----------------------:|:-----------------------------------------------------------------------------------:|:----------------------:|
| /login                 | User login credentials are sent in JSON format to authenticate the user             | none                   |
| /register              | New user credentials are sent as JSON including username, password, email and name  | none                   |
| /user                  | Returns the currently logged in user in JSON format                                 | login required         |
| /users                 | Returns all of the users (minus password info) in JSON format                       | none                   |
| /user/:username        | Returns a specific user of a certain username (minus password info) in JSON format  | login required         |
| /logout                | Logs out the currently logged in user                                               | none                   |
| /user/update           | Updates information for the currently logged in user, received in JSON format       | login required         |
| /posts/create          | Receives new post information to create a new post object in the database           | login required         |
| /posts                 | Returns an array of post objects in JSON format                                     | none                   |
| /posts/climbing        | Returns an array of post objects of type climbing in JSON format                    | none                   |
| /posts/hiking          | Returns an array of post objects of type hiking in JSON format                      | none                   |
| /posts/myPosts         | Returns an array of post objects created by the currently logged in user as JSON    | login required         |
| /posts/:postId/comment | Receives a comment object in JSON format to add to the post with given postId       | login required         |
| /posts/:postId/rating  | Receives a rating value in JSON format to add to the post with given postId         | login required         |
| /posts/:postId/delete/ | Deletes a post of a given postId from the database                                  | login required         |
| /*                     | Catches all bad requests, gives the user an error that the page is not found        | none                   |

#### Database: 
A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.

#### URL Routes/Mappings: 

|          Route         |                                     Description                                     |       Permissions      |
|:----------------------:|:-----------------------------------------------------------------------------------:|:----------------------:|
| /                      | The route to get the home page of the application that displays all posts           | none                   |
| /climbing              | The route to get the climbing page of the application that displays climbing posts  | none                   |
| /hiking                | The route to get the hiking page of the application that displays hiking posts      | none                   |
| /myPosts               | The route to get the myPosts page of the application for this user's posts          | login required to view |
| /signup                | The route to get the signup page of the application                                 | none                   |
| /login                 | The route to get the login page of the application                                  | none                   |


#### Authentication/Authorization: 
A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

#### Division of Labor: 

##### Louis:
- Initial HTML and CSS for Home page,Hiking, and Climbing section of the site.
- Formatting of milestone1.md.
- Front end creation and updating of users.
- Front end getting and rendering posts from backend.
- Front end creation of a post.
- Incorporated passport.js into server for user authentication.
- Incorporated minicrypt for hashing passwords.
- Implemented user login and registration, myPost rendering, adding comments and ratings and post deletion routes between backend and database.
- Added updated routes and API endpoints to final.md.

##### William:

##### Benjamin: 

#### Conclusion: 
A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.
##### What we learned: 

##### Difficulties:

##### What would have helped to know earlier:
- Knowing that we could use passport.js would have helped to know earlier, as we could have built our user authentication around that from the start instead of having to go back and get what we already had working using passport.