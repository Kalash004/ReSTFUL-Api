import { query } from "../../dbconn.js"


export const checkNameSame = async (apikey, blogId) => {
    const nameFromApi = await query("SELECT name FROM user WHERE user.apikey = ?", [apikey])
    const nameFromBlogId = await query("SELECT jmeno FROM blog WHERE blog.blogId = ?", [blogId])
    console.log(nameFromApi + ":" + nameFromBlogId)
    return await (nameFromApi == nameFromBlogId)
}

export const isAuth = async (req, res, next) => {
    const getAllUsersApi = async () => {
        return await query('SELECT apikey FROM user')
    }
    const apikeys = await getAllUsersApi()
    const check = async () => {
        return await (!apikeys.find((key) => key.apikey == req.body.apikey))
    }
    const checked = await check()
    if (checked) {
        res.end("Not Authenticated")
    }
    next()
}

export const registerUser = async (req, res) => {
    const insertUser = async (jmeno, apikey) => {
        return await query('INSERT INTO user(name, apikey) VALUES (?,?)', [jmeno, apikey])
    }
    try {
        const apikey = Math.floor(Math.random() * 9999)
        await insertUser(req.body.jmeno, apikey)
        const resp = {
            message: `Registered, please save this key: ${apikey} `,
            apikey: apikey
        }
        res.send(resp)
    } catch (err) {
        console.log(err)
        res.end(err)
    }
}

export const createBlog = async (req, res) => {
    const insertBlog = async ({ jmeno, content }) => {
        return await query('INSERT INTO blog(jmeno, content) VALUES (?,?)', [jmeno, content]);
    }
    const getJmeno = async (apikey) => {
        return await query('SELECT name FROM user WHERE user.apikey = ?', [apikey])
    }
    try {
        const arrayDb = await getJmeno(req.body.apikey)
        const blog = {
            jmeno: arrayDb[0].name,
            content: req.body.content
        }
        console.log(blog)
        await insertBlog(blog)
        res.send("Added blog")
    } catch (err) {
        console.log(`${err}`)
        res.end(`Error : ${err}`)
    }

}
export const readBlogs = async (req, res) => {
    const getBlogsFromDb = async () => {
        const blog = await query("SELECT * FROM blog")
        return blog
    }
    try {
        const blog = await getBlogsFromDb()
        res.send(blog)
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}
export const readBlogById = async (req, res) => {
    const id = req.params.blogId
    const getBlogsFromDbById = async () => {
        const blog = await query("SELECT * FROM blog WHERE blogId = ? LIMIT 1", [id])
        return blog
    }
    try {
        const blog = await getBlogsFromDbById()
        res.send(blog)
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}
export const deleteBlogById = async (req, res) => {
    const id = req.params.blogId
    if (checkNameSame(req.body.apikey, id)) {
        res.end("Not your blog")
        return
    }
    const deleteBlogsFromDbById = async () => {
        await query("DELETE FROM blog WHERE blog.blogId = ?", [id])
    }
    try {
        await deleteBlogsFromDbById()
        console.log("Deleted")
        res.send("Deleted")
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}
export const updateBlogById = async (req, res) => {
    // UPDATE blog SET content = value WHERE blog.blogId = value
    if (checkNameSame(req.body.apikey, id)) {
        res.end("Not your blog")
        return
    }
    const id = req.params.blogId
    const content = req.body.content
    const updateBlogsFromDbById = async () => {
        await query("UPDATE blog SET content = ? WHERE blog.blogId = ?", [content, id])
    }
    try {
        await updateBlogsFromDbById()
        console.log("Updated")
        res.send("Updated")
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}
