import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";
import { registerPrompts } from "./prompts/index.js";

// Tạo ứng dụng Express
const app = express();
app.use(express.json());

// Định nghĩa endpoint MCP
app.post("/mcp", async (req, res) => {
    try {
        // Tạo instance mới cho mỗi yêu cầu
        const server = new McpServer({
            name: "time-server",
            version: "1.0.0"
        });
        await registerResources(server);
        await registerTools(server);
        await registerPrompts(server);

        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined, // Không cần session
        });

        // Xử lý yêu cầu và đóng khi hoàn tất
        res.on("close", () => {
            transport.close();
            server.close();
        });

        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    } catch (err) {
        console.error("Server error:", err);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: {
                    code: -32603,
                    message: "Internal server error",
                },
                id: null,
            });
        }
    }
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));