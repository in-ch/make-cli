import removeRow from "./remove-row";

/**
 * @param {number} totalTasks - The total number of tasks to be completed.
 * @param {string?} message - The message to be displayed.
 * @returns {increment: (value?: number) => void; complete: () => void} - The increment and complete functions.
 */
export function createProgressBarMessage(
  totalTasks: number,
  message: string = "Progress"
): {
  increment: (value?: number) => void;
  complete: () => void;
} {
  let current = 0;

  function update(_message: string = message) {
    const percentage = (current / totalTasks) * 100;
    const progress = Math.round((percentage / 100) * 20);
    const bar = "█".repeat(progress) + "-".repeat(20 - progress);
    removeRow(1);
    process.stdout.write(`[${bar}] ${percentage.toFixed(2)}% ${_message}\n`);
  }

  return {
    increment: (value: number = 1) => {
      current += value;
      update();
    },
    complete: () => {
      current = totalTasks;
      update();
    },
  };
}

/**
 * @param totalTasks - The total number of tasks to be completed.
 * @description This function will display a progress bar message on the console.
 * @returns {void} console with the progress bar message
 */
export default function progressBarMessage(
  totalTasks: number,
  message?: string
): void {
  const progressBar = createProgressBarMessage(totalTasks, message);
  function performTask(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        progressBar.increment();
        resolve();
      }, Math.random() * 1000);
    });
  }
  async function runTasks() {
    for (let i = 1; i <= totalTasks; i++) {
      await performTask();
    }
    progressBar.complete();
  }

  runTasks();
}
