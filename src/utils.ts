import fs from "fs";
import * as showdown from "showdown";

export class Utils {

    private static MARKDOWN_CONVERTER = new showdown.Converter();

    public static createBlogHtmlFile(data: string, template: string): { blog: Blog, html: string } {
        const injections = Utils.getInjections(data);
        let html = template;
        injections.forEach((value, key) => {
            html = html.replaceAll(`$\{${key}\}`, value);
        });
        const markdown = fs.readFileSync(process.cwd() + "/blogs/" + injections.get("md"), "utf8");
        const content = Utils.MARKDOWN_CONVERTER.makeHtml(markdown);
        html = html.replaceAll("$\{content\}", content);

        return {
            html: html,
            blog: {
                id: injections.get("id"),
                title: injections.get("title"),
                description: injections.get("description"),
                date: injections.get("date") || "Unknown",
                image: injections.get("image") || "assets/lucide/activity.svg",
                tags: injections.get("tags") ? injections.get("tags")!!.split(",") : [],
                hidden: injections.get("hidden") === "true"
            } as Blog
        }
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