import readline from "readline";

/**
 * @param {string[]} spinnerChars - The characters to use for the spinner.
 * @param {number} ms - The time in milliseconds
 * @description This function creates a spinner message.
 * @returns {start: () => void; stop: () => void} - The start and stop functions.
 */
export default function createSpinnerMessage({
  spinnerChars = ["|", "/", "-", "\\"],
  ms = 100,
}): {
  start: () => void;
  stop: () => void;
} {
  let current = 0;
  let interval: NodeJS.Timeout;

  function start() {
    interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(spinnerChars[current]);
      current = (current + 1) % spinnerChars.length;
    }, ms);
  }

  function stop() {
    clearInterval(interval);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write("");
  }

  return { start, stop };
}
