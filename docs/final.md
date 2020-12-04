# Dalet
## Klimbs

#### Semester: 
Fall 2020
#### Overview: 
A brief overview of your application. This will be based on what you are submitting as your final web application artifact. You should also mention why your application is innovative.

#### Team Members:  

| Team Member       | Github Alias |
|-------------------|--------------|
| Louis Martin      | ljm1400      |
| Benjamin Hamilton | Bkhamilton   |
| William Alvarez   | Willaby292   |

#### User Interface: 
A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.

#### APIs: 
A final up-to-date list/table describing your application’s API

#### Database: 
A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.

#### URL Routes/Mappings: 
A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.
|          Route         |                                     Description                                     |       Permissions      |
|:----------------------:|:-----------------------------------------------------------------------------------:|:----------------------:|
| /                      | The route to get the home page of the application                                   | none                   |
| /climbing              | The route to get the climbing page of the application                               | none                   |
| /hiking                | The route to get the hiking page of the application                                 | none                   |
| /myPosts               | The route to get the myPosts page of the application                                | login required to view |
| /signup                | The route to get the signup page of the application                                 | none                   |
| /login                 | (get request) The route to get the login page of the application                    | none                   |
| /login                 | (post request) The route to login and authenticate a user                           | none                   |
| /register              | The route to register a new user including username, password, email and name       | none                   |
| /user                  | Route to get the currently logged in user                                           | login required         |
| /users                 | Route to get all of the users from the database                                     | none                   |
| /user/:username        | Route to get a specific user from the database                                      | login required         |
| /logout                | Route to logout the user                                                            | none                   |
| /user/update           | Route to update information for the currently logged in user                        | login required         |
| /posts/create          | Route to create a new post                                                          | login required         |
| /posts                 | Route to get all of the posts                                                       | none                   |
| /posts/climbing        | Route to get all posts of type climbing                                             | none                   |
| /posts/hiking          | Route to get all posts of type hiking                                               | none                   |
| /posts/myPosts         | Route to get all posts for the currently logged in user                             | login required         |
| /posts/:postId/comment | Route to add a comment to a post with the given id                                  | login required         |
| /posts/:postId/rating  | Route to add a rating to a post with the given id                                   | login required         |
| /posts/:postId/delete/ | Route to delete a post of a given id                                                | login required         |
| /*                     | Route to catch all bad requests, gives the user an error that the page is not found | none                   |

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
- Implemented user login and registration, myPost rendering, adding comments and ratings and post deletion routes between backend and database

##### William:

##### Benjamin: 

#### Conclusion: 
A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.
##### What we learned: 

##### Difficulties:

##### What would have helped to know earlier:

