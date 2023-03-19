import * as fs from "fs";

export class Mods {

    private static mods: Mod[] = [];

    public static init() {
        const mods = fs.readFileSync(process.cwd() + "/mods.json", "utf8");
        JSON.parse(mods).forEach((mod: Mod) => {
            Mods.mods.push(mod);
        });
    }

    public static getMods(): Mod[] {
        return Mods.mods;
    }
}

export interface Mod {
    title: string;
    description: string;
    image: string;
    links: Link[];
}

export interface Link {
    url: string;
    icon: string;
}