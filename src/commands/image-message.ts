import { Command } from "commander";
import inquirer from "inquirer";
import imageMessage from "@/src/utils/image-message";

/**
 * @description This command sends an image as a message to the console.
 */
export const imageMessageCli = new Command()
  .command("img")
  .description("This command sends an image as a message to the console.")
  .action(async () => {
    const questions: any = [
      {
        type: "input",
        name: "imageUrl",
        message: "Enter the image URL: (ex, https://example.com/image.jpg)",
      },
    ];
    inquirer.prompt(questions).then(async (answers) => {
      const imageUrl = answers.imageUrl;
      const regex = /^https:/;
      if (!regex.test(imageUrl)) {
        process.stdout.write(
          "\x1b[31mInvalid image URL. It should start with 'https'.\x1b[0m"
        );
        return;
      }
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          process.stdout.write(
            "\x1b[31mFailed to fetch the image. Please check the URL.\x1b[0m"
          );
          return;
        }
        imageMessage({
          imageUrl,
        });
      } catch (error) {
        process.stdout.write(
          "\x1b[31mAn error occurred while fetching the image.\x1b[0m"
        );
      }
    });
  });
