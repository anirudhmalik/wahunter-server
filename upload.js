const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucket = new AWS.S3();

const getSignedUrl = async (fileName) => {
  const url = await bucket.getSignedUrl('getObject', {
      Key: fileName,
      Bucket: process.env.BUCKET,
  });
 return url;
}

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
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  getSignedUrl,
  upload,
};
