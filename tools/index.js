import fs from "fs";
import path from "path";

export async function registerTools(server) {
    const toolsDir = path.resolve(path.dirname(decodeURI(import.meta.url).replace('file://', '')));
    const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith(".js") && f !== "index.js" && /^[a-z0-9\-]+\.js$/.test(f));

    for (const file of toolFiles) {
        const toolModule = await import(path.join(toolsDir, file));
        const tool = toolModule.default;
        if (tool && tool.name && tool.options && tool.handler) {
            server.registerTool(tool.name, tool.options, tool.handler);
        }
    }
}
