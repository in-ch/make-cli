import { Command } from "commander";
import inquirer from "inquirer";

import fixedMessage from "@/src/utils/fixed-message";

/**
 * @description This command sends an fixed message to the console.
 */
export const fixedMessageCli = new Command()
  .command("fix")
  .description("This command sends an fixed as a message to the console.")
  .action(async () => {
    const questions: any = [
      {
        type: "input",
        name: "message",
        message: "Enter the message: (ex, Hello World)",
      },
    ];
    inquirer.prompt(questions).then(async (answers) => {
      const message = answers.message;
      try {
        fixedMessage({
          message,
        });
      } catch (error) {
        process.stdout.write(
          "\x1b[31mAn error occurred while fixed message.\x1b[0m"
        );
      }
    });
  });
