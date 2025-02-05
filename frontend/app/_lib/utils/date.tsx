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
      return `Overdue  ${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `Overdue  ${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `Overdue  ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Overdue  ${seconds} second${seconds > 1 ? "s" : ""} ago`;
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

export function timestampToDatetimeLocal(timestamp: number) {
  // Create a Date object from the timestamp (in milliseconds)
  const date = new Date(timestamp);

  // Get the individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date into the datetime-local format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
