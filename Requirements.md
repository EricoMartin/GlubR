# Project Requirements

---

### User stories

- [x] user can sign up
- [x] user can login
- [ ] user can post a blog
- [ ] user can view a post
- [ ] user can view all posts
- [ ] user can edit a post
- [ ] user can delete a post
- [ ] user can comment on a post
- [ ] user can like a post
- [ ] user can like a comment
- [x] user can sign out

### Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.
- **Testing**: Mocha, Supertest and Thunder client.
- **Deployment**: Docker, AWS.
- **CI/CD**: GitHub Actions.

### Models

###### Users

- id
- username
- email
- password
- profession
- gender
- firstname
- lastname

###### Posts

- id
- title
- content
- comments
- description
- authorId

###### Comments

- id
- authorId
- content
- postId

### Project Structure

| glubr          |
| -------------- |
| │ controllers/ |
| │ config/      |
| │ models/      |
| middlewares/   |
| │ routes/      |
| │ services/    |
| utils/         |
| app.js         |
| db/            |
| .gitignore     |
| .env           |
| package.json   |

### Features

#### Authentication

##### Signup

- Get user input
- Validate user input
- Check if user record does not exist in the system already.
- Encrypt user password
- Save user data in the database.

##### login

- Get user input
- Validate user input
- Check if user has an account in the system
- Validate password
- Create access token
- Return response

#### Create Post

- Validate user (check if they are still logged in).
- Validate post title to know if nobody has posted the exact same post before.
- Check if user has entered the required data.
- Save post in the database

#### Read Post

- Match post Id extracted from query parameter with the post id's in the database to check for its existence.
- If its exists, return the post. Else, return an error.

#### Comment on post

- Check if user id is valid
- Check if Post id is valid
- Check if comment's content is not empty
- Save comment

### Endpoints

| Feature | Route            | Http Method |
| ------- | ---------------- | ----------- |
| Signup  | /api/auth/signup | POST        |
| Login   | /api/auth/login  | POST        |

- Track project: [https://tinyurl.com/yc6senzx](https://tinyurl.com/yc6senzx)
