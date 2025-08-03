import { z } from "zod";
import { logServiceCall, logResult } from "../logger.js";
import { ToolBuilder } from "../toolBuilder.js";

function addNumbersHandler({ numbers }) {
    logServiceCall("Tool", "add-numbers", numbers);
    let result, error = null;
    try {
        result = numbers.reduce((acc, cur) => acc + cur, 0);
        logResult(result);
    } catch (err) {
        error = err.message;
    }
    return {
        content: [
            { type: "text", text: error ? `Lỗi: ${error}` : `Kết quả: ${result}` }
        ]
    };
}

const addNumbersTool = new ToolBuilder("add-numbers")
    .setTitle("Addition Tool")
    .setDescription("Add n numbers")
    .setInputSchema({ numbers: z.array(z.number()).min(2, "Cần ít nhất 2 số để cộng") })
    .setHandler(addNumbersHandler)
    .build();

export default addNumbersTool;
