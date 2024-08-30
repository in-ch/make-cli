import { Command } from "commander";
import inquirer from "inquirer";
import imageMessage from "@/src/utils/image-message";
import createSpinnerMessage from "../utils/spinner-message";

/**
 * @description This command sends a spinner message to the console.
 */
export const spinnerMessageCli = new Command()
  .command("spinner")
  .description("This command sends a spinner message to the console.")
  .action(async () => {
    const questions: any = [
      {
        type: "input",
        name: "time",
        message: "How long do you want the spinner to last?",
      },
    ];
    inquirer.prompt(questions).then(async (answers) => {
      const time = Number(answers.time);
      if (typeof time !== "number") {
        process.stdout.write(
          "\x1b[31mInvalid format. Please enter a number. \x1b[0m"
        );
        return;
      } else if (time < 1000) {
        process.stdout.write(
          "\x1b[31mInvalid data. Please enter a number greater than 1,000. \x1b[0m"
        );
        return;
      }

      const { start, stop } = createSpinnerMessage({});
      start();
      setTimeout(() => {
        stop();
      }, time);
    });
  });
