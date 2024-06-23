// Function to format the date as YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const convertDate = (dateString) => {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Extract the year, month, and day parts from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date string
  return `${year}-${month}-${day}`;
};

export { getCurrentDate, convertDate };
