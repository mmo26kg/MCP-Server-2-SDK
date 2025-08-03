import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logServiceCall } from "../logger.js";

export default {
    name: "current-time",
    template: new ResourceTemplate("time://current", { list: undefined }),
    options: {
        title: "Current Time",
        description: "Get the current time"
    },
    handler: async (uri) => {
        logServiceCall("Resource", "current-time", { uri: uri.href });
        const now = new Date().toLocaleTimeString();
        return {
            contents: [{
                uri: uri.href,
                text: `Current time: ${now}`
            }]
        };
    }
};
