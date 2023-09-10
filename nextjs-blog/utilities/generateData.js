function generateJsonData() {
    const jsonData = [];
    let id = 1;
  
    for (let seatRowCharCode = 'A'.charCodeAt(0); seatRowCharCode <= 'U'.charCodeAt(0); seatRowCharCode++) {
        const seatRow = String.fromCharCode(seatRowCharCode);
        for (let number = 1; number <= 30; number++) {
        const xloc = number * 20;
        const yloc = (seatRow.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 20;
        const blocked = Math.random() < 0.1;
  
        const seatData = {
          id: id++,
          seatRow,
          number,
          xloc,
          yloc,
          blocked,
        };

        // console.log(seatData);
  
        jsonData.push(seatData);
      }
    }
  
    return jsonData;
  }
  
  module.exports = { generateJsonData };
  