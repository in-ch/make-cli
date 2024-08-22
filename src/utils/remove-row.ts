import readline from "readline";

/**
 * @param removeCount - The number of rows to be removed.
 * @description This function will remove the specified number of rows from the console.
 */
export default function removeRow(removeCount: number): void {
  new Array(removeCount).fill(0).forEach(() => {
    process.stdout.write("\x1B[1A");
    readline.clearLine(process.stdout, 0);
  });
}
