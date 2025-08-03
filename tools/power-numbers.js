import { z } from "zod";
import { logServiceCall, logResult } from "../logger.js";
import { ToolBuilder } from "../toolBuilder.js";

function powerNumbers({ numbers }) {
    logServiceCall("Tool", "power-numbers", numbers);
    let result, error = null;
    try {
        // Tính lũy thừa: numbers[0] ^ numbers[1] ^ numbers[2] ...
        result = numbers.reduce((acc, cur, idx) => idx === 0 ? cur : Math.pow(acc, cur));
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

const powerNumbersTool = new ToolBuilder("power-numbers")
    .setTitle("Power Tool")
    .setDescription("Tính lũy thừa n số: a^b^c...")
    .setInputSchema({ numbers: z.array(z.number()).min(2, "Cần ít nhất 2 số để tính lũy thừa") })
    .setHandler(powerNumbers)
    .build();

export default powerNumbersTool;
