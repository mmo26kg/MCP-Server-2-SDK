import { z } from "zod";
import { logServiceCall } from "../logger.js";

// Khai báo từng phần riêng biệt
const toolName = "add-numbers";

const toolOptions = {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
};

async function toolHandler({ a, b }) {
    logServiceCall("Tool", toolName, { a, b });
    return {
        content: [{ type: "text", text: String(a + b) }]
    };
}

// Ghép lại và export
const addNumbersTool = {
    name: toolName,
    options: toolOptions,
    handler: toolHandler
};

export default addNumbersTool;
