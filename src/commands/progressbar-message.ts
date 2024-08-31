import { Command } from "commander";
import inquirer from "inquirer";

import progressBarMessage from "../utils/progressbar-message";

/**
 * @description This command sends a progressbar message to the console.
 */
export const progressbarMessageCli = new Command()
  .command("pb")
  .description("This command sends a progressbar message to the console.")
  .action(async () => {
    const questions: any = [
      {
        type: "input",
        name: "time",
        message: "How many tasks are left?",
      },
      {
        type: "input",
        name: "message",
        message: "Please write a message.",
      },
    ];
    inquirer.prompt(questions).then(async (answers) => {
      const time = Number(answers.time);
      if (typeof time !== "number") {
        process.stdout.write(
          "\x1b[31mInvalid format. Please enter a number. \x1b[0m"
        );
        return;
      } else if (time < 1) {
        process.stdout.write(
          "\x1b[31mInvalid data. Please enter a number greater than 0. \x1b[0m"
        );
        return;
      }
      progressBarMessage(time, answers.message);
    });
  });
