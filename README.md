# CC-node-react-project
## Team
### Mentor:
 - Arleta Jędrzejczak
### Authors:
 - Stanisław Gardzielewski 
 - Mariusz Olszewski 
 - Bartosz Ratajczyk
 - Urszula Wilk
## Tech stack
-   NodeJS
-   ExpressJS
-   MongoDB / mongoose
-   TypeScript
-   Jest
## Project description
The application allows you to view and add posts containing a title, photo, and tags. Users who are not logged in can view added posts, search by title or tags. If a user wants to add a post, he/she must register. Logged-in users can create new posts, edit and delete their own posts, as well as add the posts of other authors to favorites.
## List of functionalities
1.  Possibility to create an account
2.  Sending a verification email
3.  Ability to add a new post with:
	- photo
	- title
	- tags
4.  The ability to read the post - any user
5.  Possibility to edit the post - only the post author
6.  Possibility to delete a post - only the author of the post
7.  The ability to add comments - only logged in users (future version)
8.  Ability to add a post to your favorites (future version)
## Mongoose Schema
### User
`
    const UserSchema = new mongoose.Schema({
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      },
      password: {
        type: String,
        require: true,
      },
      favourites: {
        type: Array,
        default: [],
      },
      posts: {
        type: Array,
        default: [],
      },
    });
`
### Posts
`
    const PostsSchema = new mongoose.Schema({
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      author: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      comments: {
        type: Array,
        default: [],
      },
      tags: {
        type: [String],
        required: true,
        lowercase: true,
      },
      likes: {
        type: Number,
        default: 0,
      },
      image: {
        type: String,
        required: true,
      },
    });
`
## API documentation
### Allowed HTTPs requests:
GET: Get a resource with the given ID or list of resources
POST: Create a resource
PUT: Update a resource
PATCH: Update a resource
DELETE: Delete a resource

### Usual Server Responses:

-   `200 OK` - the request was successful
-   `201 Created` - the request was successful and a resource was created
-   `400 Bad Request` - the request could not be understood or was missing required parameters.
-   `401 Unauthorized` - authentication failed or user doesn't have permissions for requested operation.
-   `404 Not Found` - resource was not found.
-   `409 - Conflict` - the request could not be completed due to a conflict with the current state of the target resource.
-   `500 - Internal Server Error` - The server encountered an unexpected condition that prevented it from fulfilling the request

### Users Attributes

    id (Number): unique identifier
    name (String)
    email (String)
    password (String)
    posts (Array)
    favourites (Array)

### Posts Attributes

    id (Number) : unique identifier
    title (String) 
    tags (Array of strings)
    image (String)
    comments (Array)
    likes (Array of numbers)
    author (number)

### API endpoints
#### User - ./routes/users
`POST/routes/users/register` - for register a new users, required attributes name, email, password
`GET/routes/users/`- to get a list of all users
`GET/routes/users/login` - to login a user
`PATCH/edit/id` - to edit user details
`PATCH/addPost/id` - to add a new post
`PATCH/deletePost/id` - to delete an existing post
`PATCH/editName/id` - to edit user name

#### Posts - ./routes/posts
There are two types of synchronization and they can complement each other:
`POST/routes/posts` - for creating a post, required attributes: title, tags, image, author
`GET/routes/posts` - for list of all posts
`GET/routes/posts/postID` - to get the post with the given ID
`DELETE/routes/posts/postID` - to delete the post with the given ID
`PUT/routes/posts/edit/postID` - to change the posts’s title or tags