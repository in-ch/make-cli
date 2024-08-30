import { Command } from "commander";
import inquirer from "inquirer";

import boxedMessage from "../utils/boxed-message";

/**
 * @description This command sends an boxed message to the console.
 */
export const boxedMessageCli = new Command()
  .command("box")
  .description("This command sends a boxed message to the console.")
  .action(async () => {
    const questions: any = [
      {
        type: "input",
        name: "box",
        message: "Enter the message: (ex, Hello World)",
      },
    ];
    inquirer.prompt(questions).then(async (answers) => {
      const message = answers.box;
      try {
        process.stdout.write(
          boxedMessage({
            messages: [message],
            borderColor: "white",
            minHeight: 2,
            align: "center",
          })
        );
      } catch (error) {
        process.stdout.write(
          "\x1b[31mAn error occurred while boxed message.\x1b[0m"
        );
      }
    });
  });
