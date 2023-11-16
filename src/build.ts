import * as fs from "fs";
import {Blog, Utils} from "./utils";

const OUTPUT_DIR = "/output";
const BLOG_TEMPLATE = fs.readFileSync(process.cwd() + "/templates/blog.html", "utf8");
const BLOGS = [] as Blog[];

if (fs.existsSync(process.cwd() + OUTPUT_DIR)) {
    fs.rm(process.cwd() + OUTPUT_DIR, { recursive: true }, () => {});
}
fs.mkdirSync(process.cwd() + OUTPUT_DIR);
fs.cpSync(process.cwd() + "/public", process.cwd() + OUTPUT_DIR, { recursive: true });

fs.mkdirSync(process.cwd() + OUTPUT_DIR + "/blog");
fs.mkdirSync(process.cwd() + OUTPUT_DIR + "/api");

fs.readdirSync(process.cwd() + "/blogs").forEach((file) => {
    if (file.endsWith(".template")) {
        const data = fs.readFileSync(process.cwd() + "/blogs/" + file, "utf8");
        const builtBlog = Utils.createBlogHtmlFile(data, BLOG_TEMPLATE);
        fs.writeFileSync(process.cwd() + OUTPUT_DIR + "/blog/" + builtBlog.blog.id + ".html", builtBlog.html);
        BLOGS.push(builtBlog.blog);
    }
});

const blogsSortedByDate = Array.from(BLOGS.values())
    .filter((blog) => !blog.hidden)
    .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });

fs.writeFileSync(process.cwd() + OUTPUT_DIR + "/api/blogs.json", JSON.stringify(blogsSortedByDate));
fs.copyFileSync(process.cwd() + "/mods.json", process.cwd() + OUTPUT_DIR + "/api/mods.json");

