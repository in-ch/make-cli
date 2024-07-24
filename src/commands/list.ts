import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { fileURLToPath } from "url";

export const list = new Command().command("list").description("list all the tasks").action(async () => {
    console.log(chalk.bold.blue("Available inchcli's Commands:"));
    const filePath = fileURLToPath(import.meta.url);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const commandDescriptionPattern = /command\("(.+?)"\)\.description\("(.+?)"\)/g;
    let match;
    const results = [];
    while ((match = commandDescriptionPattern.exec(fileContent)) !== null) {
        const command = match[1];
        const description = match[2];
        results.push(`${command}: ${description}`);
    }
    results.forEach(result => console.log(chalk.bgCyanBright(result)));
});
