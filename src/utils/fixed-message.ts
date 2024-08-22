interface FixedMessageProps {
  message: string;
}

/**
 * @param {string} message - The message to be displayed.
 * @description This function will display a fixed message on the console.
 * @returns { void } console with the fixed messages
 */
export default function fixedMessage({ message }: FixedMessageProps) {
  process.stdout.write("\x1b[H");
  setInterval(() => {
    console.clear();
    console.log(message);
  }, 100);
}
