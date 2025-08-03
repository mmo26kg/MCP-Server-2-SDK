import greetUser from "./greetUser.js";
// import các prompt khác ở đây

export function registerPrompts(server) {
    server.registerPrompt(greetUser.name, greetUser.options, greetUser.handler);
    // Đăng ký các prompt khác ở đây
}
