const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { upload, getSignedUrl } = require("./upload");

app.use(bodyParser.json());

app.post('/upload', upload.single('file'), function(req, res) {
  res.send(req.file)
})

app.get('/file', async function(req, res, next) {
  console.log(req.query)
  console.log(req.params)
 const url = await getSignedUrl(req.query.fileName);
 console.log(url)
 res.send(url)

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`);
});
