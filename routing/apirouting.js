import express from 'express';
import {registerUser, createBlog, readBlogs, isAuth, readBlogById, deleteBlogById, updateBlogById } from './utils/routingutils.js'

export const router = express.Router()

router.post('/register', registerUser);
router.post('/blog', isAuth, createBlog);
router.get('/blog', readBlogs);
router.get('/blog/:blogId', isAuth, readBlogById);
router.delete('/blog/:blogId', isAuth, deleteBlogById);
router.patch('/blog/:blogId', isAuth, updateBlogById);
router.get("/",(req, res) => {
    res.render("api")
})