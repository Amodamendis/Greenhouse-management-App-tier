const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');


// ORIGINAL LOCAL STORAGE (Unharmed)

const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Saves to local folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


//  NEW AWS S3 STORAGE

const s3 = new S3Client({ region: 'us-east-1' });
const s3Storage = multerS3({
    s3: s3,
    bucket: 'greenhouse-static-assets-619891987476',
    key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = uniqueSuffix + path.extname(file.originalname);
        
        // THE FIX: Add the 'uploads/' prefix right here!
        cb(null, 'uploads/' + fileName); 
    }
});


// ORIGINAL FILE FILTER (Unharmed)

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};


// THE STORAGE TOGGLE

// Change this to 'localStorage' to revert back to saving on your hard drive!
const activeStorage = s3Storage; 

const upload = multer({ 
    storage: activeStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Your original 5MB limit
});

module.exports = upload;