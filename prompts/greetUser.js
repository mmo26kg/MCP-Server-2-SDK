import { z } from "zod";
import { logServiceCall } from "../logger.js";

export default {
    name: "greet-user",
    options: {
        title: "Greet User",
        description: "Generate a greeting message",
        argsSchema: { name: z.string() }
    },
    handler: ({ name }) => {
        logServiceCall("Prompt", "greet-user", { name });
        return {
            messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `Please greet the user named ${name}`
                }
            }]
        };
    }
};
