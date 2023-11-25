# API Documentation

## 1. Register User

- **Endpoint:** `POST /api/register`
- **Description:** Registers a new user. And returns you an API token. Save it!
- **Handler:** `registerUser`

## 2. Create Blog

- **Endpoint:** `POST /api/blog`
- **Description:** Creates a new blog post. Requires authentication.
- **Middleware:** `isAuth`
- **Handler:** `createBlog`

## 3. Read Blogs

- **Endpoint:** `GET /api/blog`
- **Description:** Retrieves a list of all blog posts.
- **Handler:** `readBlogs`

## 4. Read Blog by ID

- **Endpoint:** `GET /api/blog/:blogId`
- **Description:** Retrieves a specific blog post by its ID. Requires authentication.
- **Middleware:** `isAuth`
- **Handler:** `readBlogById`

## 5. Delete Blog by ID

- **Endpoint:** `DELETE /api/blog/:blogId`
- **Description:** Deletes a specific blog post by its ID. Requires authentication.
- **Middleware:** `isAuth`
- **Handler:** `deleteBlogById`

## 6. Update Blog by ID

- **Endpoint:** `PATCH /api/blog/:blogId`
- **Description:** Updates a specific blog post by its ID. Requires authentication.
- **Middleware:** `isAuth`
- **Handler:** `updateBlogById`
