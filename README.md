# GlubR - Blog API

### Introduction

**GlubR** is a cutting-edge blog platform API designed to empower developers to create a system for bloggers and creatives to engage their defined audiences while streamlining content management. Users can create, read, update and delete blog posts using the API endpoints.

### EndPoints

| Feature | Route                     | Http Method |
| ------- | ------------------------- | ----------- |
| Signup  | /api/auth/signup          | POST        |
| Login   | /api/auth/login           | POST        |
| Logout  | /api/auth/logout          | POST        |
| Create  | /api/glub/post            | POST        |
| Read    | /api/glub/:glubId         | GET         |
| ReadAll | /api/glub/                | GET         |
| Update  | /api/glub/:glubId         | PUT         |
| Delete  | /api/glub/:glubId         | DELETE      |
| Comment | /api/comment/             | POST        |
| Like    | /api/glub/:glubId/like    | POST        |
| Unlike  | /api/glub/:glubId/dislike | POST        |

### User stories

- [x] user can sign up
- [x] user can login
- [x] user can post a blog
- [x] user can view a post
- [x] user can view all posts
- [x] user can edit a post
- [x] user can delete a post
- [x] user can comment on a post
- [x] user can like a post
- [x] user can unlike a post
- [x] user can sign out

## Setting up locally

- Clone this repository to your local machine
- You need to have Node and Express installed
- Create an account on MongoDB Atlas or install MongoDB locally
- Create `.env` file.
- Use the format in `.env-sample` file to configure the API
- Add your database credentials in the `.env` file. i.e DATABASE_URL
- Run `npm install` to install dependencies
- Start app with `npm start`

### Project Tracker

[Trello Link](https://tinyurl.com/yc6senzx)
