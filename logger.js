import chalk from "chalk";

export function logServiceCall(type, name, args) {
    console.log(
        chalk.cyan(`[SERVICE CALL]`),
        chalk.yellow(type),
        chalk.green(name),
        args ? chalk.magenta(JSON.stringify(args)) : ""
    );
}
export function logResult(result, error) {
    console.log(
        chalk.cyan(`----[RESULT]`),
        chalk.magenta(result),
        chalk.red(error ? `Error: ${error}` : "")
    );
}

