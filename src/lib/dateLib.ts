export const formatDate = (datetimeString: string): string => {
    const dateObject = new Date(datetimeString);

    // Extract the components in local time for proper conversion
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = dateObject.getDate().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}`; // Return as YYYY-MM-DD
  };