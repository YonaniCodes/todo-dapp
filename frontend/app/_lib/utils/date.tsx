export function formatDueDate(dueTimestamp: number) {
  const now = new Date().getTime();
  const difference = dueTimestamp - now; // Time remaining until due date

  // Convert the difference to seconds, minutes, hours, etc.
  const seconds = Math.floor(Math.abs(difference) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (difference < 0) {
    // Task is overdue
    if (days > 0) {
      return `Overdue by ${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `Overdue by ${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `Overdue by ${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  } else {
    // Task is due in the future
    if (days > 0) {
      return `Due in ${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `Due in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `Due in ${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }
}

// Example usage:
const dueTimestamp = new Date().getTime() + 86400000; // Due in 1 day (24 hours)
console.log(formatDueDate(dueTimestamp)); // Output: "Due in 1 day"

const overdueTimestamp = new Date().getTime() - 3600000; // Overdue by 1 hour
console.log(formatDueDate(overdueTimestamp)); // Output: "Overdue by 1 hour"
