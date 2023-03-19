import express from "express";
import {Blogs} from "./blogs";
import {Mods} from "./mods";

Blogs.init()
Mods.init()

const app = express()

app.use(function (req, res, next) {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        let query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
    } else {
        next()
    }
})

app.use("/", express.static("public", {
    extensions: ["html"]
}))

app.use("/blog/", express.static("dist_blogs", {
    extensions: ["html"]
}))

app.get("/api/blogs", (req, res) => {
    res.json(Blogs.getBlogs())
});
app.get("/api/mods", (req, res) => {
    res.json(Mods.getMods())
});

app.get("/", (req, res) => res.sendFile(process.cwd() + "/public/index.html"));
app.get('*', (req, res) => res.sendFile(process.cwd() + "/public/404.html"));

app.listen(5342)

console.log(`Listening on port: http://localhost:5342`)