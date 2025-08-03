import currentTime from "./currentTime.js";
// import các resource khác ở đây

export function registerResources(server) {
    server.registerResource(currentTime.name, currentTime.template, currentTime.options, currentTime.handler);
    // Đăng ký các resource khác ở đây
}
