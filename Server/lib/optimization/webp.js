import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';

console.log('Optimizing ingame assets...');

const findPNGFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findPNGFiles(filePath, fileList);
        } else if (path.extname(file).toLowerCase() === '.png') {
            fileList.push(filePath);
        }
    });

    return fileList;
};

const pngDirectory = '../../Front/static/img';
const pngFiles = findPNGFiles(pngDirectory);

Promise.all(pngFiles.map(async pngFile => {
    const outputFilePath = pngFile.replace('.png', '.webp');

    await imagemin([pngFile], {
        destination: path.dirname(outputFilePath),
        plugins: [
            imageminWebp({ method: 6, lossless: 9 })
        ]
    });
})).then(() => {
    console.log('Optimization complete!');
}).catch(error => {
    console.error('Error optimizing images:', error);
});
