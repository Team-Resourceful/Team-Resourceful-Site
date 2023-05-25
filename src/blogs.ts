import * as fs from "fs";
import * as showdown from "showdown";

export class Blogs {

    private static converter = new showdown.Converter();

    private static blogs: Map<string, Blog> = new Map<string, Blog>();
    private static sortedByDate: Blog[] = [];

    public static init() {
        const template = fs.readFileSync(process.cwd() + "/templates/blog.html", "utf8");

        if (fs.existsSync(process.cwd() + "/dist_blogs")) {
            fs.rmSync(process.cwd() + "/dist_blogs", {recursive: true});
        }
        fs.mkdirSync(process.cwd() + "/dist_blogs");
        fs.readdirSync(process.cwd() + "/blogs").forEach((file) => {
            if (file.endsWith(".template")) {
                const data = fs.readFileSync(process.cwd() + "/blogs/" + file, "utf8");
                this.createHtmlFile(data, template);
            }
        });

        Blogs.sortedByDate = Array.from(Blogs.blogs.values())
            .filter((blog) => !blog.hidden)
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            });
    }

    public static getBlogs(): Blog[] {
        return Blogs.sortedByDate;
    }

    private static createHtmlFile(data: string, template: string) {
        const injections = Blogs.getInjections(data);
        let html = template;
        injections.forEach((value, key) => {
            html = html.replaceAll(`$\{${key}\}`, value);
        });
        const markdown = fs.readFileSync(process.cwd() + "/blogs/" + injections.get("md"), "utf8");
        const content = Blogs.converter.makeHtml(markdown);
        html = html.replaceAll("$\{content\}", content);
        fs.writeFileSync(process.cwd() + "/dist_blogs/" + injections.get("id") + ".html", html);

        const blog = {
            id: injections.get("id"),
            title: injections.get("title"),
            description: injections.get("description"),
            date: injections.get("date") || "Unknown",
            image: injections.get("image") || "assets/lucide/activity.svg",
            tags: injections.get("tags") ? injections.get("tags")!!.split(",") : [],
            hidden: injections.get("hidden") === "true"
        } as Blog;

        Blogs.blogs.set(blog.id, blog);
    }

    private static getInjections(data: string): Map<string, string> {
        const injections = new Map<string, string>();
        const lines = data.split(/\r?\n/);
        let injectionId = null;
        let injectionData = "";
        for (const line of lines) {
            if (line.startsWith("$")) {
                if (injectionId) {
                    injections.set(injectionId, injectionData);
                }
                injectionId = line.substring(1, line.indexOf(":"));
                injectionData = "";
            } else {
                injectionData += line;
            }
        }
        if (injectionId) {
            injections.set(injectionId, injectionData);
        }
        return injections;
    }
}

export interface Blog {
    title: string;
    description: string;
    image: string;
    tags: string[];
    date: string;
    id: string;
    hidden: boolean;
}