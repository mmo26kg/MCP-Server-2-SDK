import chalk from "chalk";

export function logServiceCall(type, name, args) {
    console.log(
        chalk.cyan(`[SERVICE CALL]`),
        chalk.yellow(type),
        chalk.green(name),
        args ? chalk.magenta(JSON.stringify(args)) : ""
    );
}
