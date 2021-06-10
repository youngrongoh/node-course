const os = require('os');
const path = require('path');
const fs = require('fs');

// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다
// 2. 그 폴더 안에 video, captured, duplicated  폴더를 만든다
// 3. 폴더 안에 있는 파일을 다 돌면서 분류
//    mp4|mov, png|aae, IMG_1234, (IMG_E1234)

const folder = process.argv[2];
const workingDir = path.join(path.dirname(process.argv[1]), 'Pictures', folder);

if (!folder || !fs.existsSync(workingDir)) {
  console.log('Please enter folder name in Pictures');
}
