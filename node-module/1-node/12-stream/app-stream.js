const fs = require('fs');

const data = [];
fs.createReadStream('./file.txt', {
  // highWaterMark: 8, // 기본값 64kb
  // encoding: 'utf-8',
})
  .on('data', (chunk) => {
    data.push(chunk);
    // console.log(chunk);
    console.count('data');
  })
  .on('end', () => {
    console.log(data.join(''));
  })
  .on('error', (error) => {
    console.log(error);
  });
