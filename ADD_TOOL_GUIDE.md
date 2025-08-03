# Hướng dẫn thêm Tool vào MCP Server

## 1. Tạo file khai báo tool mới
- Vào thư mục `tools/`.
- Tạo file mới, ví dụ: `multiplyNumbers.js`.
- Khai báo tool theo mẫu (tách từng phần):

```js
import { z } from "zod";
import { logServiceCall } from "../logger.js";

const toolName = "multiply-numbers";
const toolOptions = {
    title: "Multiply Tool",
    description: "Multiply two numbers",
    inputSchema: { a: z.number(), b: z.number() }
};
async function toolHandler({ a, b }) {
    logServiceCall("Tool", toolName, { a, b });
    return {
        content: [{ type: "text", text: String(a * b) }]
    };
}

const multiplyNumbersTool = {
    name: toolName,
    options: toolOptions,
    handler: toolHandler
};

export default multiplyNumbersTool;
```

## 2. Đăng ký tool trong `tools/index.js`
- Mở file `tools/index.js`.
- Import và đăng ký tool mới:

```js
import addNumbers from "./addNumbers.js";
import multiplyNumbers from "./multiplyNumbers.js";

export function registerTools(server) {
    server.registerTool(addNumbers.name, addNumbers.options, addNumbers.handler);
    server.registerTool(multiplyNumbers.name, multiplyNumbers.options, multiplyNumbers.handler);
    // Thêm các tool khác ở đây nếu có
}
```

## 3. Test tool tự động
- Tạo hoặc cập nhật file test, ví dụ: `test_tools.js`:

```js
import addNumbers from "./tools/addNumbers.js";
import multiplyNumbers from "./tools/multiplyNumbers.js";

async function testAddNumbers() {
    const input = { a: 5, b: 7 };
    const result = await addNumbers.handler(input);
    console.log("Test add-numbers:", result);
}

async function testMultiplyNumbers() {
    const input = { a: 3, b: 4 };
    const result = await multiplyNumbers.handler(input);
    console.log("Test multiply-numbers:", result);
}

(async () => {
    await testAddNumbers();
    await testMultiplyNumbers();
})();
```

## 4. Chạy test
```sh
node test_tools.js
```

---
Bạn chỉ cần lặp lại các bước trên để thêm tool mới. Nếu cần thêm ví dụ hoặc hỗ trợ, hãy liên hệ!
