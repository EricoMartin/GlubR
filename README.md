# GlubR - Blog API

### Introduction

**GlubR** is a cutting-edge blog platform API designed to empower developers to create a system for bloggers and creatives to engage their defined audiences while streamlining content management. Users can create, read, update and delete blog posts using the API endpoints.

### EndPoints

| Feature | Route             | Http Method |
| ------- | ----------------- | ----------- |
| Signup  | /api/auth/signup  | POST        |
| Login   | /api/auth/login   | POST        |
| Logout  | /api/auth/logout  | POST        |
| Create  | /api/glub/post    | POST        |
| Read    | /api/glub/:glubId | GET         |
| ReadAll | /api/glub/        | GET         |
| Update  | /api/glub/:glubId | PUT         |
| Delete  | /api/glub/:glubId | DELETE      |

### User stories

- [x] user can sign up
- [x] user can login
- [x] user can post a blog
- [x] user can view a post
- [x] user can view all posts
- [x] user can edit a post
- [x] user can delete a post
- [ ] user can comment on a post
- [ ] user can like a post
- [ ] user can like a comment
- [x] user can sign out
