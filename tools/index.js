import addNumbers from "./addNumbers.js";

export function registerTools(server) {
    server.registerTool(addNumbers.name, addNumbers.options, addNumbers.handler);
    // Đăng ký các tool khác ở đây
}
// import các tool khác ở đây
