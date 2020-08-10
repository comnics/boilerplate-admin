const express = require('express');
const router = express.Router();

const { Photo } = require('../models/Photo')

const UPLOAD_FILE_PATH = 'server/uploads';
const UPLOAD_FILE_THUMBNAIL_PATH = 'server/uploads/thumbnail';

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FILE_PATH) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        let filenamme = `${Date.now()}_${file.originalname}`;
        cb(null, filenamme) // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
    onError : function(err, next) {
        console.log('error', err);
        next(err);
      }    
});
var upload = multer({storage: storage});

//router.use('/', express.static(UPLOAD_FILE_PATH));
router.use('/thumb', express.static(UPLOAD_FILE_THUMBNAIL_PATH));

router.get('/', (req, res) => {
    Photo.selectPhotos(0, 9, (err, rows) => {
        res.json({success: true, photos: rows});
    });
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const imageThumbnail = require('image-thumbnail');
    const fs = require('fs');
    const thumbnailFileName = `thumbnail_${file.filename}`;

    let options = { width: 600, responseType: 'base64' }
    
    try {
        const thumbnail = await imageThumbnail(file.path, options);
        
        let thumbnailFilePath = `${UPLOAD_FILE_THUMBNAIL_PATH}/${thumbnailFileName}`;
        fs.writeFile(thumbnailFilePath, thumbnail, 'base64', function (err) {
            if (err) throw err;
        });
        let photo = {
            id: `KTO_${Date.now()}`,
            kind: 'K',
            owner_id: 'KTO',
            display_url: file.filename,
            thumbnail_src: thumbnailFileName,
            username: 'KTO'
        }
        Photo.insert(photo);
        //console.log(thumbnail);
    } catch (err) {
        console.error(err);
    }    

    //console.log(file);
    res.json({success: true, filename: file.filename, thumbnail: thumbnailFileName});
});

module.exports = router;