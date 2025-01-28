export function formatTimestampToDay(timestamp: number): string {
  const date = new Date(timestamp); // Create a Date object from the timestamp

  // Array of day and month names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = dayNames[date.getDay()]; // Get the name of the day (e.g., Monday)
  const month = monthNames[date.getMonth()]; // Get the month name (e.g., March)
  const day = date.getDate(); // Get the day of the month (e.g., 21)
  const year = date.getFullYear(); // Get the year (e.g., 2025)

  // Return the formatted date string
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}
