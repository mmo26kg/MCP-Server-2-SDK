import { z } from "zod";
import { logServiceCall, logResult } from "../logger.js";
import { ToolBuilder } from "../toolBuilder.js";

function multiplyNumbers({ numbers }) {
    logServiceCall("Tool", "multiply-numbers", numbers);
    let result, error = null;
    try {
        result = numbers.reduce((acc, cur) => acc * cur, 1);
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

const multiplyNumbersTool = new ToolBuilder("multiply-numbers")
    .setTitle("Multiply Tool")
    .setDescription("Multiply n numbers")
    .setInputSchema({ numbers: z.array(z.number()).min(2, "Cần ít nhất 2 số để nhân") })
    .setHandler(multiplyNumbers)
    .build();

export default multiplyNumbersTool;
