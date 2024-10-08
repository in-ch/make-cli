#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import { fileURLToPath } from "url";

import boxedMessage from "@/src/utils/boxed-message";
import tableMessage from "@/src/utils/table-message";
import fixedMessage from "@/src/utils/fixed-message";

/**
 * @description This command will list all the tasks.
 */
export const listCli = new Command()
  .command("list")
  .description("list all the tasks")
  .action(async () => {
    const filePath = fileURLToPath(import.meta.url);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const commandDescriptionPattern =
      /command\("(.+?)"\)\.description\("(.+?)"\)/g;
    let match;
    const results = [];
    while ((match = commandDescriptionPattern.exec(fileContent)) !== null) {
      const command = match[1];
      const description = match[2];
      results.push({ command, description });
    }
    fixedMessage({
      message: `${boxedMessage({
        messages: ["Welcome to Inch's CLI", "Here is a list of commands."],
        borderColor: "cyan",
        align: "left",
      })} \n${tableMessage({
        data: results,
        borderColor: "lightBlack",
        textColor: "lightGreen",
      })}`,
    });
  });
