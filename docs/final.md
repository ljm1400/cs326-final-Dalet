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

#### Database: We used mongoDB for our database. We have two collections in the database, those being POSTS and USERS

__POSTS__
| NAME        | TYPE       | DESCRIPTION                          |
|-------------|------------|--------------------------------------|
| _id         | ObjectID() |                                      |
| author      | string     | username of poster                   |
| title       | string     | title of post                        |
| type        | string     | Climbing or Hiking                   |
| description | string     | Description of post                  |
| images      | []         | Array of all images of post          |
| tags        | string     | "Hiking, Climbing, easy, etc"        |
| ratings     | []         | Array of all ratings by other users  |
| comments    | []         | Array of all comments by other users |

__USERS__
| NAME     | TYPE       | DESCRIPTION               |
|----------|------------|---------------------------|
| _id      | ObjectId() |                           |
| username | string     | username for the user     |
| salt     | string     | generated using minicrypt |
| hash     | string     | generated using minicrypt |
| name     | string     | name of user              |
| pfpLink  | string     | Link to profile picture   |
| posts    | []         | List of posts by user     |
| email    | string     | email address of user     |

#### URL Routes/Mappings: 

|          Route         |                                     Description                                     |       Permissions      |
|:----------------------:|:-----------------------------------------------------------------------------------:|:----------------------:|
| /                      | The route to get the home page of the application that displays all posts           | none                   |
| /climbing              | The route to get the climbing page of the application that displays climbing posts  | none                   |
| /hiking                | The route to get the hiking page of the application that displays hiking posts      | none                   |
| /myPosts               | The route to get the myPosts page of the application for this user's posts          | login required to view |
| /signup                | The route to get the signup page of the application                                 | none                   |
| /login                 | The route to get the login page of the application                                  | none                   |


__Authentication__: We used passport.js to verify which user is which. The email and username provided in the login page must match a user in our database for a login to be successful. Some API endpoints are only accessible once a user has logged in, and the "My Posts" page can also only be accessed once someone has logged in. Users also must be logged in if they want to create a post. We do not let guests viewing the page create a post.

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
- Wireframes for milestone1.md
- Formatting of milestone3.md
- Backend code to connect to our database and extract/upload info
- Wrote API endpoints for user login, rating/commenting on posts, and deleting posts/comments
- Wrote documentation for any pictures uploaded in milestone docs
- Documentation of our database in milestone3.md
- Added database design to final.md

#### Conclusion: 
A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.
##### What we learned: 

##### Difficulties:
- __Technical Hurdle__: Communication. Eventually, we started pinging each other on slack to make sure we were all on the same page, but it took a while to get used to checking Slack everyday to see what work had been done/if work had been done that day
- __App Difficulty__: Rendering user uploaded images. The initial way we did this kept crashing our backend server because the file sizes for the images was too large. 
##### What would have helped to know earlier:
- Knowing that we could use passport.js would have helped to know earlier, as we could have built our user authentication around that from the start instead of having to go back and get what we already had working using passport.
