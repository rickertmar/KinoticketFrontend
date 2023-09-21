const fs = require('fs');
const { generateJsonData } = require('../utilities/generateData');

// Generate seat data using the utility function
const seatData = generateJsonData();

// Convert the seat data to JSON format
const jsonData = JSON.stringify(seatData, null, 2);

// Specify the path to your seatsData.json file
const filePath = 'public/seatsData.json';

// Write the updated JSON data to seatsData.json
fs.writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.error('Error writing to seatsData.json:', err);
  } else {
    console.log('seatsData.json has been updated successfully.');
  }
});
