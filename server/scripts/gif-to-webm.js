const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: true });

(async () => {
  const basePath = `${__dirname}/../../public/movies`;
  const gifFiles = fs.readdirSync(basePath).filter(name => name.indexOf(".gif") !== -1)

  let i = 0
  for (const iFileName of gifFiles) {
    console.log(`【START encoding】 targetFile: ${iFileName}, allProgress: ${i++}/${gifFiles.length}`)
    const inputFile = fs.readFileSync(`${basePath}/${iFileName}`)
    const oFileName = iFileName.replace('gif', 'webm')
    if (fs.existsSync(`${basePath}/${oFileName}`)) continue;
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    ffmpeg.FS('writeFile', `tmp.${iFileName}`, new Uint8Array(inputFile));
    await ffmpeg.run('-i', `tmp.${iFileName}`, '-threads', '5', '-an', `tmp.${oFileName}`);
    const convertedFile = ffmpeg.FS('readFile', `tmp.${oFileName}`);
    fs.writeFileSync(`${basePath}/${oFileName}`, convertedFile);
  }
  process.exit(0);
})();