const fs = require('fs');
const sharp = require('sharp');

(async () => {
  // const basePath = `${__dirname}/../../public/images`;
  const basePath = `${__dirname}/../../public/images/profiles`;
  const jpgFiles = fs.readdirSync(basePath).filter(name => name.indexOf(".jpg") !== -1)

  let i = 0
  for (const iFileName of jpgFiles) {
    console.log(`【START encoding】 targetFile: ${iFileName}, allProgress: ${i++}/${jpgFiles.length}`)
    const oFileName = iFileName.replace('jpg', 'avif')
    if (fs.existsSync(`${basePath}/${oFileName}`)) {
      console.log('skip')
      continue;
    }
    await sharp(`${basePath}/${iFileName}`)
      .toFormat('avif')
      .avif({ speed: 8 })
      .toFile(`${basePath}/${oFileName}`, (err, info) => {
        if (err) {
          console.log('Error: ', err.message)
          return
        }
        console.log('OK?')
        console.log(info)
      })
  }
  process.exit(0);
})();