// node photo test
const fs = require('fs');
const path = require('path');

// 사진 폴더 경로 설정
const rootPath = path.join(__dirname, 'Pictures');

function getFiles(path, callback) {
  fs.readdir(path, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error(error);
      return;
    }

    callback && callback(files);
  });
}

function filterMediaFiles(files) {
  return files
    .filter((dirent) => {
      return !dirent.isDirectory() && path.extname(dirent.name);
    })
    .map((img) => img.name);
}

function categorizeByFolders(files) {
  const folder = files.reduce((obj, img) => {
    const extName = path.extname(img);
    switch (extName) {
      case '.jpg':
        const regExp = /IMG_E[0-9]{4}\.jpg/;
        const match = img.match(regExp);

        if (!match) {
          if (obj.duplicated) obj.duplicated.push(img);
          else obj.duplicated = [img];
        }
        break;
      case '.mov':
      case '.mp4':
        if (obj.video) obj.video.push(img);
        else obj.video = [img];
        break;
      case '.aae':
      case '.png':
        if (obj.captured) obj.captured.push(img);
        else obj.captured = [img];
        break;
      default:
        throw new Error(`invalid extension name: ${extName}`);
    }

    return obj;
  }, {});

  return folder;
}

function moveFile(oldPath, folderPath, fileName) {
  const newPath = path.join(folderPath, fileName);

  fs.access(folderPath, (error) => {
    // 폴더 없으면 생성
    if (error) {
      fs.mkdir(folderPath, (error) => console.error(error));
      console.log(`created folder: ${path.basename(folderPath)}`);
    }

    // 파일 이동
    fs.rename(oldPath, newPath, (error) => {
      if (error) console.error(error);
      else console.log(`moved "${fileName}" to "${path.basename(folderPath)}" folder`);
    });
  });
}

function moveFiles(root, folders) {
  Object.keys(folders).forEach((folderName) => {
    const folderPath = path.join(root, folderName);

    folders[folderName].forEach((fileName) => {
      const oldPath = path.join(root, fileName);
      moveFile(oldPath, folderPath, fileName);
    });
  });
}

getFiles(rootPath, (files) => {
  console.log('start to move media files...');

  const mediaFiles = filterMediaFiles(files);
  const folders = categorizeByFolders(mediaFiles);

  if (Object.keys(folders).length < 1) {
    console.warn('Not exist any file to be moved!');
  }

  moveFiles(rootPath, folders);
});
