function generateJsonData() {
  const jsonData = [];
  let id = 1;

  for (let seatRowCharCode = 'A'.charCodeAt(0); seatRowCharCode <= 'U'.charCodeAt(0); seatRowCharCode++) {
    const seatRow = String.fromCharCode(seatRowCharCode);
    for (let number = 1; number <= 30; number++) {
      let xloc;
      if (number <= 14) {
        xloc = number * 3; // Seats 1 to 14
      } else {
        xloc = 90 + (number - 15) * 3; // Seats 15 and onwards
      }

      const yloc = (seatRowCharCode - 'A'.charCodeAt(0) + 1) * 0.1;
      const blocked = Math.random() < 0.1;

      const seatData = {
        id: id++,
        seatRow,
        number,
        xloc,
        yloc,
        blocked,
      };

      jsonData.push(seatData);
    }
  }

  return jsonData;
}

  module.exports = { generateJsonData };
  