
var express = require('express');
var fs = require('fs')
var path = require('path');

const app = express();
const port = 4000;
const folderPath = path.join(__dirname + '../../../../../../' + 'Downloads/Movies/');
const extension = ".mp4";
app.get('/videos/:filename', (req, res) => {
    const fileName = req.params.filename;
    const moviePath = folderPath + fileName + '/' + fileName + extension;
    console.log("Movie Requested: ", fileName);
    console.log("Movie filepath: ", moviePath);

    if (!moviePath) {
        res.status(404).send('Movie not found')
    }
    const fileStats = fs.statSync(moviePath);
    const fileSize = fileStats.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(moviePath, {
            start,
            end
        });
        const head = {
            'Content-Range': `bytes ${start} - ${end}/${fileSize}`,
            'Accept-Ranges': `bytes`,
            'Content-Length': chunksize,
            'Content-Type': `video/mp4`,
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': `videp/mp4`,
        }
        res.writeHead(200, head);
        fs.createReadStream(moviePath).pipe(res);
    }
});
app.listen(port, () => {
    console.log(path.join(__dirname + '../../../../../../' + 'Downloads/Movies/'));
    console.log('app is listening on port: ', port);
})