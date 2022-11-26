const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucket = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: bucket,
    bucket: process.env.BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
});

module.exports = {
  upload,
};
