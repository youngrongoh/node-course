const path = require('path');

console.log(__dirname);
console.log(__filename);

console.log(path.sep); // 경로 구분자
console.log(path.delimiter); // 환경 변수 구분자

// basename
console.log(path.basename(__filename)); // 파일 이름
console.log(path.basename(__filename, '.js')); // 지정한 확장자 제거

// dirname
console.log(path.dirname(__filename)); // 경로만

// extension
console.log(path.extname(__filename)); // 확장자만

// parse
const parsed = path.parse(__filename); // 경로 정보를 분류
console.log(parsed);
parsed.root;
parsed.name;

const str = path.format(parsed); // 문자열로 변환
console.log(str);

// isAbsolute 절대 경로인지 아닌지 판별
console.log('isAbsolute?', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute('../'));

// normalize 잘못된 경로 정보를 고쳐줌
console.log(path.normalize('./folder/////sub'));

// join
console.log(__dirname + '/' + 'image'); // window에서는 잘못된 경로
console.log(__dirname + path.sep + 'image');
console.log(path.join(__dirname, 'image'));
